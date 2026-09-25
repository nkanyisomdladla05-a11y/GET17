"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { isScrolling, motionScale } from "./drive";
import {
  generateCandles,
  candleLabel,
  displayPrice,
  makeRng,
  tickCandles,
  type Candle,
  type Pair,
} from "./candles";

export type MarketMode = "candles" | "depth";

export interface MarketSceneProps {
  pair: Pair;
  mode: MarketMode;
  light?: boolean;
  still?: boolean;
  /** 0..1 scroll progress written by GSAP ScrollTrigger */
  scrollRef?: MutableRefObject<number>;
}

const VIOLET = new THREE.Color("#4633b9");
const VIOLET_LIGHT = new THREE.Color("#8b7cf6");
const BULL = new THREE.Color("#16a34a");
const BEAR = new THREE.Color("#dc2626");
const INK = new THREE.Color("#111111");

/* ------------------------------------------------------------------ */
/* Candlesticks                                                        */
/* ------------------------------------------------------------------ */

function CandleMesh({
  candle,
  x,
  scale,
  mid,
  hovered,
  onHover,
}: {
  candle: Candle;
  x: number;
  scale: number;
  mid: number;
  hovered: boolean;
  onHover: (c: Candle | null) => void;
}) {
  const bullish = candle.close >= candle.open;
  const top = Math.max(candle.open, candle.close);
  const bottom = Math.min(candle.open, candle.close);
  const bodyH = Math.max(0.06, (top - bottom) * scale);
  const bodyY = ((top + bottom) / 2 - mid) * scale;
  const wickH = Math.max(0.02, (candle.high - candle.low) * scale);
  const wickY = ((candle.high + candle.low) / 2 - mid) * scale;
  const color = hovered ? VIOLET : bullish ? BULL : BEAR;

  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, wickY, 0]}>
        <boxGeometry args={[0.035, wickH, 0.035]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh
        position={[0, bodyY, 0]}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onHover(candle);
        }}
        onPointerOut={() => onHover(null)}
        scale={hovered ? [1.3, 1, 1.3] : [1, 1, 1]}
      >
        <boxGeometry args={[0.2, bodyH, 0.2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.7 : 0.15}
          metalness={0.2}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

type Hud = { price: string; up: boolean; tip: string | null };

function Candlesticks({
  pair,
  light,
  hot,
  onHud,
}: {
  pair: Pair;
  light: boolean;
  hot: MutableRefObject<boolean>;
  onHud: MutableRefObject<(hud: Hud) => void>;
}) {
  const count = light ? 18 : 28;
  const [candles, setCandles] = useState<Candle[]>(() =>
    generateCandles(count, pair.seed, pair.vol)
  );
  const [hovered, setHovered] = useState<Candle | null>(null);
  const rng = useRef(makeRng(pair.seed * 13 + 1));

  useEffect(() => {
    setCandles(generateCandles(count, pair.seed, pair.vol));
    rng.current = makeRng(pair.seed * 13 + 1);
    setHovered(null);
  }, [pair, count]);

  // Live feel: nudge the last candle every 450ms, roll a new one every ~8 ticks
  useEffect(() => {
    let ticks = 0;
    let timer = 0;
    const loop = () => {
      ticks += 1;
      const fast = hot.current || isScrolling();
      setCandles((c) => tickCandles(c, rng.current, pair.vol, ticks % (fast ? 4 : 10) === 0));
      timer = window.setTimeout(loop, fast ? 160 : 1200);
    };
    timer = window.setTimeout(loop, 1200);
    return () => window.clearTimeout(timer);
  }, [pair, hot]);

  const spacing = 0.26;
  const width = count * spacing;
  const scale = 0.11;
  const mid = useMemo(() => {
    const hs = candles.map((c) => c.high);
    const ls = candles.map((c) => c.low);
    return (Math.max(...hs) + Math.min(...ls)) / 2;
  }, [candles]);

  const trendGeom = useMemo(() => {
    const pts = candles.map(
      (c, i) =>
        new THREE.Vector3(
          i * spacing - width / 2 + spacing / 2,
          (c.close - mid) * scale,
          -0.06
        )
    );
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 48, 0.014, 5, false);
  }, [candles, mid, width]);

  const last = candles[candles.length - 1];

  useEffect(() => {
    onHud.current({
      price: displayPrice(last.close, pair),
      up: last.close >= last.open,
      tip: hovered ? candleLabel(hovered, pair) : null,
    });
  }, [last, pair, hovered, onHud]);

  return (
    <group>
      <group position={[-width / 2 + spacing / 2, 0, 0]}>
        {candles.map((c, i) => (
          <CandleMesh
            key={c.index}
            candle={c}
            x={i * spacing}
            scale={scale}
            mid={mid}
            hovered={hovered?.index === c.index}
            onHover={setHovered}
          />
        ))}
      </group>
      <mesh geometry={trendGeom}>
        <meshStandardMaterial
          color={VIOLET}
          emissive={VIOLET}
          emissiveIntensity={0.35}
        />
      </mesh>

    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Depth of market terrain                                             */
/* ------------------------------------------------------------------ */

function DepthTerrain({
  pair,
  light,
  hot,
}: {
  pair: Pair;
  light: boolean;
  hot: MutableRefObject<boolean>;
}) {
  const segX = light ? 28 : 40;
  const segZ = light ? 12 : 16;
  const W = 11;
  const D = 5.5;
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(W, D, segX, segZ);
    g.rotateX(-Math.PI / 2);
    const colors = new Float32Array(g.attributes.position.count * 3);
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [segX, segZ]);

  const spikes = useMemo(() => {
    const rand = makeRng(pair.seed * 7 + 3);
    return Array.from({ length: 7 }, () => ({
      x: (rand() - 0.5) * W * 0.9,
      z: (rand() - 0.5) * D * 0.8,
      amp: 0.5 + rand() * 1.1,
      freq: 0.4 + rand() * 0.9,
      phase: rand() * Math.PI * 2,
    }));
  }, [pair]);

  const tmp = useMemo(() => new THREE.Color(), []);

  const update = (t: number) => {
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const col = geom.attributes.color as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Order book shape: liquidity grows away from mid price (x = 0)
      const side = x < 0 ? -1 : 1; // bids left, asks right
      const dist = Math.abs(x) / (W / 2);
      let h = 0.15 + dist * dist * 1.4 * pair.vol;
      // Waves and volume spikes
      h += Math.sin(x * 1.6 + t * 0.8 + z) * 0.08;
      for (const s of spikes) {
        const dx = x - s.x;
        const dz = z - s.z;
        const d2 = dx * dx + dz * dz;
        const pulse = 0.5 + 0.5 * Math.sin(t * s.freq + s.phase);
        h += Math.exp(-d2 * 1.8) * s.amp * pulse;
      }
      pos.setY(i, h);
      const base = side < 0 ? BULL : BEAR;
      const k = Math.min(1, h / 2.2);
      tmp.copy(INK).lerp(base, 0.35 + k * 0.65);
      col.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
  };

  useEffect(() => {
    update(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geom, spikes]);

  const frame = useRef(0);
  useFrame((state) => {
    frame.current += 1;
    const b = motionScale(hot.current);
    if (b < 2.2 && frame.current % 2 === 1) return;
    update(state.clock.elapsedTime * (0.45 + Math.min(b, 6) * 0.22));
    if (frame.current % 4 === 0) geom.computeVertexNormals();
  });

  return (
    <group position={[0, -1.4, 0]}>
      <mesh ref={mesh} geometry={geom}>
        <meshStandardMaterial
          vertexColors
          flatShading
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      <mesh geometry={geom} position={[0, 0.005, 0]}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      {/* Mid-price divider */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.02, 2.4, D + 0.4]} />
        <meshStandardMaterial
          color={VIOLET_LIGHT}
          emissive={VIOLET_LIGHT}
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Rig: scroll-linked rotation + orbit controls                        */
/* ------------------------------------------------------------------ */

function ScrollRig({
  scrollRef,
  hot,
  children,
}: {
  scrollRef?: MutableRefObject<number>;
  hot: MutableRefObject<boolean>;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const p = scrollRef?.current ?? 0;
    const b = motionScale(hot.current);
    const t = state.clock.elapsedTime;
    const follow = Math.min(0.28, 0.045 * b);
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t * 0.22 * Math.min(b, 3)) * 0.14 + p * 1.05 + state.pointer.x * 0.35,
      follow
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      0.12 + p * 0.4 - state.pointer.y * 0.2,
      follow
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      -p * 1.2,
      0.05
    );
    const s = 1 - p * 0.15;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.05));
  });
  return <group ref={group}>{children}</group>;
}

