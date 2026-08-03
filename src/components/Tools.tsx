"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TOOLS, type Tool } from "@/lib/constants";

function ToolLogo({ tool }: { tool: Tool }) {
  return (
    <Image
      src={tool.logo}
      alt={`${tool.name} logo`}
      width={32}
      height={32}
      loading="lazy"
      className={`w-7 h-7 lg:w-8 lg:h-8 shrink-0 object-contain ${tool.invert ? "[filter:brightness(0)_invert(1)] opacity-90" : ""}`}
    />
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="flex-shrink-0 w-[160px] lg:w-[180px] mx-1.5 md:mx-3">
      <div className="group relative h-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 lg:p-6 flex flex-col items-center text-center gap-3 cursor-default transition-all duration-300 hover:border-brand-accent/40 hover:bg-white/[0.07] hover:shadow-[0_0_40px_rgba(125,168,141,0.15)]">
        <div className="flex items-center gap-1.5 self-start min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse shrink-0" />
          <span className="text-[9px] font-semibold tracking-wider text-brand-accent/80 uppercase truncate">{tool.tag}</span>
        </div>

        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
          <ToolLogo tool={tool} />
        </div>

        <h3 className="text-sm lg:text-base font-bold text-white leading-tight">{tool.name}</h3>

        <p className="text-[10px] lg:text-[11px] text-white/50 leading-relaxed">{tool.desc}</p>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function MarqueeRow({ tools, speed }: { tools: Tool[]; speed: number }) {
  return (
    <div className="marquee-row relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className="marquee-track-left flex w-max shrink-0"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {tools.map((tool) => (
            <ToolCard key={`${tool.name}-dup`} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-wrap justify-center"
    >
      {TOOLS.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </motion.div>
  );
}

export default function Tools() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="tools"
      className="relative py-24 md:py-32 bg-brand-charcoal text-brand-light overflow-hidden max-md:scroll-mt-24 border-b border-white/[0.06]"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Tools &amp; Technologies We Use
          </h2>
          <p className="text-brand-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Powered by the tools behind modern automation — from communication APIs and AI
            models to workflow automation platforms, we use the right technology for every
            business problem.
          </p>
        </motion.div>

        {reducedMotion ? (
          <StaticGrid />
        ) : (
          <MarqueeRow tools={TOOLS} speed={48} />
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-xs text-white/30 mt-10 md:mt-14"
        >
          Tools and platforms we work with daily — not an official partnership list.
        </motion.p>
      </div>
    </section>
  );
}
