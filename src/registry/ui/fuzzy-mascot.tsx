"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export const MASCOT_SHAPES = [
  "devsloka",
  "circle",
  "square",
  "clover",
  "flower",
  "star",
  "sun",
  "hexagon",
  "triangle",
  "diamond",
  "pill",
  "bean",
  "heart",
  "cloud",
  "blob",
  "ghost",
  "orb",
  "bot",
  "strawberry",
  "mango",
] as const;
export const MASCOT_STATES = ["idle", "working", "sleeping"] as const;
export const MASCOT_SHADINGS = ["fabric", "plastic", "crepe", "smooth", "flat", "glass"] as const;
export const MASCOT_HATS = ["none", "party", "beanie", "wizard", "tophat"] as const;
export const MASCOT_GLASSES = ["none", "round", "square", "sunglasses"] as const;

export type MascotShape = (typeof MASCOT_SHAPES)[number];
export type MascotState = (typeof MASCOT_STATES)[number];
export type MascotShading = (typeof MASCOT_SHADINGS)[number];
export type MascotHat = (typeof MASCOT_HATS)[number];
export type MascotGlasses = (typeof MASCOT_GLASSES)[number];

export type FuzzyMascotProps = Omit<React.ComponentProps<"div">, "children"> & {
  shape?: MascotShape;
  /** Body colour. Defaults to a colour picked for the shape. */
  color?: string;
  state?: MascotState;
  shading?: MascotShading;
  hat?: MascotHat;
  glasses?: MascotGlasses;
  /** 0 (cropped) to 10 (shaggy). Only affects the fabric shading. */
  furLength?: number;
  /** Rendered size in px. */
  size?: number;
  /** Follow the pointer anywhere on the page with the eyes. */
  trackPointer?: boolean;
  /** Accessible name. Pass "" to mark the mascot decorative. */
  label?: string;
  /** Click (or Enter/Space) makes the mascot hop and spin. */
  spinOnClick?: boolean;
};

// ─── Geometry ────────────────────────────────────────────────────────────────
// Every shape is a list of points in a 200×200 box. Points (not hand-drawn
// paths) let us find the top of the head for hats and keep curves smooth.

type Point = [number, number];
const TAU = Math.PI * 2;
const SAMPLES = 160;

// A closed curve from a radius function, starting at the top and going clockwise.
const polar = (radius: (angle: number) => number, stretchX = 1, stretchY = 1): Point[] =>
  Array.from({ length: SAMPLES }, (_, i) => {
    const angle = (i / SAMPLES) * TAU - Math.PI / 2;
    const r = radius(angle);
    return [Math.cos(angle) * r * stretchX, Math.sin(angle) * r * stretchY];
  });

const superellipse = (a: number, b: number, exponent: number): Point[] =>
  Array.from({ length: SAMPLES }, (_, i) => {
    const t = (i / SAMPLES) * TAU;
    const c = Math.cos(t);
    const s = Math.sin(t);
    return [
      a * Math.sign(c) * Math.abs(c) ** (2 / exponent),
      b * Math.sign(s) * Math.abs(s) ** (2 / exponent),
    ];
  });

const polygon = (sides: number, rotation = 0, stretchY = 1): Point[] =>
  Array.from({ length: sides }, (_, i) => {
    const angle = rotation + (i / sides) * TAU - Math.PI / 2;
    return [Math.cos(angle), Math.sin(angle) * stretchY];
  });

// Chaikin corner cutting: each pass rounds corners a little more.
const smooth = (points: Point[], passes: number): Point[] => {
  let result = points;
  for (let pass = 0; pass < passes; pass++) {
    result = result.flatMap((point, i) => {
      const next = result[(i + 1) % result.length];
      return [
        [point[0] * 0.75 + next[0] * 0.25, point[1] * 0.75 + next[1] * 0.25],
        [point[0] * 0.25 + next[0] * 0.75, point[1] * 0.25 + next[1] * 0.75],
      ] as Point[];
    });
  }
  return result;
};

// The Devsloka logo's silhouette: straight left edge, round right side, cut bottom-left corner.
// Wide shoulders tapering to a soft point, like a strawberry.
const strawberry = (): Point[] =>
  smooth(
    Array.from({ length: SAMPLES }, (_, i) => {
      const angle = (i / SAMPLES) * TAU - Math.PI / 2;
      const y = Math.sin(angle);
      const down = (y + 1) / 2; // 0 at the top, 1 at the bottom
      return [Math.cos(angle) * (1 - 0.55 * down ** 2.2), y < 0 ? y * 0.82 : y * 1.08] as Point;
    }),
    1
  );

// A plump, tilted oval with a gentle dent on one side, like a mango.
const mango = (): Point[] => {
  const tilt = -0.42;
  return polar(
    (a) => 1 + 0.1 * Math.sin(a) - 0.07 * Math.exp(-((angleGap(a, Math.PI) / 0.55) ** 2)),
    0.86,
    1
  ).map(([x, y]): Point => [x * Math.cos(tilt) - y * Math.sin(tilt), x * Math.sin(tilt) + y * Math.cos(tilt)]);
};

const devsloka = (): Point[] => {
  const points: Point[] = [[-1, 0.66], [-1, -1], [0, -1]];
  for (let i = 1; i < 48; i++) {
    const angle = -Math.PI / 2 + (i / 48) * Math.PI;
    points.push([Math.cos(angle), Math.sin(angle)]);
  }
  points.push([0, 1], [-0.66, 1]);
  return smooth(points, 3);
};

