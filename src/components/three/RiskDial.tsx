"use client";

import { useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { onLightCanvasCreated } from "./canvasClear";
import { motionScale } from "./drive";

function Knob({
  turns,
  hot,
}: {
  turns: number;
  hot: MutableRefObject<boolean>;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const b = motionScale(hot.current);
    ref.current.rotation.y += delta * 0.18 * b;
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      -turns * Math.PI * 1.6,
      Math.min(0.4, 0.08 * b)
    );
  });
  return (
    <group ref={ref} rotation={[0.5, -0.35, 0]}>
      <mesh>
        <cylinderGeometry args={[0.95, 1.05, 0.35, 32]} />
        <meshStandardMaterial color="#4633b9" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.12, 32]} />
        <meshStandardMaterial color="#382796" metalness={0.35} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.3, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.38]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export default function RiskDial({ turns }: { turns: number }) {
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
        dpr={[1, 1.1]}
        camera={{ position: [0, 0.6, 3.4], fov: 40 }}
        gl={{ antialias: false, alpha: false, stencil: false, powerPreference: "high-performance" }}
        style={{ background: "#ffffff" }}
        onCreated={(state) => onLightCanvasCreated(state, "paper")}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 4, 4]} intensity={1.2} />
        <Knob turns={turns} hot={hot} />
      </Canvas>
    </div>
  );
}
