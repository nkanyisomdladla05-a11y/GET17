"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motionScale } from "./drive";

function gearShape(teeth = 10, outer = 1.15, inner = 0.88, hole = 0.48) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const pts: [number, number][] = [
      [Math.cos(a0) * inner, Math.sin(a0) * inner],
      [Math.cos(a0 + step * 0.08) * outer, Math.sin(a0 + step * 0.08) * outer],
      [Math.cos(a0 + step * 0.3) * outer, Math.sin(a0 + step * 0.3) * outer],
      [Math.cos(a0 + step * 0.48) * inner, Math.sin(a0 + step * 0.48) * inner],
      [Math.cos(a0 + step * 0.82) * inner, Math.sin(a0 + step * 0.82) * inner],
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

function Emblem({
  hot,
  scrollRef,
}: {
  hot: MutableRefObject<boolean>;
  scrollRef?: MutableRefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const gear = useRef<THREE.Group>(null);
  const coin = useRef<THREE.Group>(null);
  const geom = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(gearShape(), {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 4,
    });
    g.center();
    return g;
  }, []);

  useFrame((state, delta) => {
    if (!root.current || !gear.current || !coin.current) return;
    const p = scrollRef?.current ?? 0;
    const b = motionScale(hot.current);
    const follow = Math.min(0.42, 0.05 * b);

    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      state.pointer.x * 0.7,
      follow
    );
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      -state.pointer.y * 0.42 + 0.22,
      follow
    );

    gear.current.rotation.z += delta * 0.14 * b + p * 0.01;
    coin.current.position.z = THREE.MathUtils.lerp(
      coin.current.position.z,
      0.12 + p * 0.7 + (hot.current ? 0.35 : 0),
      Math.min(0.35, 0.06 * b)
    );
    coin.current.rotation.z -= delta * 0.18 * b;
  });

  return (
    <group ref={root}>
      <group ref={gear}>
        <mesh geometry={geom} castShadow>
          <meshStandardMaterial
            color="#4633b9"
            metalness={0.45}
            roughness={0.28}
            emissive="#2a1d7a"
            emissiveIntensity={0.18}
          />
        </mesh>
      </group>

      <group ref={coin}>
        <mesh>
          <cylinderGeometry args={[0.42, 0.42, 0.1, 48]} />
          <meshStandardMaterial
            color="#6b5ce7"
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <torusGeometry args={[0.3, 0.028, 16, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <torusGeometry args={[0.2, 0.018, 12, 48]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.28]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.07, 0.08]} rotation={[Math.PI / 2, 0, 0.45]}>
          <torusGeometry args={[0.07, 0.018, 10, 24, Math.PI * 1.4]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.07, -0.08]} rotation={[Math.PI / 2, 0, Math.PI + 0.45]}>
          <torusGeometry args={[0.07, 0.018, 10, 24, Math.PI * 1.4]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroEmblem({
  scrollRef,
}: {
  still?: boolean;
  scrollRef?: MutableRefObject<number>;
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
        dpr={[1, 1.25]}
        camera={{ position: [0, 0.2, 5.2], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        style={{ background: "transparent" }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 5]} intensity={1.5} />
        <pointLight position={[-3, -1, 3]} intensity={1.1} color="#8b7cf6" />
        <hemisphereLight args={["#ffffff", "#d4d0f0", 0.5]} />

        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.28}>
          <Emblem hot={hot} scrollRef={scrollRef} />
        </Float>
      </Canvas>
    </div>
  );
}
