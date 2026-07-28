"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { Float } from "@react-three/drei";

export default function AutomationCore({ isMobile = false }: { isMobile?: boolean }) {
  const innerRef = useRef<Mesh>(null);
  const outerRef = useRef<Mesh>(null);
  const ringsRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * (isMobile ? 0.1 : 0.2);
      innerRef.current.rotation.y += delta * (isMobile ? 0.15 : 0.3);
    }
    if (outerRef.current) {
      outerRef.current.rotation.x -= delta * (isMobile ? 0.05 : 0.1);
      outerRef.current.rotation.y -= delta * (isMobile ? 0.08 : 0.15);
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.08;
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      ringsRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.25) * 0.15;
    }
  });

  const scale = isMobile ? 1 : 1.5;

  return (
    <Float speed={isMobile ? 1 : 2} rotationIntensity={isMobile ? 0.3 : 0.5} floatIntensity={isMobile ? 0.5 : 1}>
      <group>
        {/* Outer Glass Core */}
        <mesh ref={outerRef} scale={scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.85}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={0.5}
            specularIntensity={1}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Inner Tech Core */}
        <mesh ref={innerRef} scale={scale * 0.6}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#182019" 
            wireframe 
            emissive="#7DA88D"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh scale={scale * 0.3}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color="#7DA88D"
            emissive="#7DA88D"
            emissiveIntensity={0.4}
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Orbital Rings */}
        <group ref={ringsRef}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation-x={Math.PI / 2} rotation-y={(Math.PI / 3) * i} scale={1.5 + i * 0.3}>
              <torusGeometry args={[1.2, 0.008, 16, 80]} />
              <meshStandardMaterial color="#7DA88D" transparent opacity={isMobile ? 0.2 : 0.35} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}
