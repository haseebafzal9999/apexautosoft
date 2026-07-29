"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project, CATEGORY_LABELS } from "@/lib/projects";
import { X, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onWatchDemo: (project: Project) => void;
}

export default function ProjectDetailsModal({ project, onClose, onWatchDemo }: ProjectDetailsModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    previousActiveElement.current = document.activeElement;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [project, handleKeyDown]);

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          style={{
            paddingTop: "max(env(safe-area-inset-top), 20px)",
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingLeft: "max(env(safe-area-inset-left), 16px)",
            paddingRight: "max(env(safe-area-inset-right), 16px)",
          }}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Project details: ${project.title}`}
        >
          {/* Close button - always visible, top-right corner */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="fixed z-[10000] w-11 h-11 flex items-center justify-center bg-white border border-brand-muted/20 shadow-lg hover:bg-brand-dark hover:text-brand-light hover:border-brand-dark transition-colors duration-300"
            style={{
              top: "calc(max(env(safe-area-inset-top), 16px))",
              right: "calc(max(env(safe-area-inset-right), 16px))",
            }}
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:w-auto sm:max-w-3xl h-full sm:h-auto bg-brand-light border border-brand-muted/20 shadow-2xl overscroll-contain"
            style={{
              maxHeight: "min(90vh, calc(100dvh - 80px))",
              overflowY: "auto",
            }}
          >
            {/* Image */}
            {project.image && (
              <div className="relative aspect-video w-full overflow-hidden bg-brand-accentLight">
                <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
              </div>
            )}

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-accent">
                  {CATEGORY_LABELS[project.category] || project.category}
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-muted/40">
                  {project.status}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark mb-6 leading-tight">
                {project.title}
              </h2>

              <p className="text-brand-muted text-base md:text-lg leading-relaxed mb-8">
                {project.shortDescription}
              </p>

              {project.fullDescription && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold tracking-wider text-brand-dark mb-3 uppercase">About</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{project.fullDescription}</p>
                </div>
              )}

              {project.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold tracking-wider text-brand-dark mb-4 uppercase">Key Features</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-brand-muted">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold tracking-wider text-brand-dark mb-4 uppercase">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-brand-dark/5 text-brand-muted border border-brand-muted/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.results.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold tracking-wider text-brand-dark mb-4 uppercase">Results</h3>
                  <ul className="flex flex-col gap-2">
                    {project.results.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-brand-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-2" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-6 border-t border-brand-muted/10">
                {project.video && (
                  <button
                    onClick={() => {
                      onWatchDemo(project);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase bg-brand-dark text-brand-light hover:bg-brand-accent transition-colors duration-300"
                  >
                    Watch Demo
                  </button>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase border border-brand-muted/20 text-brand-dark hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}

                {project.caseStudyUrl && (
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase border border-brand-muted/20 text-brand-dark hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Case Study
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
