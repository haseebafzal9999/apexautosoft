"use client";

import { memo, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const NeonTube = memo(function NeonTube({ points }: { points: THREE.Vector3[] }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points),
    [points]
  );

  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 64, 0.035, 8, false),
    [curve]
  );
  const glowGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 48, 0.12, 8, false),
    [curve]
  );

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color="#7DA88D" transparent opacity={0.85} />
      </mesh>
      <mesh geometry={glowGeo}>
        <meshBasicMaterial color="#7DA88D" transparent opacity={0.12} />
      </mesh>
    </group>
  );
});

const NodeGlow = memo(function NodeGlow({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.15);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial color="#7DA88D" />
    </mesh>
  );
});

const Particles = memo(function Particles({
  curve,
  count,
}: {
  curve: THREE.CatmullRomCurve3;
  count: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const progress = useRef<number[]>([]);
  const speeds = useRef<number[]>([]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const sizes = useMemo(() => new Float32Array(count), [count]);

  useEffect(() => {
    progress.current = Array.from({ length: count }, () => Math.random());
    speeds.current = Array.from({ length: count }, () => 0.08 + Math.random() * 0.12);
  }, [count]);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      sizes[i] = 2 + Math.random() * 4;
    }
  }, [count, sizes]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      progress.current[i] += delta * speeds.current[i];
      if (progress.current[i] > 1) progress.current[i] = 0;

      const pt = curve.getPointAt(progress.current[i]);
      arr[i * 3] = pt.x;
      arr[i * 3 + 1] = pt.y;
      arr[i * 3 + 2] = pt.z;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#7DA88D"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
});

const Scene = memo(function Scene({
  isMobile,
  reducedMotion,
}: {
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const pts = useMemo(() => {
    if (isMobile) {
      return [
        new THREE.Vector3(0, 6, 0),
        new THREE.Vector3(0.4, 4.5, 0.3),
        new THREE.Vector3(-0.3, 3, -0.2),
        new THREE.Vector3(0.2, 1.5, 0.1),
        new THREE.Vector3(-0.2, 0, -0.1),
        new THREE.Vector3(0.3, -1.5, 0.2),
        new THREE.Vector3(-0.4, -3, -0.3),
        new THREE.Vector3(0, -4.5, 0),
        new THREE.Vector3(0, -6, 0),
      ];
    }
    return [
      new THREE.Vector3(-7.5, 0.6, 0),
      new THREE.Vector3(-5.5, -0.3, 0.3),
      new THREE.Vector3(-3.5, 0.5, -0.2),
      new THREE.Vector3(-1.5, -0.2, 0.2),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(1.5, -0.3, -0.2),
      new THREE.Vector3(3.5, 0.5, 0.2),
      new THREE.Vector3(5.5, -0.4, -0.3),
      new THREE.Vector3(7.5, 0.3, 0),
    ];
  }, [isMobile]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(pts), [pts]);

  const particleCount = reducedMotion ? 0 : isMobile ? 10 : 20;

  return (
    <>
      {!reducedMotion && (
        <>
          <NeonTube points={pts} />
          <Particles curve={curve} count={particleCount} />
        </>
      )}
      {pts.map((p, i) => (
        <NodeGlow key={i} position={p} />
      ))}
    </>
  );
});

export default function PipelineScene({
  isMobile,
  reducedMotion,
  active,
}: {
  isMobile: boolean;
  reducedMotion: boolean;
  active: boolean;
}) {
  const camZ = isMobile ? 14 : 12;
  const fov = isMobile ? 55 : 45;

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={reducedMotion ? 0.5 : isMobile ? 0.8 : 1.5}
      gl={{
        antialias: true,
        alpha: true,
        stencil: false,
        powerPreference: isMobile ? "low-power" : "high-performance",
      }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, camZ]} fov={fov} />
      <Scene isMobile={isMobile} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
