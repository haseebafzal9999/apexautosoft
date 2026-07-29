"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { useState, useEffect } from "react";

// Dynamically import the 3D scene to avoid SSR issues
const AutomationScene = dynamic(() => import("./3d/AutomationScene"), {
  ssr: false,
});

const MobileHero = dynamic(() => import("./MobileHero"), {
  ssr: false,
});

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-16 bg-brand-light w-full max-w-full overflow-hidden">
      {/* Background Depth */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23182019\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 w-full max-w-full">
        
        {/* Left Content */}
        <motion.div
          className="flex flex-col justify-center w-full lg:w-[45%] max-w-[650px] min-w-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={fadeUpVariant}
            className="flex items-center gap-3 mb-6"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </div>
            <p className="text-brand-dark/70 font-semibold tracking-widest text-[10px] sm:text-xs uppercase whitespace-nowrap">
              Systems Online • Automation • Web
            </p>
          </motion.div>
          
          <motion.h1 
            variants={fadeUpVariant}
            className="text-[clamp(1.75rem,6.5vw,4rem)] font-bold font-sans leading-[1.15] mb-5 text-brand-dark tracking-tight"
          >
            BUILD POWERFUL<br/>
            <span className="text-brand-accent">AUTOMATED</span> WEB<br/>
            SOLUTIONS THAT<br/>
            DRIVE REAL RESULTS.
          </motion.h1>
          
          <motion.p 
            variants={fadeUpVariant}
            className="text-sm sm:text-base md:text-lg text-brand-muted mb-8 leading-relaxed"
          >
            Expert in Twilio Voice & SMS, Zapier Automations, AI Agents, Systeme.io, and Custom Web Applications. We build systems that streamline operations and scale efficiently.
          </motion.p>
          
          <motion.div 
            variants={fadeUpVariant}
            className="flex flex-col sm:flex-row items-center gap-3 w-full"
          >
            <Link 
              href="#work"
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-dark text-brand-light font-semibold text-[13px] tracking-wide hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 text-center rounded-sm shadow-lg shadow-brand-dark/20"
            >
              VIEW OUR WORK
            </Link>
            <Link 
              href="#contact"
              className="w-full sm:w-auto px-6 py-3.5 border border-brand-muted/30 text-brand-dark font-semibold text-[13px] tracking-wide hover:border-brand-dark hover:bg-brand-dark/5 hover:-translate-y-1 transition-all duration-300 text-center rounded-sm"
            >
              FREE CONSULTATION
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content - 3D scene */}
         <div className="relative w-full lg:w-[55%] h-[250px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] flex items-center justify-center overflow-hidden min-w-0">
            {isMobile ? <MobileHero /> : <AutomationScene />}
        </div>
      </div>
    </section>
  );
}
