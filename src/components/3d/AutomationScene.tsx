"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useState, useMemo } from "react";
import AutomationCore from "./AutomationCore";
import AutomationNodes from "./AutomationNodes";
import ConnectionLines from "./ConnectionLines";
import DataParticles from "./DataParticles";
import { getResponsiveLayout } from "./config";

export default function AutomationScene() {
  const [viewportW, setViewportW] = useState(0);
  const [canvasH, setCanvasH] = useState(400);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const sync = () => {
      setViewportW((prev) => {
        const v = window.innerWidth;
        return Math.abs(v - prev) > 1 ? v : prev;
      });
      const el = document.getElementById("hero-3d-container");
      if (el) {
        setCanvasH((prev) => {
          const h = el.clientHeight;
          return Math.abs(h - prev) > 1 ? h : prev;
        });
      }
    };
    sync();
    setReady(true);
    const ro = new ResizeObserver(sync);
    const el = document.getElementById("hero-3d-container");
    if (el) ro.observe(el);
    window.addEventListener("resize", sync);
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    if (el) io.observe(el);
    return () => {
      window.removeEventListener("resize", sync);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const layout = useMemo(
    () => getResponsiveLayout(viewportW || 1200, canvasH),
    [viewportW, canvasH]
  );

  if (!ready) return null;

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={layout.dpr}
        gl={{
          antialias: !layout.isMobile,
          powerPreference: layout.isMobile ? "low-power" : "high-performance",
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, layout.cameraZ]}
          fov={layout.fov}
        />

        <ambientLight intensity={layout.isMobile ? 0.8 : 0.6} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          color="#F5F4EF"
        />
        <directionalLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#7DA88D"
        />

        <Suspense fallback={null}>
          <group>
            <AutomationCore isMobile={layout.isMobile} />
            <AutomationNodes
              isMobile={layout.isMobile}
              positions={layout.positions}
            />
            <ConnectionLines positions={layout.positions} />
            <DataParticles
              key={`particles-${layout.particleCount}`}
              count={layout.particleCount}
              positions={layout.positions}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
