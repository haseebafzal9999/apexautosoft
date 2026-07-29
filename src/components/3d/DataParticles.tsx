"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FLOW_PATHS, getNodePos, NodePositions } from "./config";

export default function DataParticles({
  count = 15,
  positions,
}: {
  count?: number;
  positions?: NodePositions;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const curves = useMemo(() => {
    return FLOW_PATHS.map((path) => {
      const from = new THREE.Vector3(...getNodePos(path.from, positions));
      const to = new THREE.Vector3(...getNodePos(path.to, positions));
      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
      const distance = from.distanceTo(to);
      const control = mid
        .clone()
        .add(new THREE.Vector3(0, distance * 0.2, distance * 0.1));
      return new THREE.QuadraticBezierCurve3(from, control, to);
    });
  }, [positions]);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      pathIndex: Math.floor(Math.random() * curves.length),
      progress: Math.random(),
      speed: 0.2 + Math.random() * 0.3,
    }));
  }, [count, curves.length]);

  const positionsArray = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const arr =
      pointsRef.current.geometry.attributes.position.array as Float32Array;

    particles.forEach((particle, i) => {
      particle.progress += delta * particle.speed;

      if (particle.progress >= 1) {
        particle.progress = 0;
        particle.pathIndex = Math.floor(Math.random() * curves.length);
      }

      const curve = curves[particle.pathIndex];
      const point = curve.getPointAt(particle.progress);

      arr[i * 3] = point.x;
      arr[i * 3 + 1] = point.y;
      arr[i * 3 + 2] = point.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positionsArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#7DA88D"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
