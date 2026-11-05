# Linework (linework.devsloka.in)

94 interactive isometric line illustrations, drawn as "one idea = one object, one stroke, no fills, no colour". Each figure responds to the pointer, plays a short "tour" until a real pointer arrives, pauses off-screen, and respects reduced motion. Use these instead of icon grids and stock illustrations: one figure explains a feature better than six icons.

## Install and use

```bash
npx shadcn@latest add https://linework.devsloka.in/r/<name>.json   # e.g. zipper
```
- The first figure also installs the shared engine (`src/lib/linework/*`, `src/components/linework/linework-figure.tsx`).
- Each figure lands in `src/components/linework/<name>.tsx`.
- Import: `import { Zipper } from "@/components/linework/zipper"`, then `<Zipper />`.
- Props (all figures): `readout?: boolean` (small mono read-out top-right, default true), `tour?: boolean` (auto demo until a pointer arrives, default true), `label?: string` (aria-label, default "<Name> illustration"), `className`.
- Box: aspect-ratio 5/4 (viewBox 400×320). Size it by width: at least 480px wide in a desktop feature row (about 360px stacked on mobile, full width). Undersized figures in big sections were the most common weakness in testing.
- Index: `https://linework.devsloka.in/r/registry.json`. Details per figure: `https://linework.devsloka.in/figures/<slug>`. Full list: `https://linework.devsloka.in/llms.txt`.

## Theming

Figures set no colour of their own. They read CSS variables, so define them per preset in `globals.css`:

| Variable | Light default | Dark default | Role |
|---|---|---|---|
| `--hairline-plate` | `#ffffff` | `#08090a` | background plate (match your section bg) |
| `--hairline-hi` | `#232327` | `#d0d6e0` | primary stroke |
| `--hairline-edge` | `#a4a4ac` | `#5b5d64` | secondary stroke |
| `--hairline-mid` | `#c3c3c9` | `#3e3e44` | tertiary |
| `--hairline-lo` | `#e0e0e4` | `#29292d` | faintest |
| `--hairline-stroke` | `0.9` | | stroke width |

Theme follows `.dark` or `[data-theme=dark]` on an ancestor, or force it with `data-hairline-theme="light|dark"` on the figure. To tint a figure with the brand, set `--hairline-hi` to the brand colour on that one figure's wrapper (once per page, as the signature). Keep the others in ink.

Set `--hairline-plate` to the background of the section the figure sits on, so it doesn't show as a white box on paper or dark backgrounds. This is the most common mistake.

## Usage rules

- Use one figure per feature, with a metaphor that matches the feature's *mechanism*, not just its topic (sync = `zipper`, security = `vault`, load = `plinko`).
- Use `readout={false}` in calm presets (paper, editorial) and keep it in precision and brutalist, where the mono read-out adds texture.
- Show at most 4–5 figures per page. They're the illustration system, not confetti.
- Large hero use: one figure at 480–640px wide beside the headline (precision, paper).

## Catalog (registry name → Export: metaphor)

