"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.description.trim()) newErrors.description = "Project description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    
    // Simulate API call architecture
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // throw new Error("Simulated error"); // Uncomment to test error state
      setStatus("success");
      setFormData({ name: "", email: "", company: "", budget: "", description: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-brand-light relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Text Content */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-brand-dark mb-8 leading-tight"
          >
            READY TO AUTOMATE <br/>
            <span className="text-brand-accent">AND SCALE?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-muted text-lg leading-relaxed mb-12 max-w-lg"
          >
            Let&apos;s discuss your project. Whether you need a custom web application, Twilio integration, AI agent or complete automation system, let&apos;s build something practical and scalable.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-10 border border-brand-muted/20 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-2xl font-sans font-bold text-brand-dark mb-2">Message Sent</h3>
                <p className="text-brand-muted mb-8 max-w-sm">
                  Thank you for reaching out. We will get back to you within 24 hours to schedule your consultation.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2 border border-brand-muted/20 text-brand-dark hover:bg-brand-accent/5 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                noValidate
              >
                {status === "error" && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    Something went wrong. Please try again later.
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-brand-dark tracking-wide">Name *</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`px-4 py-3 bg-brand-light/50 border outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent ${errors.name ? 'border-red-300' : 'border-brand-muted/20'}`}
                    />
                    {errors.name && <span id="name-error" className="text-red-500 text-xs font-medium" role="alert">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-brand-dark tracking-wide">Email *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`px-4 py-3 bg-brand-light/50 border outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent ${errors.email ? 'border-red-300' : 'border-brand-muted/20'}`}
                    />
                    {errors.email && <span id="email-error" className="text-red-500 text-xs font-medium" role="alert">{errors.email}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-sm font-semibold text-brand-dark tracking-wide">Company (Optional)</label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="px-4 py-3 bg-brand-light/50 border border-brand-muted/20 outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-sm font-semibold text-brand-dark tracking-wide">Budget (Optional)</label>
                  <input 
                    type="text" 
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="e.g. $5,000 - $10,000"
                    className="px-4 py-3 bg-brand-light/50 border border-brand-muted/20 outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-sm font-semibold text-brand-dark tracking-wide">Project Description *</label>
                  <textarea 
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    aria-required="true"
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "description-error" : undefined}
                    className={`px-4 py-3 bg-brand-light/50 border outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent resize-y min-h-[100px] ${errors.description ? 'border-red-300' : 'border-brand-muted/20'}`}
                  />
                  {errors.description && <span id="description-error" className="text-red-500 text-xs font-medium" role="alert">{errors.description}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="mt-4 w-full py-4 bg-brand-dark text-brand-light font-medium tracking-wide hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SCHEDULE A FREE 30-MINUTE CONSULTATION
                      <Send className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
