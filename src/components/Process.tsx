"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { PROCESS } from "@/lib/constants";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="process" className="py-24 md:py-32 bg-brand-light relative z-10 w-full max-w-full overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-brand-dark"
          >
            FROM IDEA <br/>
            <span className="text-brand-accent">TO AUTOMATION.</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Base Line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-0 md:bottom-auto md:top-[44px] md:right-0 w-[2px] md:w-full md:h-[2px] bg-brand-muted/20 z-0" />
          
          {/* Animated Line - separate mobile and desktop to avoid flash */}
          <motion.div 
            className="absolute top-0 bottom-0 left-6 md:hidden w-[2px] bg-brand-accent origin-top z-0"
            style={{ scaleY: scrollYProgress }}
          />
          <motion.div 
            className="absolute hidden md:block top-[44px] left-0 right-0 h-[2px] bg-brand-accent origin-left z-0"
            style={{ scaleX: scrollYProgress }}
          />

          <div className="flex flex-col md:flex-row gap-12 md:gap-4 justify-between relative z-10">
            {PROCESS.map((step, index) => (
              <ProcessStep key={step.num} step={step} index={index} total={PROCESS.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index, total, scrollYProgress }: { step: any; index: number; total: number; scrollYProgress: MotionValue<number> }) {
  const start = index / total;
  const isActive = useTransform(scrollYProgress, (p) => p >= start - 0.1);
  const borderColor = useTransform(isActive, (active) => active ? "#7DA88D" : "rgba(105, 114, 105, 0.4)");
  const backgroundColor = useTransform(isActive, (active) => active ? "#182019" : "#F5F4EF");

  return (
    <div className="flex md:flex-col gap-6 md:gap-8 items-start md:items-center relative pl-16 md:pl-0 md:flex-1 md:text-center group">
      {/* Node */}
      <motion.div 
        className="absolute left-4 md:left-1/2 top-0 md:top-12 w-4 h-4 rounded-full border-[3px] -translate-x-1/2 md:-translate-y-1/2 transition-colors duration-300"
        style={{
          borderColor,
          backgroundColor
        }}
      />
      
      {/* Desktop Num Spacer */}
      <div className="hidden md:block h-6" />

      {/* Content */}
      <div className="md:mt-6">
        <span className="text-brand-accent font-sans font-bold text-2xl md:text-3xl block mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
          {step.num}
        </span>
        <h3 className="font-sans font-bold text-xl text-brand-dark mb-2 tracking-wide">
          {step.title}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed max-w-[200px] md:mx-auto">
          {step.desc}
        </p>
      </div>
    </div>
  );
}