**UI/UX design:** `switchboard` → Switchboard: toggles flip near the pointer · `fandeck` → Fandeck: colour-swatch fan · `wireframe` → Wireframe: layout tiles lift off their slots
**Web dev:** `keyboard` → Keyboard: keys press on springs · `serverrack` → ServerRack: blades slide out · `locks` → Locks: canal-lock pipeline, gates step water down
**Frontend:** `devices` → Breakpoints: phone/tablet/laptop, the hovered one stands up · `layers` → Layers: UI split into a layer stack · `pixels` → Pixels: lit pixels fade, then a button glows
**Backend:** `queue` → MessageQueue: crates on a conveyor to a worker · `shards` → Shards: disk platters, a shard slides out · `plinko` → LoadBalancer: plinko board, bins fill
**Full stack:** `tiers` → TieredStack: DB→UI tiers lift apart · `elevator` → Elevator: car called to a floor · `toolbox` → Toolbox: trays step out
**Motion graphics:** `flipbook` → Flipbook: scrubbed by pointer · `zoetrope` → Zoetrope: push to spin · `easerail` → EaseRail: five easings on springs
**Video editing:** `timeline` → Timeline: playhead follows pointer · `reels` → FilmReels: film between reels · `splice` → Splice: film cut at the pointer
**Sound design:** `mixer` → MixingDesk: faders rise · `knobs` → KnobPanel: knobs turn to the pointer · `speakerwall` → SpeakerWall: cones push out
**SEO:** `loupe` → Loupe: keyword tiles rise under a lens · `podium` → Rankings: results staircase · `catalog` → CardCatalog: drawer slides out
**Content creation:** `dolly` → Dolly: camera on a slider rail · `clapper` → Clapper: film slate · `ringlight` → RingLight: LEDs light toward aim
**Social media:** `crowd` → Crowd: followers lean in · `feed` → Feed: endless phone feed · `dominoes` → Dominoes: spiral topples (virality)
**Esports:** `jerseys` → Jerseys · `trophy` → Trophy on a turntable · `lineup` → Lineup: five chairs
**Podcasts:** `boomarm` → BoomArm mic · `roundtable` → RoundTable: four mics · `tapes` → Tapes: cassette rack
**Empty states:** `sieve` → Sieve ("no results") · `notfound` → NotFound: blank card file · `hangers` → Hangers (empty cart) · `trays` → LetterTrays (inbox zero)
**DevOps:** `conveyor` → Conveyor: build/test/deploy belt · `crane` → Crane: gantry over containers · `valves` → Valves: rollout manifold
**Git:** `railyard` → Railyard: branches as rail switches · `zipper` → Zipper: merge · `hanoi` → Hanoi: rebase as Tower of Hanoi
**Databases:** `harddrive` → HardDrive: arm seeks a track · `rolodex` → Rolodex: rotary card file · `jars` → Jars: key-value shelf
**AI/ML:** `abacus` → Abacus: weights · `descent` → Descent: gradient descent marble · `robotarm` → RobotArm: an agent reaching
**Security:** `vault` → Vault: combination dial · `keyring` → Keyring: keys swing up · `bollards` → Bollards: firewall sinks
**Testing:** `coverage` → Coverage: bed of nails · `calipers` → Calipers: measurement · `testtubes` → TestTubes: failed tube lifts
**Mobile:** `homescreen` → HomeScreen: app tiles rise · `foldable` → Foldable phone · `watch` → Watch: crown and detents
**Analytics:** `funnel` → Funnel: conversion bowls · `balance` → Balance: A/B beam · `cylinders` → Cylinders: graduated levels
**Landing page:** `bento` → Bento box · `scroll` → Scroll: paper unrolls · `brochure` → Brochure: tri-fold unfolds
**SaaS:** `meter` → Meter: usage billing dials · `plans` → Plans: nested crates for tiers · `seats` → Seats: chairs swivel (seat licensing)
**AI chat:** `bubbles` → Bubbles: chat bubbles · `context` → ContextWindow: frame over a token tape · `hopper` → Hopper: tokens pour down a chute
**F1:** `startlights` → StartLights · `pitstop` → PitStop · `drs` → DRS rear wing
**MotoGP:** `lean` → Lean · `helmet` → Helmet · `paddock` → Paddock
**Cars:** `carlift` → CarLift · `shifter` → Shifter · `convertible` → Convertible
**Beverage (brand demo topics):** `crate`, `fridge`, `crusher`, `vending`, `cantower`, `icebucket`, `sixpack`, `pour`, `pulltab`. These are generic object figures (cans, fridges, vending) usable for food and drink products. Don't use them to imply a real brand.

## Concept → figure shortcuts

| Feature concept | Figure |
|---|---|
| sync, merge, collaboration | `zipper`, `railyard` |
| security, permissions, auth | `vault`, `keyring`, `bollards` |
| scale, load, reliability | `plinko`, `shards`, `serverrack` |
| pipeline, CI/CD, workflow automation | `conveyor`, `locks`, `queue` |
| pricing, billing, usage | `meter`, `plans`, `seats` |
| analytics, experiments, growth | `funnel`, `balance`, `cylinders` |
| AI agents, LLM context, tokens | `robotarm`, `context`, `hopper`, `bubbles` |
| responsive, multi-device | `devices`, `foldable` |
| design systems, theming | `fandeck`, `layers`, `switchboard`, `wireframe` |
| search, discovery, SEO | `loupe`, `podium`, `catalog` |
| testing, quality, precision | `calipers`, `coverage`, `testtubes` |
| storage, records, CRM | `rolodex`, `harddrive`, `jars` |
| media, audio, video | `mixer`, `timeline`, `reels`, `boomarm` |
| onboarding, steps, progress | `elevator`, `tiers`, `scroll` |
| empty or zero states | `sieve`, `trays`, `notfound`, `hangers` |
