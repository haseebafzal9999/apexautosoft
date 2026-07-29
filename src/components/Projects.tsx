"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import ProjectFilters from "./ProjectFilters";
import ProjectCard from "./ProjectCard";
import ProjectDetailsModal from "./ProjectDetailsModal";
import ProjectVideoModal from "./ProjectVideoModal";
import { ChevronDown, ChevronUp } from "lucide-react";

const SHOW_COUNT = 6;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [videoProject, setVideoProject] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const visibleProjects = useMemo(() => {
    return expanded ? filtered : filtered.slice(0, SHOW_COUNT);
  }, [filtered, expanded]);

  const hasMore = filtered.length > SHOW_COUNT;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setExpanded(false);
  };

  return (
    <section id="work" className="py-24 md:py-40 bg-brand-light relative z-10 border-b border-brand-muted/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-accent mb-4 block">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-brand-dark mb-6">
            FEATURED PROJECTS
          </h2>
          <div className="w-24 h-1 bg-brand-accent mb-6" />
          <p className="text-brand-muted text-sm md:text-base max-w-2xl leading-relaxed">
            Explore our portfolio of automation solutions, web applications, and intelligent systems built for modern businesses.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 md:mb-12">
          <ProjectFilters active={activeCategory} onChange={handleCategoryChange} />
        </div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.4, delay: index < SHOW_COUNT ? 0 : (index - SHOW_COUNT) * 0.05, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onViewDetails={setSelectedProject}
                    onWatchDemo={setVideoProject}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center"
              >
                <p className="text-brand-muted text-sm">No projects found in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* View More / Show Less button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12 md:mt-16"
          >
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-dark text-brand-light font-semibold text-sm tracking-widest uppercase hover:bg-brand-accent hover:shadow-lg hover:shadow-brand-accent/20 transition-all duration-300"
            >
              {expanded ? (
                <>
                  SHOW LESS
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  VIEW MORE WORK
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onWatchDemo={(p) => {
          setVideoProject(p);
          setSelectedProject(null);
        }}
      />
      <ProjectVideoModal project={videoProject} onClose={() => setVideoProject(null)} />
    </section>
  );
}