const ghost = (): Point[] => {
  const points: Point[] = [];
  for (let i = 0; i <= 60; i++) {
    const angle = Math.PI + (i / 60) * Math.PI; // head: left → top → right
    points.push([Math.cos(angle), Math.sin(angle)]);
  }
  for (let i = 1; i <= 12; i++) points.push([1, (i / 12) * 1.05]); // right side
  for (let i = 1; i < 72; i++) {
    const x = 1 - (i / 72) * 2; // skirt: three hanging scallops
    points.push([x, 1.05 + 0.16 * Math.abs(Math.sin(1.5 * Math.PI * (x + 1)))]);
  }
  for (let i = 0; i < 12; i++) points.push([-1, 1.05 - (i / 12) * 1.05]); // left side
  return points;
};

const heart = (): Point[] =>
  Array.from({ length: SAMPLES }, (_, i) => {
    const t = (i / SAMPLES) * TAU;
    return [
      16 * Math.sin(t) ** 3,
      -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
    ];
  });

// How far an angle sits from a target, wrapped to −π…π.
const angleGap = (a: number, b: number) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

type ShapeDefinition = {
  points: () => Point[];
  color: string;
  /** Moves the face up (−) or down (+) as a share of the body height. */
  faceY?: number;
  /** Signature characters keep their own material, whatever shading is picked. */
  material?: "glass" | "ink";
  /** A single big eye (centre and radius in the shape's own units), like the Devsloka logo's ring. */
  eye?: { x: number; y: number; r: number };
  /** Fruit details: skin markings inside the body and a crown on top. */
  fruit?: "strawberry" | "mango";
};

const SHAPES: Record<MascotShape, ShapeDefinition> = {
  circle: { points: () => polar(() => 1), color: "#F5A524" },
  square: { points: () => superellipse(1, 1, 5), color: "#E46BD1" },
  clover: { points: () => polar((a) => 0.8 + 0.2 * Math.abs(Math.cos(2 * (a + Math.PI / 4)))), color: "#3FA7F0" },
  flower: { points: () => polar((a) => 0.78 + 0.22 * Math.abs(Math.cos(2.5 * (a + Math.PI / 2)))), color: "#4CC764" },
  star: {
    points: () => polar((a) => 0.56 + 0.44 * ((Math.cos(5 * (a + Math.PI / 2)) + 1) / 2) ** 1.4),
    color: "#FFC93C",
  },
  sun: { points: () => polar((a) => 0.9 + 0.1 * Math.cos(10 * (a + Math.PI / 2))), color: "#FF8A3D" },
  hexagon: { points: () => smooth(polygon(6, Math.PI / 6), 4), color: "#8B7CF6" },
  triangle: { points: () => smooth(polygon(3), 5), color: "#2EC4B6", faceY: 0.12 },
  diamond: { points: () => smooth(polygon(4, 0, 1.2), 4), color: "#5BC0EB" },
  pill: { points: () => superellipse(1.35, 0.82, 2.6), color: "#F25F5C" },
  bean: {
    points: () => polar((a) => 1 - 0.24 * Math.exp(-((angleGap(a, 0) / 0.55) ** 2)), 1.18, 0.95),
    color: "#9BC53D",
  },
  heart: { points: heart, color: "#FF5C8A", faceY: -0.04 },
  cloud: {
    points: () =>
      polar((a) => 0.84 + 0.18 * ((1 - Math.sin(a)) / 2) * Math.abs(Math.cos(3 * (a + Math.PI / 2))), 1.3, 1),
    color: "#C9D6F2",
  },
  blob: {
    points: () =>
      polar((a) => 0.9 + 0.07 * Math.sin(2 * a + 0.5) + 0.05 * Math.sin(3 * a + 1.7) + 0.03 * Math.sin(5 * a + 0.3)),
    color: "#0A6EFF",
  },
  ghost: { points: ghost, color: "#ECEAF4", faceY: -0.12 },
  orb: { points: () => polar(() => 1), color: "#5B4BFF", faceY: -0.08, material: "glass" },
  bot: { points: () => polar(() => 1), color: "#111111", faceY: 0, material: "ink" },
  devsloka: { points: devsloka, color: "#0A6EFF", eye: { x: -0.06, y: 0.1, r: 0.74 } },
  strawberry: { points: strawberry, color: "#F2394B", faceY: -0.08, fruit: "strawberry" },
  mango: { points: mango, color: "#FFB627", faceY: -0.02, fruit: "mango" },
};

const BOX = { cx: 100, cy: 110, size: 136 };

type Geometry = {
  path: string;
  cx: number;
  top: number;
  faceY: number;
  bottom: number;
  width: number;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  eye?: { x: number; y: number; r: number };
  fruit?: "strawberry" | "mango";
};

