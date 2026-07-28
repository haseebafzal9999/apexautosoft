"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-brand-light relative z-10 border-b border-brand-muted/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-brand-dark mb-6">
            WHAT WE BUILD
          </h2>
          <div className="w-24 h-1 bg-brand-accent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.num} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative bg-white p-8 md:p-10 border border-brand-muted/20 hover:border-brand-accent transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-brand-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <span className="text-4xl font-sans font-light text-brand-muted/40 group-hover:text-brand-accent transition-colors duration-500">
            {service.num}
          </span>
          <div className="w-10 h-10 rounded-full border border-brand-muted/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors duration-500">
            <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-light transition-colors" />
          </div>
        </div>

        <h3 className="text-xl font-sans font-bold text-brand-dark mb-4 leading-tight">
          {service.title}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}
