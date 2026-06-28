"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn } from "lucide-react";

type Project = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  link: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = project.images.length;

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + total) % total);
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % total);
  }

  function prevLightbox(e: React.MouseEvent) {
    e.stopPropagation();
    setIndex((i) => (i - 1 + total) % total);
  }

  function nextLightbox(e: React.MouseEvent) {
    e.stopPropagation();
    setIndex((i) => (i + 1) % total);
  }

  return (
    <>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {index + 1} / {total}
          </p>
          <div
            className="relative mx-16 max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.images[index]}
              alt={project.title}
              width={1400}
              height={900}
              className="max-h-[85vh] w-full rounded-xl object-contain"
            />
          </div>
          {total > 1 && (
            <>
              <button
                onClick={prevLightbox}
                className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-accent"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-accent"
              >
                <ChevronRight size={28} />
              </button>
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                    className={"h-2 rounded-full transition-all " + (i === index ? "w-5 bg-accent" : "w-2 bg-white/40")}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="group overflow-hidden rounded-xl border border-border bg-bg-card/60 transition-colors hover:border-accent/50">
        <div
          className="relative aspect-video w-full cursor-zoom-in overflow-hidden bg-bg-panel"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={project.images[index]}
            alt={project.title}
            fill
            className="object-cover transition-opacity duration-200"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <div className="rounded-full bg-black/50 p-3">
              <ZoomIn size={22} className="text-white" />
            </div>
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium">
            {project.category}
          </span>
          {total > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent">
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i); }}
                    className={"h-1.5 rounded-full transition-all " + (i === index ? "w-4 bg-accent" : "w-1.5 bg-white/40")}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm text-white/50">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded bg-white/5 px-2 py-1 text-xs text-white/50">{t}</span>
            ))}
          </div>
          <a href={project.link} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-light hover:underline">
            View Project <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