function buildGeometry(shape: MascotShape): Geometry {
  const definition = SHAPES[shape];
  const raw = definition.points();
  const xs = raw.map((p) => p[0]);
  const ys = raw.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = BOX.size / Math.max(maxX - minX, maxY - minY);
  // Rounded to one decimal so server and browser produce the same path string.
  const round = (value: number) => Math.round(value * 10) / 10;
  const points = raw.map(([x, y]): Point => [
    round(BOX.cx + (x - (minX + maxX) / 2) * scale),
    round(BOX.cy + (y - (minY + maxY) / 2) * scale),
  ]);
  const height = (maxY - minY) * scale;
  const top = Math.min(...points.filter(([x]) => Math.abs(x - BOX.cx) < 12).map(([, y]) => y));
  return {
    path: `M${points.map(([x, y]) => `${x} ${y}`).join("L")}Z`,
    cx: BOX.cx,
    top,
    faceY: BOX.cy + (definition.faceY ?? -0.04) * height,
    bottom: BOX.cy + height / 2,
    width: (maxX - minX) * scale,
    bounds: {
      minX: Math.min(...points.map(([x]) => x)),
      maxX: Math.max(...points.map(([x]) => x)),
      minY: Math.min(...points.map(([, y]) => y)),
      maxY: Math.max(...points.map(([, y]) => y)),
    },
    fruit: definition.fruit,
    eye: definition.eye && {
      x: round(BOX.cx + (definition.eye.x - (minX + maxX) / 2) * scale),
      y: round(BOX.cy + (definition.eye.y - (minY + maxY) / 2) * scale),
      r: round(definition.eye.r * scale),
    },
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

const EYE_GAP = 19;
const EYE_LOOK = 7; // how far pupils travel, in viewBox units
const KEYFRAMES = `
@keyframes mascot-breathe { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.025, 0.975) translateY(2%); } }
@keyframes mascot-snooze { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.04, 0.96) translateY(3%); } }
@keyframes mascot-bob { from { transform: translateY(0); } to { transform: translateY(-4%); } }
@keyframes mascot-z { 0% { opacity: 0; transform: translate(0, 0) scale(0.8); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(10px, -24px) scale(1.1); } }
@keyframes mascot-orbit { to { transform: rotate(360deg); } }
`;

export function FuzzyMascot({
  shape = "blob",
  color,
  state = "idle",
  shading = "fabric",
  hat = "none",
  glasses = "none",
  furLength = 5,
  size = 160,
  trackPointer = true,
  label,
  spinOnClick = true,
  className,
  style,
  ...props
}: FuzzyMascotProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  // useId returns characters that break url(#id) references in some browsers.
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const geometry = useMemo(() => buildGeometry(shape), [shape]);
  const fill = color ?? SHAPES[shape].color;
  const seed = MASCOT_SHAPES.indexOf(shape) + 1;
  const fur = Math.max(0, Math.min(10, furLength));
  const asleep = state === "sleeping";
  const material: MascotShading | "ink" = SHAPES[shape].material ?? shading;

  // Eye direction and body lean, smoothed with springs. Motion values, so pointer
  // moves never re-render React.
  const lookX = useMotionValue(0);
  const lookY = useMotionValue(0);
  const lean = useMotionValue(0);
  const springConfig = reduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 220, damping: 20 };
  const eyeX = useSpring(lookX, springConfig);
  const eyeY = useSpring(lookY, springConfig);
  const bodyLean = useSpring(lean, springConfig);
  const eyesTransform = useMotionTemplate`translate(${eyeX}px, ${eyeY}px)`;
  // The single big eye has room to look further, so its pupil travels twice as far.
  const bigPupilX = useTransform(eyeX, (v) => v * 2);
  const bigPupilY = useTransform(eyeY, (v) => v * 2);
  const bigPupilTransform = useMotionTemplate`translate(${bigPupilX}px, ${bigPupilY}px)`;
  const leanTransform = useMotionTemplate`rotate(${bodyLean}deg)`;
  const blink = useMotionValue(1);
  const blinkTransform = useMotionTemplate`scaleY(${blink})`;
  // Bot: the whole visor turns toward the pointer, and the eyes drift a little within it.
  const visorX = useTransform(eyeX, (v) => v * 2.4);
  const visorY = useTransform(eyeY, (v) => v * 1.6);
  const visorTransform = useMotionTemplate`translate(${visorX}px, ${visorY}px)`;
  const pupilX = useTransform(eyeX, (v) => v * 0.5);
  const pupilY = useTransform(eyeY, (v) => v * 0.4);
  const pupilTransform = useMotionTemplate`translate(${pupilX}px, ${pupilY}px)`;
  const antennaLean = useTransform(bodyLean, (v) => v * 3);
  const antennaTransform = useMotionTemplate`rotate(${antennaLean}deg)`;

  // Click to spin: a crouch, a hop with a full turn, then a squishy landing.
  const hopY = useMotionValue(0);
  const spin = useMotionValue(0);
  const squashX = useMotionValue(1);
  const squashY = useMotionValue(1);
  const hopTransform = useMotionTemplate`translateY(${hopY}px) rotate(${spin}deg)`;
  const squashTransform = useMotionTemplate`scale(${squashX}, ${squashY})`;
  const spinning = useRef(false);
  const [cheering, setCheering] = useState(false);
  const [burst, setBurst] = useState(0);

  const celebrate = () => {
    if (spinning.current) return;
    spinning.current = true;
    setCheering(true);
    if (reduceMotion) {
      // No hop or turn: a small happy pulse.
      animate(squashX, [1, 1.06, 1], { duration: 0.3 });
      animate(squashY, [1, 1.06, 1], { duration: 0.3 }).then(() => {
        spinning.current = false;
        setCheering(false);
      });
      return;
    }
    setBurst((n) => n + 1);
    const duration = 1;
    const times = [0, 0.14, 0.6, 0.74, 0.88, 1];
    const rise = [0.2, 0.8, 0.4, 1] as const; // decelerates up
    const fall = [0.6, 0, 0.8, 0.3] as const; // speeds up down, like gravity
    animate(hopY, [0, 0, -size * 0.26, 0, -size * 0.04, 0], {
      duration,
      times,
      ease: ["linear", rise, fall, rise, [0.4, 0, 0.6, 1]],
    });
    animate(squashX, [1, 1.14, 0.9, 1.16, 0.96, 1], { duration, times });
    animate(squashY, [1, 0.84, 1.1, 0.86, 1.04, 1], { duration, times });
    animate(spin, [0, -10, 360, 360, 360, 360], {
      duration,
      times,
      ease: ["easeOut", [0.3, 0, 0.2, 1], "linear", "linear", "linear"],
    }).then(() => {
      spin.jump(0);
      spinning.current = false;
      setCheering(false);
    });
  };

  useEffect(() => {
    if (asleep) {
      lookX.set(0);
      lookY.set(0);
      lean.set(0);
      return;
    }
    if (state === "working") {
      // Heads-down: eyes on the "screen" in front, ignoring the pointer.
      lookX.set(-2);
      lookY.set(EYE_LOOK * 0.7);
      lean.set(0);
      return;
    }
    if (!trackPointer) return;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;
    const update = () => {
      frame = 0;
      const root = rootRef.current;
      if (!root || !pointer) return;
      const box = root.getBoundingClientRect();
      const dx = pointer.x - (box.left + box.width / 2);
      const dy = pointer.y - (box.top + box.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      // Full deflection from ~250px away; close in, the eyes move proportionally.
      const reach = Math.min(1, distance / 250) * EYE_LOOK;
      lookX.set((dx / distance) * reach);
      lookY.set((dy / distance) * reach);
      lean.set(Math.max(-1, Math.min(1, dx / 600)) * 4);
    };
    const handleMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    const handleLeave = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      pointer = null;
      lookX.set(0);
      lookY.set(0);
      lean.set(0);
    };
    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerout", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerout", handleLeave);
    };
  }, [asleep, state, trackPointer, lookX, lookY, lean]);

  // Blink every few seconds while awake.
  useEffect(() => {
    if (asleep || reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        animate(blink, [1, 0.1, 1], { duration: 0.2, times: [0, 0.45, 1] });
        schedule();
      }, 2500 + Math.random() * 3500);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [asleep, reduceMotion, blink]);

  const eyeColor = material === "glass" ? "white" : "#1d1b2e";
  const leftEye = geometry.cx - EYE_GAP;
  const rightEye = geometry.cx + EYE_GAP;
  const eyeY0 = geometry.faceY;

  return (
    <div
      ref={rootRef}
      data-slot="fuzzy-mascot"
      role={spinOnClick ? "button" : label === "" ? undefined : "img"}
      tabIndex={spinOnClick ? 0 : undefined}
      aria-hidden={!spinOnClick && label === "" ? true : undefined}
      aria-label={!spinOnClick && label === "" ? undefined : (label || `${shape} mascot, ${state}`)}
      onClick={spinOnClick ? celebrate : undefined}
      onKeyDown={
        spinOnClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                celebrate();
              }
            }
          : undefined
      }
      style={{ width: size, height: size, ...style }}
      className={cn(
        "relative inline-block shrink-0 select-none",
        spinOnClick && "cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#0A6EFF] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
        className
      )}
      {...props}
    >
      <style href="fuzzy-mascot-keyframes" precedence="default">
        {KEYFRAMES}
      </style>
      {burst > 0 && <Sparkles key={burst} color={fill} size={size} />}
      <motion.div className="absolute inset-0" style={{ transform: leanTransform, transformOrigin: "50% 90%" }}>
       <motion.div className="absolute inset-0" style={{ transform: hopTransform }}>
        <motion.div className="absolute inset-0" style={{ transform: squashTransform, transformOrigin: "50% 92%" }}>
        <div
          className={cn(
            "absolute inset-0 origin-bottom motion-reduce:animate-none",
            state === "idle" && "animate-[mascot-breathe_3.4s_ease-in-out_infinite]",
            state === "working" && "animate-[mascot-bob_0.55s_ease-in-out_infinite_alternate]",
            asleep && "animate-[mascot-snooze_4.8s_ease-in-out_infinite]"
          )}
        >
          {/* Body layer: filters and shading. It never changes while the eyes move. */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <BodyDefs id={id} geometry={geometry} fur={fur} seed={seed} />
            {material !== "glass" && (
              <ellipse
                cx={geometry.cx}
                cy={geometry.bottom + 10}
                rx={geometry.width * 0.36}
                ry={7}
                fill="black"
                opacity={0.28}
                filter={`url(#${id}-soft)`}
              />
            )}
            <Body id={id} geometry={geometry} fill={fill} shading={material} fur={fur} />
            {geometry.fruit && hat === "none" && <FruitCrown kind={geometry.fruit} x={geometry.cx} y={geometry.top} />}
            <Hat kind={hat} x={geometry.cx} y={geometry.top} />
          </svg>

          {/* Face layer: eyes, glasses and state effects, repainted on its own. */}
          <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden>
            {material === "ink" ? (
              <BotFace
                id={id}
                geometry={geometry}
                state={state}
                cheering={cheering}
                showAntenna={hat === "none"}
                visorTransform={visorTransform}
                pupilTransform={pupilTransform}
                blinkTransform={blinkTransform}
                antennaTransform={antennaTransform}
              />
            ) : geometry.eye ? (
              <CyclopsEye
                eye={geometry.eye}
                state={state}
                cheering={cheering}
                glasses={glasses}
                pupilTransform={bigPupilTransform}
                blinkTransform={blinkTransform}
              />
            ) : (
              <motion.g style={{ transform: eyesTransform }}>
                <motion.g style={{ transform: blinkTransform, transformBox: "fill-box", transformOrigin: "center" }}>
                  <Eyes
                    left={leftEye}
                    right={rightEye}
                    y={eyeY0}
                    state={state}
                    cheering={cheering}
                    color={eyeColor}
                    pill={material === "glass"}
                  />
                </motion.g>
              </motion.g>
            )}

            {material !== "ink" && !geometry.eye && <Glasses kind={glasses} left={leftEye} right={rightEye} y={eyeY0} />}

            {state === "working" && (
              // Loading dots orbit beside the head, clear of any hat.
              <g
                className="animate-[mascot-orbit_1.4s_linear_infinite] motion-reduce:animate-none"
                style={{ transformOrigin: `${geometry.cx + 58}px ${geometry.top + 6}px`, transformBox: "view-box" }}
              >
                {[0, 120, 240].map((deg) => (
                  <circle
                    key={deg}
                    cx={geometry.cx + 58 + Math.cos((deg * Math.PI) / 180) * 9}
                    cy={geometry.top + 6 + Math.sin((deg * Math.PI) / 180) * 9}
                    r={3}
                    fill={fill}
                    opacity={0.9}
                  />
                ))}
              </g>
            )}

            {asleep &&
              [0, 1, 2].map((i) => (
                <text
                  key={i}
                  x={geometry.cx + 34 + i * 8}
                  y={geometry.top + 6 - i * 10}
                  fontSize={12 + i * 3}
                  fontWeight={700}
                  fill="currentColor"
                  className="animate-[mascot-z_2.4s_ease-out_infinite] text-neutral-400 opacity-0 motion-reduce:animate-none motion-reduce:opacity-70"
                  style={{ animationDelay: `${i * 0.8}s`, transformBox: "fill-box" }}
                >
                  z
                </text>
              ))}
          </svg>
        </div>
        </motion.div>
       </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Body & shading ──────────────────────────────────────────────────────────

function BodyDefs({ id, geometry, fur, seed }: { id: string; geometry: Geometry; fur: number; seed: number }) {
  return (
    <defs>
      <clipPath id={`${id}-clip`}>
        <path d={geometry.path} />
      </clipPath>
      {/* Volume: a soft top-left light and a bottom-right shade make the flat shape read as plump. */}
      <radialGradient id={`${id}-light`} cx="34%" cy="26%" r="70%">
        <stop offset="0" stopColor="white" stopOpacity={0.55} />
        <stop offset="0.55" stopColor="white" stopOpacity={0} />
      </radialGradient>
      <radialGradient id={`${id}-shade`} cx="62%" cy="78%" r="75%">
        <stop offset="0.35" stopColor="black" stopOpacity={0} />
        <stop offset="1" stopColor="black" stopOpacity={0.38} />
      </radialGradient>
      <filter id={`${id}-soft`} x="-50%" y="-200%" width="200%" height="500%">
        <feGaussianBlur stdDeviation={5} />
      </filter>
      {/* Fabric: noise pushes edge pixels outward into fibres; the length sets how far. */}
      <filter id={`${id}-fur`} x="-25%" y="-25%" width="150%" height="150%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={seed} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={3 + fur * 2.2} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* Fine fibre grain laid over the fabric body. */}
      <filter id={`${id}-grain`}>
        <feTurbulence type="fractalNoise" baseFrequency="1.6 0.6" numOctaves={2} seed={seed + 7} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      {/* Crêpe: stretched noise, lit from the top-left, multiplied into the body. */}
      <filter id={`${id}-crepe`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.075" numOctaves={3} seed={seed} result="noise" />
        <feDiffuseLighting in="noise" surfaceScale={2.4} lightingColor="white" result="light">
          <feDistantLight azimuth={225} elevation={52} />
        </feDiffuseLighting>
        <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k1={0.75} k2={0} k3={0.32} k4={0} result="lit" />
        <feComposite in="lit" in2="SourceAlpha" operator="in" />
      </filter>
      <filter id={`${id}-gloss`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation={4} />
      </filter>
    </defs>
  );
}

function Body({
  id,
  geometry,
  fill,
  shading,
  fur,
}: {
  id: string;
  geometry: Geometry;
  fill: string;
  shading: MascotShading | "ink";
  fur: number;
}) {
  const skin = geometry.fruit ? <FruitSkin id={id} geometry={geometry} /> : null;
  const shape = (
    <g>
      <path d={geometry.path} fill={fill} />
      {skin}
    </g>
  );
  const volume = (
    <g clipPath={`url(#${id}-clip)`}>
      <rect width="200" height="200" fill={`url(#${id}-light)`} />
      <rect width="200" height="200" fill={`url(#${id}-shade)`} />
    </g>
  );

  switch (shading) {
    case "flat":
      return shape;
    case "ink":
      // A faint rim: invisible on light backgrounds, enough to outline the head on dark ones.
      return (
        <g>
          {shape}
          <path d={geometry.path} fill="none" stroke="white" strokeOpacity={0.14} strokeWidth={1.5} />
        </g>
      );
    case "glass":
      return (
        <g>
          <defs>
            <radialGradient id={`${id}-glass`} cx="45%" cy="30%" r="80%">
              <stop offset="0" style={{ stopColor: `color-mix(in oklab, ${fill} 45%, white)` }} />
              <stop offset="0.45" style={{ stopColor: fill }} />
              <stop offset="1" style={{ stopColor: `color-mix(in oklab, ${fill} 70%, black)` }} />
            </radialGradient>
            <radialGradient id={`${id}-underglow`} cx="50%" cy="100%" r="55%">
              <stop offset="0" stopColor="#7CF3FF" stopOpacity={0.95} />
              <stop offset="1" stopColor="#7CF3FF" stopOpacity={0} />
            </radialGradient>
            <filter id={`${id}-bloom`} x="-50%" y="-100%" width="200%" height="300%">
              <feGaussianBlur stdDeviation={10} />
            </filter>
          </defs>
          {/* Light spilling onto the floor beneath a glowing glass body. */}
          <ellipse cx={geometry.cx} cy={geometry.bottom - 2} rx={geometry.width * 0.38} ry={16} fill="#5CE1FF" opacity={0.5} filter={`url(#${id}-bloom)`} />
          <path d={geometry.path} fill={`url(#${id}-glass)`} />
          {skin}
          <g clipPath={`url(#${id}-clip)`}>
            <rect width="200" height="200" fill={`url(#${id}-underglow)`} />
            <ellipse cx={geometry.cx - 18} cy={geometry.top + 26} rx={34} ry={20} fill="white" opacity={0.35} filter={`url(#${id}-gloss)`} />
            {/* A soft bright rim, as light catches the edge of the glass. */}
            <path d={geometry.path} fill="none" stroke="white" strokeOpacity={0.6} strokeWidth={7} filter={`url(#${id}-gloss)`} />
          </g>
        </g>
      );
    case "smooth":
      return (
        <g>
          {shape}
          {volume}
        </g>
      );
    case "plastic":
      return (
        <g>
          {shape}
          {volume}
          <g clipPath={`url(#${id}-clip)`}>
            {/* A broad soft sheen plus a sharp hot spot: the two marks of a glossy surface. */}
            <ellipse cx={geometry.cx - 22} cy={geometry.top + 30} rx={30} ry={18} fill="white" opacity={0.55} filter={`url(#${id}-gloss)`} />
            <ellipse cx={geometry.cx - 26} cy={geometry.top + 24} rx={8} ry={5} fill="white" opacity={0.9} />
          </g>
          <path d={geometry.path} fill="none" stroke="white" strokeOpacity={0.25} strokeWidth={2} />
        </g>
      );
    case "crepe":
      return (
        <g filter={`url(#${id}-crepe)`}>
          {shape}
          {volume}
        </g>
      );
    case "fabric":
    default:
      return (
        <g filter={fur > 0 ? `url(#${id}-fur)` : undefined}>
          {shape}
          <g clipPath={`url(#${id}-clip)`}>
            <rect width="200" height="200" filter={`url(#${id}-grain)`} opacity={0.32} style={{ mixBlendMode: "soft-light" }} />
          </g>
          {volume}
        </g>
      );
  }
}

// ─── Fruit ───────────────────────────────────────────────────────────────────

// Markings on the fruit's skin, drawn inside the body so the shading (and fur) covers them.
function FruitSkin({ id, geometry }: { id: string; geometry: Geometry }) {
  const { bounds, cx, faceY } = geometry;
  if (geometry.fruit === "mango") {
    return (
      <g clipPath={`url(#${id}-clip)`}>
        <defs>
          <radialGradient id={`${id}-blush`} cx="78%" cy="82%" r="70%">
            <stop offset="0" stopColor="#F24C3D" stopOpacity={0.85} />
            <stop offset="0.55" stopColor="#FF7A2F" stopOpacity={0.45} />
            <stop offset="1" stopColor="#FF7A2F" stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${id}-ripe`} cx="22%" cy="18%" r="55%">
            <stop offset="0" stopColor="#C9E265" stopOpacity={0.32} />
            <stop offset="1" stopColor="#C9E265" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#${id}-ripe)`} />
        <rect width="200" height="200" fill={`url(#${id}-blush)`} />
      </g>
    );
  }
  // Strawberry seeds on a staggered grid, leaving the face clear.
  const seeds: Point[] = [];
  for (let row = 0, y = bounds.minY + 24; y < bounds.maxY - 8; row++, y += 14) {
    for (let x = bounds.minX + (row % 2 ? 14 : 7); x < bounds.maxX; x += 14) {
      if (Math.abs(x - cx) < 34 && Math.abs(y - faceY) < 22) continue;
      seeds.push([x, y]);
    }
  }
  return (
    <g clipPath={`url(#${id}-clip)`}>
      {seeds.map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={1.8} ry={2.8} fill="#FFE7A0" opacity={0.9} />
      ))}
    </g>
  );
}

