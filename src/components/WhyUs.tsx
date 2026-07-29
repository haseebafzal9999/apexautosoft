"use client";

import { motion } from "framer-motion";
import { WHY_US } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 md:py-32 bg-brand-charcoal text-brand-light relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 leading-tight"
          >
            WHY BUSINESSES <br/>
            <span className="text-brand-accent">TRUST APEXAUTOSOFT</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-muted text-lg mb-12 max-w-lg"
          >
            We don&apos;t just write code; we build scalable engines that drive your business forward. Here is why our clients partner with us for the long term.
          </motion.p>

          <div className="flex flex-col gap-8">
            {WHY_US.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="mt-1 shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl mb-1 tracking-wide">{item.title}</h3>
                  <p className="text-brand-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square max-h-[600px] w-full rounded-2xl overflow-hidden bg-brand-dark border border-brand-muted/20"
        >
          {/* Decorative elements representing abstract code/automation */}
          <div className="absolute inset-0 opacity-20">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
               </pattern>
               <rect width="100" height="100" fill="url(#grid)" className="text-brand-accent" />
             </svg>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border border-brand-accent/30 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center relative">
              <div className="w-4 h-4 rounded-full bg-brand-accent absolute -top-2" />
              <div className="w-48 h-48 border border-brand-muted/30 rounded-full animate-[spin_15s_linear_infinite_reverse] flex items-center justify-center relative">
                <div className="w-3 h-3 rounded-full bg-brand-light absolute -bottom-1.5" />
                <div className="w-32 h-32 border border-brand-accent/50 rounded-full flex items-center justify-center bg-brand-accent/10 backdrop-blur-sm shadow-[0_0_30px_rgba(125,168,141,0.2)]">
                  <span className="font-serif text-2xl font-bold text-brand-light">FLOW</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
