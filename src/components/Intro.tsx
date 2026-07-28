"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="py-20 md:py-32 bg-brand-light relative z-10 border-b border-brand-muted/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-brand-dark leading-[1.2] mb-10 text-balance mx-auto tracking-tight"
          >
            TURN COMPLEX BUSINESS PROCESSES INTO <span className="text-brand-accent">SIMPLE, AUTOMATED SYSTEMS.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-brand-muted leading-relaxed font-sans"
        >
          With years of experience developing robust web applications, we turn complex requirements into seamless, automated systems. From Twilio-powered communication tools to end-to-end Zapier and Systeme.io automations, we deliver solutions that save time and increase revenue.
        </motion.p>
      </div>
    </section>
  );
}