// The leafy crown of a strawberry, or a mango's stem and leaf.
function FruitCrown({ kind, x, y }: { kind: "strawberry" | "mango"; x: number; y: number }) {
  if (kind === "mango") {
    return (
      <g>
        <path d={`M${x + 1} ${y + 4} q2 -8 6 -13`} fill="none" stroke="#6B4423" strokeWidth={3.5} strokeLinecap="round" />
        <path d={`M${x + 6} ${y - 9} q15 -12 30 -3 q-15 11 -30 3 Z`} fill="#4CAF50" />
        <path d={`M${x + 7} ${y - 9} q12 -4 26 -3`} fill="none" stroke="#2E7D32" strokeWidth={1.4} strokeLinecap="round" />
      </g>
    );
  }
  // Leaves splay out over the shoulders from a short stem.
  const leaves = [150, 175, 212, 328, 5, 30];
  return (
    <g>
      {leaves.map((deg) => {
        const radians = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={deg}
            cx={x + Math.cos(radians) * 16}
            cy={y + 5 + Math.sin(radians) * 7}
            rx={16}
            ry={5.4}
            fill="#3FA34D"
            transform={`rotate(${deg} ${x + Math.cos(radians) * 16} ${y + 5 + Math.sin(radians) * 7})`}
          />
        );
      })}
      <circle cx={x} cy={y + 4} r={6} fill="#358A41" />
      <path d={`M${x} ${y + 2} q1 -8 4 -13`} fill="none" stroke="#358A41" strokeWidth={4} strokeLinecap="round" />
    </g>
  );
}

