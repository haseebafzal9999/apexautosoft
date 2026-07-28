"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import AutomationCore from "./AutomationCore";
import AutomationNodes from "./AutomationNodes";
import ConnectionLines from "./ConnectionLines";
import DataParticles from "./DataParticles";

export default function AutomationScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const checkDevice = () => {
      const w = window.innerWidth;
      const mobile = w < 768;
      const tablet = w >= 768 && w < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);
      if (mobile) {
        setDpr(Math.min(window.devicePixelRatio, 1.2));
      } else if (tablet) {
        setDpr(Math.min(window.devicePixelRatio, 1.5));
      } else {
        setDpr(Math.min(window.devicePixelRatio, 2));
      }
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const particleCount = isMobile ? 12 : isTablet ? 25 : 45;

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas dpr={dpr} gl={{ antialias: !isMobile, powerPreference: isMobile ? "low-power" : "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 14 : isTablet ? 12 : 10]} fov={isMobile ? 70 : isTablet ? 60 : 50} />
        
        <ambientLight intensity={isMobile ? 0.8 : 0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#F5F4EF" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#7DA88D" />

        <Suspense fallback={null}>
          <group>
            <AutomationCore isMobile={isMobile} />
            <AutomationNodes isMobile={isMobile} />
            <ConnectionLines />
            <DataParticles key={`particles-${particleCount}`} count={particleCount} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