/* ------------------------------------------------------------------ */

function MarketOrbit({ hot }: { hot: MutableRefObject<boolean> }) {
  const controls = useRef<OrbitControlsImpl>(null);
  useFrame(() => {
    if (!controls.current) return;
    controls.current.autoRotate = true;
    controls.current.autoRotateSpeed = 0.28 * motionScale(hot.current);
  });
  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableZoom
      enableDamping
      dampingFactor={0.08}
      minDistance={4.5}
      maxDistance={14}
      minPolarAngle={0.35}
      maxPolarAngle={Math.PI / 2.05}
      autoRotate
      makeDefault
    />
  );
}

export default function MarketScene({
  pair,
  mode,
  light = false,
  scrollRef,
}: MarketSceneProps) {
  const hot = useRef(false);
  const [hud, setHud] = useState<Hud>({ price: "—", up: true, tip: null });
  const onHud = useRef<(next: Hud) => void>(() => {});
  onHud.current = setHud;
  return (
    <div
      className="relative h-full w-full"
      onPointerEnter={() => {
        hot.current = true;
      }}
      onPointerLeave={() => {
        hot.current = false;
      }}
    >
      <Canvas
        dpr={[1, light ? 1 : 1.15]}
        camera={{ position: [0, 2.2, 8.4], fov: 40 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        style={{ background: "transparent", touchAction: "none" }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[6, 9, 6]} intensity={1.2} />
        <hemisphereLight args={["#ffffff", "#e2e8f0", 0.45]} />

        <ScrollRig scrollRef={scrollRef} hot={hot}>
          {mode === "candles" ? (
            <Candlesticks pair={pair} light={light} hot={hot} onHud={onHud} />
          ) : (
            <DepthTerrain pair={pair} light={light} hot={hot} />
          )}
          <gridHelper
            args={[14, 14, "#c9cfe4", "#e2e8f0"]}
            position={[0, mode === "candles" ? -2.4 : -1.42, 0]}
          />
        </ScrollRig>

        <MarketOrbit hot={hot} />
      </Canvas>
      <div className="pointer-events-none absolute right-4 top-4 z-10 flex max-w-[70%] flex-col items-end gap-2">
        {mode === "candles" ? (
          <>
            <div
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold text-white shadow ${
                hud.up ? "bg-[#16a34a]" : "bg-[#dc2626]"
              }`}
            >
              {hud.price}
            </div>
            {hud.tip && (
              <div className="rounded-xl border border-line bg-white px-3 py-1.5 font-mono text-[11px] text-ink shadow">
                {hud.tip}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-wrap justify-end gap-2">
            <span className="rounded-md bg-white/90 px-2 py-1 font-mono text-[11px] font-semibold text-[#16a34a] shadow">
              BIDS · buy liquidity
            </span>
            <span className="rounded-md bg-white/90 px-2 py-1 font-mono text-[11px] font-semibold text-[#dc2626] shadow">
              ASKS · sell liquidity
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