// ─── Faces ───────────────────────────────────────────────────────────────────

// The Devsloka logo come alive: its white ring is the eye, the dark centre is the pupil.
function CyclopsEye({
  eye,
  state,
  cheering,
  glasses,
  pupilTransform,
  blinkTransform,
}: {
  eye: { x: number; y: number; r: number };
  state: MascotState;
  cheering: boolean;
  glasses: MascotGlasses;
  pupilTransform: MotionValue<string>;
  blinkTransform: MotionValue<string>;
}) {
  const { x, y, r } = eye;
  const pupil = r * 0.64;
  const ink = "#0B1530";

  const monocle =
    glasses === "none" ? null : glasses === "sunglasses" ? (
      <g>
        <circle cx={x} cy={y} r={r + 3} fill="#111114" />
        <path d={`M${x - r * 0.5} ${y - r * 0.45} l${r * 0.35} 0`} stroke="white" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
      </g>
    ) : (
      // One eye, so glasses become a monocle on a little chain.
      <g fill="none" stroke={ink} strokeWidth={3}>
        <circle cx={x} cy={y} r={r + 3} />
        <path d={`M${x + (r + 3) * 0.7} ${y + (r + 3) * 0.7} q10 18 -4 34`} strokeWidth={2} strokeLinecap="round" />
      </g>
    );

  if (cheering || state === "sleeping") {
    // Happy ^ while celebrating; a closed lid while asleep.
    const d = cheering
      ? `M${x - r * 0.62} ${y + r * 0.22} q${r * 0.62} ${-r * 0.95} ${r * 1.24} 0`
      : `M${x - r * 0.62} ${y} q${r * 0.62} ${r * 0.55} ${r * 1.24} 0`;
    return (
      <g>
        <path d={d} fill="none" stroke="white" strokeWidth={7} strokeLinecap="round" />
        {monocle}
      </g>
    );
  }

  return (
    <g>
      <motion.g style={{ transform: blinkTransform, transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx={x} cy={y} r={r} fill="white" />
        <motion.g style={{ transform: pupilTransform }}>
          {/* The logo's pupil: a round centre with a small tail at the bottom right. */}
          <circle cx={x} cy={y} r={pupil} fill={ink} />
          <circle cx={x + pupil * 0.62} cy={y + pupil * 0.62} r={pupil * 0.34} fill={ink} />
          <circle cx={x - pupil * 0.32} cy={y - pupil * 0.38} r={pupil * 0.18} fill="white" opacity={0.9} />
        </motion.g>
      </motion.g>
      {monocle}
    </g>
  );
}

function Eyes({
  left,
  right,
  y,
  state,
  cheering,
  color,
  pill,
}: {
  left: number;
  right: number;
  y: number;
  state: MascotState;
  cheering: boolean;
  color: string;
  pill: boolean;
}) {
  // Happy ^ ^ while celebrating; closed arcs while asleep.
  if (cheering || state === "sleeping") {
    const arc = cheering ? "q9.5 -11 19 0" : "q9.5 8 19 0";
    return (
      <g fill="none" stroke={color} strokeWidth={4} strokeLinecap="round">
        <path d={`M${left - 9.5} ${y + (cheering ? 4 : 0)} ${arc}`} />
        <path d={`M${right - 9.5} ${y + (cheering ? 4 : 0)} ${arc}`} />
      </g>
    );
  }
  return (
    <g>
      {[left, right].map((x) =>
        pill ? (
          <rect key={x} x={x - 4.5} y={y - (state === "working" ? 6 : 10)} width={9} height={state === "working" ? 12 : 20} rx={4.5} fill={color} />
        ) : (
          <g key={x}>
            <ellipse cx={x} cy={y} rx={10} ry={state === "working" ? 10 : 14.5} fill={color} />
            <circle cx={x + 3} cy={y - 5} r={2.8} fill="white" opacity={0.85} />
          </g>
        )
      )}
    </g>
  );
}

function BotFace({
  id,
  geometry,
  state,
  cheering,
  showAntenna,
  visorTransform,
  pupilTransform,
  blinkTransform,
  antennaTransform,
}: {
  id: string;
  geometry: Geometry;
  state: MascotState;
  cheering: boolean;
  showAntenna: boolean;
  visorTransform: MotionValue<string>;
  pupilTransform: MotionValue<string>;
  blinkTransform: MotionValue<string>;
  antennaTransform: MotionValue<string>;
}) {
  const { cx, faceY: y, top } = geometry;
  const ink = "#111111";
  const eyes = [cx - 38, cx - 10];
  return (
    <g>
      <defs>
        <clipPath id={`${id}-face-clip`}>
          <path d={geometry.path} />
        </clipPath>
      </defs>
      {showAntenna && (
        <motion.g style={{ transform: antennaTransform, transformOrigin: `${cx + 10}px ${top + 4}px`, transformBox: "view-box" }}>
          <path d={`M${cx + 10} ${top + 4} L${cx + 26} ${top - 24}`} stroke={ink} strokeWidth={5} strokeLinecap="round" />
          <circle cx={cx + 28} cy={top - 27} r={7.5} fill={ink} />
        </motion.g>
      )}
      {/* The visor slides toward the pointer and is clipped by the round head. */}
      <g clipPath={`url(#${id}-face-clip)`}>
        <motion.g style={{ transform: visorTransform }}>
          <rect x={cx - 66} y={y - 26} width={110} height={52} rx={26} fill="white" />
          <motion.g style={{ transform: pupilTransform }}>
            {cheering || state === "sleeping" ? (
              <g fill="none" stroke={ink} strokeWidth={4} strokeLinecap="round">
                {eyes.map((x) => (
                  <path key={x} d={cheering ? `M${x - 8} ${y + 3} q8 -10 16 0` : `M${x - 8} ${y} q8 7 16 0`} />
                ))}
              </g>
            ) : (
              <motion.g style={{ transform: blinkTransform, transformBox: "fill-box", transformOrigin: "center" }}>
                {eyes.map((x) => (
                  <ellipse key={x} cx={x} cy={y} rx={8} ry={state === "working" ? 5 : 9} fill={ink} />
                ))}
              </motion.g>
            )}
            {/* A little cheek line, like a smile seen side-on. */}
            <path d={`M${cx + 14} ${y - 12} q8 12 0 24`} fill="none" stroke={ink} strokeWidth={4} strokeLinecap="round" />
          </motion.g>
        </motion.g>
      </g>
    </g>
  );
}

// A small burst of sparkles when the mascot is clicked. Re-mounted per click.
function Sparkles({ color, size }: { color: string; size: number }) {
  const sparks = [-150, -115, -80, -45, -10, 25];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      {sparks.map((deg, i) => {
        const radians = (deg * Math.PI) / 180;
        const distance = size * (0.42 + (i % 2) * 0.12);
        return (
          <motion.svg
            key={deg}
            viewBox="0 0 20 20"
            className="absolute top-[30%] left-1/2 size-4"
            style={{ marginLeft: -8, marginTop: -8, color: i % 2 ? "#FFD23F" : color }}
            initial={{ opacity: 1, transform: "translate(0px, 0px) scale(0.4) rotate(0deg)" }}
            animate={{
              opacity: 0,
              transform: `translate(${Math.cos(radians) * distance}px, ${Math.sin(radians) * distance}px) scale(1) rotate(90deg)`,
            }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
          >
            <path d="M10 0 C11 7 13 9 20 10 C13 11 11 13 10 20 C9 13 7 11 0 10 C7 9 9 7 10 0 Z" fill="currentColor" />
          </motion.svg>
        );
      })}
    </div>
  );
}

// ─── Accessories ─────────────────────────────────────────────────────────────

function Hat({ kind, x, y }: { kind: MascotHat; x: number; y: number }) {
  if (kind === "none") return null;
  // Hats sit on the top of the head with a jaunty tilt.
  const place = `translate(${x + 4} ${y + 6}) rotate(-10)`;
  switch (kind) {
    case "party":
      return (
        <g transform={place}>
          <path d="M-20 0 L4 -50 L22 0 Z" fill="#FFD23F" />
          <path d="M-12 -16 L13 -16 M-6 -30 L9 -30" stroke="#FF5C8A" strokeWidth={5} strokeLinecap="round" />
          <circle cx={4} cy={-52} r={6} fill="#FF5C8A" />
        </g>
      );
    case "beanie":
      return (
        <g transform={place}>
          <path d="M-27 -2 C-27 -34 27 -34 27 -2 Z" fill="#E4572E" />
          <rect x={-30} y={-8} width={60} height={11} rx={5} fill="#C8432A" />
          <circle cx={0} cy={-31} r={7} fill="#F3F0E8" />
        </g>
      );
    case "wizard":
      return (
        <g transform={place}>
          <path d="M-22 0 Q-4 -40 14 -62 Q8 -30 24 0 Z" fill="#5B4BDB" />
          <ellipse cx={1} cy={0} rx={34} ry={7} fill="#4535BF" />
          <path d="M3 -24 l2.4 5 5.4 .6 -4 3.7 1.1 5.3 -4.9 -2.7 -4.9 2.7 1.1 -5.3 -4 -3.7 5.4 -.6 Z" fill="#FFD23F" />
        </g>
      );
    case "tophat":
      return (
        <g transform={place}>
          <rect x={-17} y={-40} width={34} height={38} rx={4} fill="#1F1F24" />
          <rect x={-17} y={-14} width={34} height={7} fill="#0A6EFF" />
          <ellipse cx={0} cy={-1} rx={30} ry={6} fill="#1F1F24" />
        </g>
      );
  }
}

function Glasses({ kind, left, right, y }: { kind: MascotGlasses; left: number; right: number; y: number }) {
  if (kind === "none") return null;
  const stroke = { stroke: "#1d1b2e", strokeWidth: 3.2, strokeLinecap: "round" as const };
  const bridge = <path d={`M${left + 15} ${y - 2} Q${(left + right) / 2} ${y - 7} ${right - 15} ${y - 2}`} fill="none" {...stroke} />;
  switch (kind) {
    case "round":
      return (
        <g>
          <circle cx={left} cy={y} r={16} fill="white" fillOpacity={0.12} {...stroke} />
          <circle cx={right} cy={y} r={16} fill="white" fillOpacity={0.12} {...stroke} />
          {bridge}
        </g>
      );
    case "square":
      return (
        <g>
          <rect x={left - 16} y={y - 14} width={32} height={28} rx={7} fill="white" fillOpacity={0.12} {...stroke} />
          <rect x={right - 16} y={y - 14} width={32} height={28} rx={7} fill="white" fillOpacity={0.12} {...stroke} />
          {bridge}
        </g>
      );
    case "sunglasses":
      return (
        <g>
          <rect x={left - 17} y={y - 13} width={34} height={24} rx={9} fill="#111114" {...stroke} />
          <rect x={right - 17} y={y - 13} width={34} height={24} rx={9} fill="#111114" {...stroke} />
          {bridge}
          <path d={`M${left - 9} ${y - 5} l7 0 M${right - 9} ${y - 5} l7 0`} stroke="white" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />
        </g>
      );
  }
}
