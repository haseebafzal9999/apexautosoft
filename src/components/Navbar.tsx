"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled ? "glass-header py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="#home" className="flex items-center gap-2 group">
            <span className="font-sans text-lg font-bold tracking-widest text-brand-dark flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
              </div>
              ApexAutosoft
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-semibold tracking-wide transition-colors hover:text-brand-accent relative",
                  activeSection === link.href.substring(1) ? "text-brand-accent" : "text-brand-dark/60"
                )}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-accent rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="#contact"
              className="px-5 py-2 border border-brand-dark text-brand-dark text-xs font-semibold tracking-wider hover:bg-brand-dark hover:text-brand-light transition-colors duration-300 rounded-sm"
            >
              BOOK CONSULTATION
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 -mr-2 text-brand-dark"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-brand-light flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-brand-muted/10">
              <span className="font-sans text-xl font-bold tracking-wider">ApexAutosoft</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-brand-dark"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-10 px-6 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-sans tracking-tight flex items-center group"
                  >
                    <span className={cn(
                      "transition-colors",
                      activeSection === link.href.substring(1) ? "text-brand-accent" : "text-brand-dark group-hover:text-brand-muted"
                    )}>
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-6 border-t border-brand-muted/10">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-4 bg-brand-dark text-brand-light text-center font-medium hover:bg-brand-accent transition-colors"
              >
                BOOK A CONSULTATION
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
