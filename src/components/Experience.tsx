import { experience, profile } from "@/data/content";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm font-medium text-accent-light">My Journey</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Experience that shaped <span className="text-gradient">my skills and growth.</span>
        </h2>

        <div className="mt-12 space-y-8 border-l border-border pl-8">
          {experience.map((e) => (
            <div key={e.title} className="relative">
              <span className="absolute -left-[2.45rem] top-1 h-4 w-4 rounded-full border-2 border-accent bg-bg" />
              <p className="text-sm font-medium text-accent-light">{e.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
              <p className="text-sm text-white/50">{e.org}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-bg-card/60 p-5 text-center">
              <p className="text-2xl font-bold text-accent-light">{s.value}</p>
              <p className="text-xs text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
