"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import { Group } from "three";
import { NODE_DATA, MOBILE_NODE_IDS } from "./config";

export default function AutomationNodes({ isMobile = false }: { isMobile?: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * (isMobile ? 0.3 : 0.5)) * 0.08;
    }
  });

  const visibleNodes = isMobile
    ? NODE_DATA.filter(n => MOBILE_NODE_IDS.includes(n.id))
    : NODE_DATA;

  return (
    <group ref={groupRef}>
      {visibleNodes.map((node) => {
        const pos = isMobile 
          ? [node.pos[0] * 0.6, node.pos[1] * 0.6, node.pos[2] * 0.6] as [number, number, number]
          : node.pos as [number, number, number];
        
        return (
          <Float key={node.id} speed={isMobile ? 1 : 2} rotationIntensity={0.1} floatIntensity={isMobile ? 0.3 : 0.5} position={pos}>
            {/* Node Sphere */}
            <mesh>
              <sphereGeometry args={[isMobile ? 0.1 : 0.15, 24, 24]} />
              <meshStandardMaterial 
                color={node.type === 'processor' ? '#7DA88D' : '#182019'} 
                emissive={node.type === 'processor' ? '#7DA88D' : '#ffffff'}
                emissiveIntensity={0.2}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* HTML UI Card */}
            <Html 
              distanceFactor={isMobile ? 14 : 10} 
              position={[0, 0.35, 0]} 
              center 
              zIndexRange={[100, 0]}
            >
              <div className="bg-white/90 backdrop-blur-sm border border-brand-muted/20 px-2.5 py-1.5 rounded shadow-md flex flex-col gap-0.5 min-w-[90px] pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${node.type === 'processor' ? 'bg-brand-accent animate-pulse' : 'bg-brand-dark'}`} />
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
