"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { FloatingDots } from "@/components/ui/floating-dots";
import { cn } from "@/lib/utils";

type Position = number[];
type Ring = Position[];
type CountryGeometry =
  | { type: "Polygon"; coordinates: Ring[] }
  | { type: "MultiPolygon"; coordinates: Ring[][] };
type CountryCollection = {
  features?: { geometry?: CountryGeometry | null }[];
};

export type GlobeBackgroundProps = Omit<React.ComponentProps<"div">, "children"> & {
  /**
   * URL of a countries GeoJSON FeatureCollection (Polygon/MultiPolygon features) used to draw borders.
   * You must host this file yourself, e.g. in `public/`. Get one from
   * https://github.com/nvkelso/natural-earth-vector (110m admin-0 countries) or any countries GeoJSON.
   * If it fails to load, the globe renders without borders.
   * @default "/countries-110m.geojson"
   */
  geoJsonUrl?: string;
  /** Globe surface color (hex, rgb(), hsl() or a named color). @default "#182b4b" */
  globeColor?: string;
  /** Country border color (hex, rgb(), hsl() or a named color). @default "#ffffff" */
  lineColor?: string;
  /** Auto-rotation speed in radians per second. @default 0.15 */
  rotationSpeed?: number;
  /** Let users drag to rotate the globe. Blocks touch scrolling over it, so it is off by default. @default false */
  interactive?: boolean;
  /** Overlay drifting dots behind the globe. @default true */
  showDots?: boolean;
};

const GLOBE_RADIUS = 1;
const BORDER_RADIUS = 1.005;
// Initial orientation: India faces the viewer.
const FOCUS_LON = THREE.MathUtils.degToRad(78.9629);
const FOCUS_LAT = THREE.MathUtils.degToRad(20.5937);
const MAX_FRAME_DELTA = 0.1;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(reducedMotionQuery);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const getServerReducedMotion = () => false;

/** Flattens every ring of every country into line-segment pairs on a sphere. */
function buildBorderPositions(collection: CountryCollection): Float32Array {
  const rings: Ring[] = [];
  for (const feature of collection.features ?? []) {
    const geometry = feature.geometry;
    if (geometry?.type === "Polygon") rings.push(...geometry.coordinates);
    else if (geometry?.type === "MultiPolygon") {
      for (const polygon of geometry.coordinates) rings.push(...polygon);
    }
  }

  let segments = 0;
  for (const ring of rings) segments += Math.max(ring.length - 1, 0);

  const positions = new Float32Array(segments * 6);
  const point = new THREE.Vector3();
  let offset = 0;
  for (const ring of rings) {
    for (let i = 0; i < ring.length; i++) {
      const [lon, lat] = ring[i];
      point.setFromSphericalCoords(
        BORDER_RADIUS,
        THREE.MathUtils.degToRad(90 - lat),
        THREE.MathUtils.degToRad(lon),
      );
      // End of the previous segment, then start of the next one.
      if (i > 0) {
        point.toArray(positions, offset);
        offset += 3;
      }
      if (i < ring.length - 1) {
        point.toArray(positions, offset);
        offset += 3;
      }
    }
  }
  return positions;
}

function Globe({
  borders,
  globeColor,
  lineColor,
  rotationSpeed,
  animate,
}: {
  borders: Float32Array | null;
  globeColor: string;
  lineColor: string;
  rotationSpeed: number;
  animate: boolean;
}) {
  const spinRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!animate || !spinRef.current) return;
    spinRef.current.rotation.y += Math.min(delta, MAX_FRAME_DELTA) * rotationSpeed;
  });

  return (
    <group rotation={[FOCUS_LAT, 0, 0]}>
      <group ref={spinRef} rotation={[0, -FOCUS_LON, 0]}>
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS * 0.97, 64, 64]} />
          <meshPhongMaterial
            color={globeColor}
            specular="#204080"
            shininess={5}
            transparent
            opacity={0.95}
          />
        </mesh>
        {borders && borders.length > 0 && (
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[borders, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={lineColor} transparent opacity={0.8} />
          </lineSegments>
        )}
      </group>
    </group>
  );
}

/**
 * A slowly rotating 3D globe with country borders over a dark backdrop. Fills its nearest positioned ancestor.
 * Country borders are loaded from `geoJsonUrl`, which you need to host yourself (see the prop docs).
 * Rendering pauses offscreen; auto-rotation stops when reduced motion is preferred.
 */
export function GlobeBackground({
  geoJsonUrl = "/countries-110m.geojson",
  globeColor = "#182b4b",
  lineColor = "#ffffff",
  rotationSpeed = 0.15,
  interactive = false,
  showDots = true,
  className,
  ...props
}: GlobeBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [countries, setCountries] = useState<CountryCollection | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(geoJsonUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${geoJsonUrl}: ${response.status}`);
        return response.json() as Promise<CountryCollection>;
      })
      .then(setCountries)
      .catch(() => {
        // Aborted or unavailable: render the globe without borders.
        if (!controller.signal.aborted) setCountries(null);
      });
    return () => controller.abort();
  }, [geoJsonUrl]);

  const borders = useMemo(() => (countries ? buildBorderPositions(countries) : null), [countries]);
  const animate = visible && !reducedMotion;

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="3d-background"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_center,#0b1a3a_0%,#020617_70%)] text-white",
        className,
      )}
      {...props}
    >
      {showDots && <FloatingDots maxRadius={0.5} minSpeed={0.1} maxSpeed={0.8} />}
      <div className={cn("absolute inset-0", interactive && "pointer-events-auto")}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop={animate ? "always" : "demand"}
          camera={{ position: [0, 0.4, 2.2], fov: 75 }}
          onCreated={({ camera }) => camera.lookAt(0, 0.2, 0)}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <Globe
            borders={borders}
            globeColor={globeColor}
            lineColor={lineColor}
            rotationSpeed={rotationSpeed}
            animate={animate}
          />
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.3}
              target={[0, 0.2, 0]}
            />
          )}
        </Canvas>
      </div>
    </div>
  );
}
