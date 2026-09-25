"use client";

import { useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { onLightCanvasCreated } from "./canvasClear";
import { motionScale } from "./drive";

interface RobotCoreProps {
  color: string;
  /** "card" is small and non-interactive, "hero" has orbit controls */
  variant?: "card" | "hero";
  aggressive?: boolean;
  /** Render a single static frame (reduced motion) */
  still?: boolean;
}

function Core({
  color,
  aggressive,
  hot,
}: {
  color: string;
  aggressive: boolean;
  hot: MutableRefObject<boolean>;
}) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const b = motionScale(hot.current);
    const speed = (aggressive ? 1.15 : 0.7) * b;
    if (outer.current) {
      outer.current.rotation.y += delta * 0.12 * speed;
      outer.current.rotation.x += delta * 0.04 * speed;
    }
    if (inner.current) inner.current.rotation.y -= delta * 0.22 * speed;
    if (ring.current) {
      ring.current.rotation.z += delta * 0.16 * speed;
      ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25 * Math.min(b, 4)) * 0.45;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.12 * speed;
      ring2.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2 * Math.min(b, 4)) * 0.55;
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.55}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh ref={inner}>
        {aggressive ? (
          <torusKnotGeometry args={[0.42, 0.14, 64, 10, 2, 3]} />
        ) : (
          <icosahedronGeometry args={[0.62, 1]} />
        )}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.55}
          roughness={0.25}
          distort={aggressive ? 0.28 : 0.16}
          speed={aggressive ? 1.2 : 0.7}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.45, 0.02, 8, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={1.4}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.6, 0.5, 0]}>
        <torusGeometry args={[1.7, 0.012, 8, 40]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

export default function RobotCore({
  color,
  variant = "card",
  aggressive = false,
}: RobotCoreProps) {
  const isHero = variant === "hero";
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
        dpr={[1, isHero ? 1.2 : 1]}
        camera={{ position: [0, 0, isHero ? 4.6 : 4.2], fov: 40 }}
        gl={{ antialias: false, alpha: false, stencil: false, powerPreference: "high-performance" }}
        style={{ background: "#ffffff", touchAction: isHero ? "none" : "auto" }}
        onCreated={(state) => onLightCanvasCreated(state, "paper")}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <pointLight position={[-4, -2, 2]} intensity={0.8} color={color} />
        <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.22}>
          <Core color={color} aggressive={aggressive} hot={hot} />
        </Float>
        {isHero && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.45}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={(2 * Math.PI) / 3}
          />
        )}
        <hemisphereLight args={["#ffffff", "#34495e", 0.55]} />
      </Canvas>
    </div>
  );
}
