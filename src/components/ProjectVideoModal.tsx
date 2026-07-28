"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/projects";
import { X, Play } from "lucide-react";

interface ProjectVideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectVideoModal({ project, onClose }: ProjectVideoModalProps) {
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
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    setVideoError(false);
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Demo video: ${project.title}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-4xl bg-black rounded-sm overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-black/60 text-white hover:bg-white hover:text-brand-dark transition-colors duration-300"
              aria-label="Close video"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video or placeholder */}
            {videoError || !project.video ? (
              <div className="aspect-video w-full flex flex-col items-center justify-center gap-4 bg-brand-dark text-brand-light p-8">
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
                className="w-full aspect-video bg-black"
                onError={() => setVideoError(true)}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
