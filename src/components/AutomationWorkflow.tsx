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

function DesktopCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
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
      className="group flex-shrink-0 w-[160px] lg:w-[180px]"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
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
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-brand-accent/0 via-brand-accent/0 to-brand-accent/0 group-hover:via-brand-accent/[0.03] group-hover:to-brand-accent/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-center gap-1.5 self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-[9px] font-semibold tracking-wider text-brand-accent/80 uppercase">{step.badge}</span>
        </div>

        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
          <Icon className="w-5 h-5 lg:w-5.5 lg:h-5.5 text-brand-accent" />
        </div>

        <span className="text-[10px] font-mono text-white/20 font-medium">STEP 0{step.id}</span>

        <h3 className="text-sm lg:text-base font-bold text-white leading-tight">{step.label}</h3>

        <p className="text-[10px] lg:text-[11px] text-white/50 leading-relaxed">{step.sub}</p>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

function MobileTimeline({ steps }: { steps: typeof STEPS }) {
  return (
    <div className="mx-auto w-full max-w-[400px]">
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const isFirst = i === 0;
          const isLast = i === steps.length - 1;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: i * 0.08 }}
              className="flex gap-3 items-stretch"
            >
              {/* Dot column */}
              <div className="flex flex-col items-center w-8 shrink-0">
                <div className={`w-0.5 ${isFirst ? 'bg-transparent' : 'bg-brand-accent/20'} flex-1 min-h-[16px]`} />
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 border-2 border-brand-accent flex items-center justify-center z-10 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
                </div>
                <div className={`w-0.5 ${isLast ? 'bg-transparent' : 'bg-brand-accent/20'} flex-1 min-h-[16px]`} />
              </div>

              {/* Card with padding-bottom creating the inter-card gap */}
              <div className={`flex-1 min-w-0 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl transition-shadow duration-300 ${isLast ? 'p-4' : 'p-4 pb-10'}`}>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <span className="text-[9px] font-semibold tracking-wider text-brand-accent/80 uppercase">{step.badge}</span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-white/20 font-medium">STEP 0{step.id}</span>
                    <h3 className="text-sm font-bold text-white leading-tight">{step.label}</h3>
                  </div>
                </div>

                <p className="text-[11px] text-white/50 leading-relaxed">{step.sub}</p>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="h-14" />
    </div>
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

  return (
    <section id="automation" className="relative py-24 md:py-32 bg-brand-charcoal overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-brand-accent/[0.03] rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-brand-accent/[0.03] rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
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

        {isMobile ? (
          <MobileTimeline steps={STEPS} />
        ) : (
          <div className="relative w-full h-[420px]">
            {width > 0 && (
              <PipelineScene isMobile={false} reducedMotion={reducedMotion} />
            )}
            <div className="relative z-10 w-full h-full flex items-center justify-center gap-3 lg:gap-5">
              {STEPS.map((step, i) => (
                <DesktopCard key={step.id} step={step} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
