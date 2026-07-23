import { Github, Linkedin, Facebook, Instagram, Download } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/content";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-40">
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-medium text-accent-light">Hello, I&apos;m</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {profile.firstName} <br />
            <span className="text-gradient">{profile.lastName}</span>
          </h1>
          <p className="mt-4 text-lg text-white/70">{profile.role}</p>
          <p className="text-white/50">{profile.tagline}</p>
          <p className="mt-4 max-w-md text-white/60">{profile.blurb}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/cv/CV_Asuncion, Christian I..pdf"
              className="flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium shadow-glow transition-transform hover:scale-[1.03]"
            >
              Download CV <Download size={16} />
            </a>
            <a
              href="#contact"
              className="rounded-md border border-border px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-accent hover:text-white"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-6 flex gap-4 text-white/60">
            <a href={profile.socials.github} aria-label="GitHub" className="hover:text-accent-light">
              <Github size={20} />
            </a>
            <a href={profile.socials.linkedin} aria-label="LinkedIn" className="hover:text-accent-light">
              <Linkedin size={20} />
            </a>
            <a href={profile.socials.facebook} aria-label="Facebook" className="hover:text-accent-light">
              <Facebook size={20} />
            </a>
            <a href={profile.socials.instagram} aria-label="Instagram" className="hover:text-accent-light">
              <Instagram size={20} />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-bg-card/60 p-4">
                <p className="text-xl font-bold text-accent-light">{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
          <div className="absolute inset-0 rounded-full border border-accent/30" />
          <div className="absolute inset-4 rounded-full bg-accent/10 blur-2xl" />
          <div className="relative h-[88%] w-[88%] overflow-hidden rounded-full border-2 border-accent shadow-glow">
            <Image
              src="/images/profile2.png"
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
