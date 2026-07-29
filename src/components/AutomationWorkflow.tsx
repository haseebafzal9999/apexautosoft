"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  UserPlus,
  Bot,
  Database,
  MessageSquare,
  Repeat,
  TrendingUp,
} from "lucide-react";
import dynamic from "next/dynamic";

const PipelineScene = dynamic(() => import("./3d/PipelineScene"), { ssr: false });

const STEPS = [
  { id: 1, icon: UserPlus, label: "New Lead", sub: "Inbound lead detected & verified", badge: "Trigger" },
  { id: 2, icon: Bot, label: "AI Qualification", sub: "AI-powered needs analysis", badge: "Active" },
  { id: 3, icon: Database, label: "CRM Update", sub: "Customer record created & tagged", badge: "Syncing" },
  { id: 4, icon: MessageSquare, label: "Twilio SMS", sub: "Targeted SMS campaign delivered", badge: "Sent" },
  { id: 5, icon: Repeat, label: "Follow-Up", sub: "Smart follow-up sequence triggered", badge: "Active" },
  { id: 6, icon: TrendingUp, label: "Sales Result", sub: "Revenue captured & analytics updated", badge: "Closed" },
];



function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave, style: { perspective: 1000 } };
}

function PipelineCard({
  step,
  index,
  total,
  isMobile,
}: {
  step: typeof STEPS[0];
  index: number;
  total: number;
  isMobile: boolean;
}) {
  const tilt = useTilt();
  const Icon = step.icon;

  const floatDuration = 3 + (index % 3) * 0.8;
  const floatDelay = index * 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: index * 0.1 }}
      className={`group ${isMobile ? "w-full" : "flex-shrink-0 w-[160px] lg:w-[180px]"}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 lg:p-6 flex flex-col items-center text-center gap-3 cursor-default transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(125,168,141,0.15)]"
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: "preserve-3d",
          ...tilt.style,
        }}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        {/* Glow accent */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-brand-accent/0 via-brand-accent/0 to-brand-accent/0 group-hover:via-brand-accent/[0.03] group-hover:to-brand-accent/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Status badge */}
        <div className="flex items-center gap-1.5 self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-[9px] font-semibold tracking-wider text-brand-accent/80 uppercase">
            {step.badge}
          </span>
        </div>

        {/* Icon */}
        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
          <Icon className="w-5 h-5 lg:w-5.5 lg:h-5.5 text-brand-accent" />
        </div>

        {/* Step number */}
        <span className="text-[10px] font-mono text-white/20 font-medium">
          STEP 0{step.id}
        </span>

        {/* Title */}
        <h3 className="text-sm lg:text-base font-bold text-white leading-tight">
          {step.label}
        </h3>

        {/* Subtitle */}
        <p className="text-[10px] lg:text-[11px] text-white/50 leading-relaxed">
          {step.sub}
        </p>

        {/* Reflection shine */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export default function AutomationWorkflow() {
  const [width, setWidth] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const check = () => setWidth(window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isMobile = width > 0 && width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <section id="automation" className="relative py-24 md:py-32 bg-brand-charcoal overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-brand-accent/[0.03] rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-brand-accent/[0.03] rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Automation Pipeline
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white leading-tight">
            From Trigger{" "}
            <span className="text-brand-accent">To Result.</span>
          </h2>
        </motion.div>

        {/* Pipeline */}
        <div
          className="relative w-full"
          style={{ height: isMobile ? `${Math.max(STEPS.length * 280, 480)}px` : "420px" }}
        >
          {/* Three.js background */}
          {width > 0 && (
            <PipelineScene isMobile={isMobile} reducedMotion={reducedMotion} />
          )}

          {/* Cards */}
          <div
            className={`relative z-10 w-full h-full ${
              isMobile
                ? "flex flex-col items-center gap-6 py-4"
                : "flex items-center justify-center gap-3 lg:gap-5"
            }`}
          >
            {STEPS.map((step, i) => (
              <PipelineCard
                key={step.id}
                step={step}
                index={i}
                total={STEPS.length}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
