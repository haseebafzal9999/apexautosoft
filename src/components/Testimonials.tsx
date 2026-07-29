"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const REVIEWS = [
  {
    initials: "JD",
    name: "James D.",
    role: "CEO",
    company: "TechFlow Solutions",
    text: "ApexAutosoft built a complete Twilio-based communication system for our sales team. Inbound calls, SMS follow-ups, and lead routing—all automated. It saved us 20+ hours per week.",
    rating: 5,
  },
  {
    initials: "SK",
    name: "Sarah K.",
    role: "Operations Manager",
    company: "GrowthGrid Inc.",
    text: "We needed Zapier integrations between our CRM, email, and Slack. ApexAutosoft delivered a clean, reliable automation layer that just works. No more manual data entry.",
    rating: 5,
  },
  {
    initials: "ML",
    name: "Marcus L.",
    role: "Founder",
    company: "Pinnacle Digital",
    text: "The AI agent for customer support was a game changer. It handles 80% of our inbound questions autonomously. Setup was smooth and the documentation was excellent.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-brand-accent text-xs font-semibold tracking-widest mb-4">
            CLIENT REVIEWS
          </p>
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-brand-light leading-tight">
            TRUSTED BY BUSINESSES
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 flex flex-col gap-5 relative group hover:bg-white/[0.07] transition-colors"
            >
              <Quote className="w-8 h-8 text-brand-accent/40 shrink-0" />

              <p className="text-brand-light/80 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent text-sm font-bold">
                  {review.initials}
                </div>
                <div>
                  <p className="text-brand-light font-semibold text-sm">{review.name}</p>
                  <p className="text-brand-light/50 text-xs">{review.role}, {review.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
