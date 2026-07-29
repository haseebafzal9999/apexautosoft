"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/projects";
import { X, Play } from "lucide-react";

interface ProjectVideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectVideoModal({ project, onClose }: ProjectVideoModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const [videoError, setVideoError] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    const currentVideo = videoRef.current;
    previousActiveElement.current = document.activeElement;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.addEventListener("keydown", handleKeyDown);
    setVideoError(false);
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
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.removeAttribute("src");
        currentVideo.load();
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
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
          aria-label={`Demo video: ${project.title}`}
        >
          {/* Close button - always visible */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="fixed z-[10000] w-11 h-11 flex items-center justify-center bg-black/60 text-white hover:bg-white hover:text-brand-dark transition-colors duration-300"
            style={{
              top: "calc(max(env(safe-area-inset-top), 16px))",
              right: "calc(max(env(safe-area-inset-right), 16px))",
            }}
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:w-auto sm:max-w-4xl h-full sm:h-auto bg-black shadow-2xl"
            style={{
              maxHeight: "min(90vh, calc(100dvh - 80px))",
              overflow: "hidden",
            }}
          >
            {videoError || !project.video ? (
              <div className="flex flex-col items-center justify-center gap-4 w-full h-full min-h-[300px] sm:aspect-video bg-brand-dark text-brand-light p-8">
                <div className="w-16 h-16 rounded-full border-2 border-brand-muted/30 flex items-center justify-center">
                  <Play className="w-6 h-6 text-brand-muted/50" />
                </div>
                <p className="text-sm font-medium text-brand-muted tracking-wide">Demo video coming soon</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                controls
                autoPlay
                className="w-full h-full sm:h-auto sm:aspect-video bg-black object-contain"
                onError={() => setVideoError(true)}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
