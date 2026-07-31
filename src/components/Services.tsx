"use client";

import { useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS, type Solution, type SolutionLabel } from "@/lib/constants";

const LABEL_STYLES: Record<SolutionLabel, string> = {
  AI: "text-brand-accent border-brand-accent/30 bg-brand-accent/10",
  Automation: "text-brand-dark/70 border-brand-dark/20 bg-brand-dark/5",
  Integration: "text-brand-muted border-brand-muted/30 bg-brand-muted/10",
};

function useTilt(max = 5) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-max, max]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave, style: { perspective: 900 } };
}

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  const tilt = useTilt(5);
  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <motion.div
        className="group relative h-full bg-white border border-brand-muted/20 rounded-2xl p-6 md:p-8 overflow-hidden cursor-default transition-all duration-500 hover:border-brand-accent/60 hover:shadow-[0_24px_60px_rgba(24,32,25,0.1)] hover:-translate-y-1"
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: "preserve-3d",
          ...tilt.style,
        }}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        {/* Animated top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-accent/0 via-brand-accent to-brand-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

        {/* Soft corner glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-accent/[0.07] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors duration-300">
              <Icon className="w-6 h-6 text-brand-accent group-hover:text-white transition-colors duration-300" />
            </div>
            <span className={`inline-block text-[9px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border ${LABEL_STYLES[solution.label]}`}>
              {solution.label}
            </span>
          </div>

          <h3 className="text-lg font-bold text-brand-dark mb-2 leading-tight">
            {solution.title}
          </h3>
          <p className="text-sm text-brand-muted leading-relaxed">
            {solution.desc}
          </p>

          <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-brand-muted/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-brand-accent group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div id="solutions">
      <section
        id="services"
        className="relative py-24 md:py-32 bg-brand-light z-10 border-b border-brand-muted/10 overflow-hidden"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-brand-dark mb-6">
              SOLUTIONS WE BUILD
            </h2>
            <div className="w-24 h-1 bg-brand-accent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SOLUTIONS.map((solution, index) => (
              <SolutionCard key={solution.id} solution={solution} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
