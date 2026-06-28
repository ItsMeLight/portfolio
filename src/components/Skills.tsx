import { skillCategories, skillLevels } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm font-medium text-accent-light">My Skills</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Technologies and tools I use to <span className="text-gradient">bring ideas to life.</span>
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <h3 className="mb-4 text-sm font-semibold text-white/60">{cat.title}</h3>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                  {cat.items.map((item) => (
                    <div
                      key={item}
                      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-bg-card/60 py-5 text-center transition-colors hover:border-accent/50"
                    >
                      <span className="text-xs font-medium text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-bg-card/60 p-6">
            <h3 className="mb-5 text-sm font-semibold text-white/60">Skill Levels</h3>
            <div className="space-y-5">
              {skillLevels.map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-white/40">{s.value}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-light to-accent"
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
