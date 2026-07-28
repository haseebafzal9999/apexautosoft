"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, Database, Mail, MessageSquare, Phone, UserPlus } from "lucide-react";
import { clsx } from "clsx";

const STEPS = [
  { id: 1, label: "NEW LEAD", icon: UserPlus, desc: "Captured from web form" },
  { id: 2, label: "AI QUALIFICATION", icon: Bot, desc: "Real-time conversation" },
  { id: 3, label: "CRM UPDATE", icon: Database, desc: "Data synced instantly" },
  { id: 4, label: "TWILIO SMS", icon: MessageSquare, desc: "Personalized text sent" },
  { id: 5, label: "FOLLOW-UP", icon: Phone, desc: "Scheduled voice call" },
  { id: 6, label: "RESULT", icon: Mail, desc: "Deal closed & reported" },
];

export default function AutomationWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="automation" className="py-24 md:py-40 bg-brand-charcoal text-brand-light relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6"
          >
            FROM TRIGGER <br/><span className="text-brand-accent">TO RESULT.</span>
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line Desktop */}
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[2px] bg-brand-muted/20 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-brand-accent shadow-[0_0_15px_rgba(125,168,141,0.5)] origin-top"
              style={{ scaleY: scrollYProgress }}
            />
          </div>
          
          {/* Connecting Line Mobile */}
          <div className="block md:hidden absolute left-8 top-0 bottom-0 w-[2px] bg-brand-muted/20">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-brand-accent shadow-[0_0_15px_rgba(125,168,141,0.5)] origin-top"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-24 relative">
            {STEPS.map((step, i) => {
              // Calculate activation range for each step based on scroll progress
              const start = i / STEPS.length;
              const end = (i + 1) / STEPS.length;
              
              // We can't use hooks conditionally or inside map easily for transforms,
              // but we can pass scrollYProgress to a child component to handle it cleanly.
              return <StepCard key={step.id} step={step} index={i} progress={scrollYProgress} start={start} />;
            })}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
    </section>
  );
}

function StepCard({ step, index, progress, start }: any) {
  const isEven = index % 2 === 0;
  
  // Use transform to create active state threshold
  const opacity = useTransform(progress, [start - 0.1, start + 0.1], [0.3, 1]);
  const scale = useTransform(progress, [start - 0.1, start + 0.1], [0.8, 1]);
  const borderColor = useTransform(
    progress,
    [start - 0.1, start + 0.1],
    ["rgba(105, 114, 105, 0.2)", "rgba(125, 168, 141, 0.8)"] // muted/20 to accent
  );

  return (
    <div className={clsx(
      "flex items-center gap-6 md:gap-12 w-full",
      isEven ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      
      {/* Mobile Icon */}
      <motion.div 
        style={{ opacity, scale, borderColor }}
        className="md:hidden w-16 h-16 shrink-0 rounded-full bg-brand-charcoal border-2 flex items-center justify-center relative z-10"
      >
        <step.icon className="w-6 h-6 text-brand-accent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className={clsx(
          "flex-1 bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-lg",
          isEven ? "md:text-right" : "md:text-left"
        )}
      >
        <div className="text-brand-accent text-sm font-semibold tracking-wider mb-2">
          STEP 0{step.id}
        </div>
        <h3 className="text-xl md:text-2xl font-sans font-bold mb-2 text-brand-light">
          {step.label}
        </h3>
        <p className="text-brand-muted text-sm md:text-base">
          {step.desc}
        </p>
      </motion.div>

      {/* Desktop Icon */}
      <motion.div 
        style={{ opacity, scale, borderColor }}
        className="hidden md:flex w-20 h-20 shrink-0 rounded-full bg-brand-charcoal border-2 items-center justify-center relative z-10"
      >
        <step.icon className="w-8 h-8 text-brand-accent" />
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}
