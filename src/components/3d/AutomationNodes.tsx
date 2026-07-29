"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import { Group } from "three";
import { NODE_CONFIGS, NodePositions } from "./config";

export default function AutomationNodes({
  isMobile = false,
  positions,
}: {
  isMobile?: boolean;
  positions: NodePositions;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * (isMobile ? 0.3 : 0.5)) * 0.08;
    }
  });

  const sorted = useMemo(
    () => [...NODE_CONFIGS].sort((a, b) => {
      const pa = positions[a.id] || [0, 0, 0];
      const pb = positions[b.id] || [0, 0, 0];
      return pa[2] - pb[2];
    }),
    [positions]
  );

  const sphereSize = isMobile ? 0.12 : 0.15;
  const labelY = isMobile ? 0.28 : 0.35;
  const distFactor = isMobile ? 12 : 10;

  return (
    <group ref={groupRef}>
      {sorted.map((node) => {
        const pos = positions[node.id] || [0, 0, 0];

        return (
          <Float
            key={node.id}
            speed={isMobile ? 1 : 2}
            rotationIntensity={0.1}
            floatIntensity={isMobile ? 0.3 : 0.5}
            position={pos as [number, number, number]}
          >
            <mesh>
              <sphereGeometry args={[sphereSize, 20, 20]} />
              <meshStandardMaterial
                color={node.type === "processor" ? "#7DA88D" : "#182019"}
                emissive={node.type === "processor" ? "#7DA88D" : "#ffffff"}
                emissiveIntensity={0.2}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            <Html
              distanceFactor={distFactor}
              position={[0, labelY, 0]}
              center
              zIndexRange={[100, 0]}
            >
              <div className="bg-white/90 backdrop-blur-sm border border-brand-muted/20 px-2.5 py-1.5 rounded shadow-md flex flex-col gap-0.5 pointer-events-none whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${node.type === "processor" ? "bg-brand-accent animate-pulse" : "bg-brand-dark"}`}
                  />
                  <span className="text-[9px] font-bold tracking-wider text-brand-dark uppercase font-sans">
                    {node.label}
                  </span>
                </div>
                <span className="text-[8px] text-brand-muted pl-3 font-medium">
                  {node.status}
                </span>
              </div>
            </Html>
          </Float>
        );
      })}
    </group>
  );
}
