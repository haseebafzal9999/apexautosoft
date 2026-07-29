"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Project, CATEGORY_LABELS } from "@/lib/projects";
import { Play, ExternalLink, Eye, Grid3x3 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
  onWatchDemo: (project: Project) => void;
}

const STATUS_COLORS: Record<string, string> = {
  DEMO: "bg-amber-400/10 text-amber-600 border-amber-400/20",
  "IN DEVELOPMENT": "bg-blue-400/10 text-blue-600 border-blue-400/20",
  LAUNCHED: "bg-green-400/10 text-green-600 border-green-400/20",
  MAINTENANCE: "bg-brand-muted/10 text-brand-muted border-brand-muted/20",
};

export default function ProjectCard({ project, index, onViewDetails, onWatchDemo }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col h-full bg-white border border-brand-muted/20 hover:border-brand-accent/40 hover:shadow-xl hover:shadow-brand-muted/5 transition-all duration-500"
    >
      {/* Image area */}
      <div className="relative aspect-video bg-brand-accentLight overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-dark/5 via-brand-accent/5 to-brand-dark/10">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border border-brand-muted/15" />
              <div className="absolute inset-2 rounded-full border border-brand-muted/10 flex items-center justify-center">
                <Grid3x3 className="w-5 h-5 text-brand-muted/30" />
              </div>
            </div>
            <span className="text-[10px] font-medium text-brand-muted/30 tracking-widest uppercase">Visual</span>
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase border ${
            STATUS_COLORS[project.status] || STATUS_COLORS.DEMO
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        {/* Category */}
        <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-accent mb-3">
          {CATEGORY_LABELS[project.category] || project.category}
        </span>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-sans font-bold text-brand-dark mb-3 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-brand-muted leading-relaxed mb-5 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="mb-6 min-h-[28px]">
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-brand-dark/5 text-brand-muted"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-muted/50">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.video ? (
            <button
              onClick={() => onWatchDemo(project)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold tracking-wider uppercase border border-brand-muted/20 text-brand-dark hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
              aria-label={`Watch demo for ${project.title}`}
            >
              <Play className="w-3.5 h-3.5" />
              Watch Demo
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold tracking-wider uppercase border border-brand-muted/10 text-brand-muted/40">
              <Play className="w-3.5 h-3.5" />
              Demo coming soon
            </span>
          )}

          <button
            onClick={() => onViewDetails(project)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold tracking-wider uppercase bg-brand-dark text-brand-light hover:bg-brand-accent transition-colors duration-300"
            aria-label={`View details for ${project.title}`}
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold tracking-wider uppercase border border-brand-muted/20 text-brand-dark hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
