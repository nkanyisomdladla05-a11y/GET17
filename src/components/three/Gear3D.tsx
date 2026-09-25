"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { onLightCanvasCreated } from "./canvasClear";
import { motionScale } from "./drive";

/** Build the logo's gear outline as an extruded shape */
function gearShape(teeth = 8, outer = 1, inner = 0.82, hole = 0.5) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.32;
    const a2 = a0 + step * 0.5;
    const a3 = a0 + step * 0.82;
    const pts: [number, number][] = [
      [Math.cos(a0) * inner, Math.sin(a0) * inner],
      [Math.cos(a0 + step * 0.08) * outer, Math.sin(a0 + step * 0.08) * outer],
      [Math.cos(a1) * outer, Math.sin(a1) * outer],
      [Math.cos(a2) * inner, Math.sin(a2) * inner],
      [Math.cos(a3) * inner, Math.sin(a3) * inner],
    ];
    pts.forEach(([x, y], j) => {
      if (i === 0 && j === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, hole, 0, Math.PI * 2, true);
  shape.holes.push(holePath);
  return shape;
}

function Gear({
  color,
  hot,
}: {
  color: string;
  hot: MutableRefObject<boolean>;
}) {
  const gear = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(gearShape(), {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 3,
    });
    g.center();
    return g;
  }, []);

  useFrame((_, delta) => {
    const b = motionScale(hot.current);
    if (gear.current) gear.current.rotation.z += delta * 0.16 * b;
    if (ring.current) ring.current.rotation.z -= delta * 0.28 * b;
  });

  return (
    <group rotation={[0.35, -0.4, 0]}>
      <group ref={gear}>
        <mesh geometry={geom}>
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.35} />
        </mesh>
      </group>
      {/* Inner rings echoing the logo's coin */}
      <mesh ref={ring} position={[0, 0, 0.05]}>
        <torusGeometry args={[0.36, 0.035, 10, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <torusGeometry args={[0.26, 0.02, 8, 28]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Dollar bar */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.045, 0.34, 0.06]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.07, 0.08]} rotation={[0, 0, 0.5]}>
        <torusGeometry args={[0.08, 0.02, 12, 32, Math.PI * 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -0.07, 0.08]} rotation={[0, 0, Math.PI + 0.5]}>
        <torusGeometry args={[0.08, 0.02, 12, 32, Math.PI * 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function OrbitDrive({ hot }: { hot: MutableRefObject<boolean> }) {
  const controls = useRef<OrbitControlsImpl>(null);
  useFrame(() => {
    if (controls.current) {
      controls.current.autoRotateSpeed = 0.35 * motionScale(hot.current);
    }
  });
  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableZoom={false}
      enableDamping
      autoRotate
    />
  );
}

export default function Gear3D({
  color = "#4633b9",
  interactive = true,
}: {
  color?: string;
  still?: boolean;
  interactive?: boolean;
}) {
  const hot = useRef(false);
  return (
    <div
      className="h-full w-full"
      onPointerEnter={() => {
        hot.current = true;
      }}
      onPointerLeave={() => {
        hot.current = false;
      }}
    >
      <Canvas
        dpr={[1, 1.15]}
        camera={{ position: [0, 0, 4], fov: 38 }}
        gl={{ antialias: false, alpha: false, stencil: false, powerPreference: "high-performance" }}
        style={{ background: "#ffffff", touchAction: interactive ? "none" : "auto" }}
        onCreated={(state) => onLightCanvasCreated(state, "paper")}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.25}>
          <Gear color={color} hot={hot} />
        </Float>
        {interactive && <OrbitDrive hot={hot} />}
      </Canvas>
    </div>
  );
}
