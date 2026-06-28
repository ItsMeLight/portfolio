import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-sm text-white/40 sm:flex-row lg:px-8">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
