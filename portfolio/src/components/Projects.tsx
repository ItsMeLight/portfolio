"use client";

import { useState } from "react";
import { projects as staticProjects } from "@/data/content";
import ProjectCard from "@/components/ProjectCard";

const filters = ["All", "Web", "Mobile", "System", "Game"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? staticProjects
      : staticProjects.filter((p) => p.category === active);

  return (
    <section id="projects" className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm font-medium text-accent-light">My Projects</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Things I&apos;ve built with <span className="text-gradient">passion.</span>
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                active === f
                  ? "bg-accent text-white"
                  : "border border-border text-white/60 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}