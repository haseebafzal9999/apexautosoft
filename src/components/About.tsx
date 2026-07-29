"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-brand-charcoal text-brand-light relative border-b border-brand-accent/20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-24 items-center">
          
          <div className="lg:col-span-3">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold mb-8 leading-[1.1] tracking-tight"
            >
              BUILD LESS BUSYWORK.<br/>
              <span className="text-brand-accent">BUILD BETTER SYSTEMS.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-brand-muted text-lg leading-relaxed"
            >
              ApexAutosoft is focused on building efficient, scalable digital systems that connect web applications, APIs, communication platforms, automation tools and AI.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pl-6 border-l-2 border-brand-accent flex flex-col gap-3"
            >
              <p className="text-brand-light font-medium tracking-wide">The goal is simple:</p>
              <ul className="text-brand-muted flex flex-col gap-2">
                <li>Reduce manual work.</li>
                <li>Improve customer engagement.</li>
                <li>Connect disconnected systems.</li>
                <li>Build scalable workflows.</li>
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
