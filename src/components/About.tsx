"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, User, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { profile, interests, certificates } from "@/data/content";

export default function About() {
  const [certPage, setCertPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const perPage = 5;
  const totalPages = Math.ceil(certificates.length / perPage);
  const visibleCerts = certificates.slice(certPage * perPage, certPage * perPage + perPage);

  function openLightbox(localIndex: number) {
    setLightboxIndex(certPage * perPage + localIndex);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function lightboxPrev(e: React.MouseEvent) {
    e.stopPropagation();
    setLightboxIndex((i) => (i! - 1 + certificates.length) % certificates.length);
  }

  function lightboxNext(e: React.MouseEvent) {
    e.stopPropagation();
    setLightboxIndex((i) => (i! + 1) % certificates.length);
  }

  return (
    <section id="about" className="border-t border-border py-24">
      {/* Certificate Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>

          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {lightboxIndex + 1} / {certificates.length}
          </p>

          <div
            className="relative mx-16 max-h-[85vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={certificates[lightboxIndex].image}
              alt={certificates[lightboxIndex].title}
              width={1200}
              height={900}
              className="max-h-[85vh] w-full rounded-xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/60">
              {certificates[lightboxIndex].title}
            </p>
          </div>

          <button
            onClick={lightboxPrev}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-accent"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={lightboxNext}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-accent"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={"h-2 rounded-full transition-all " + (i === lightboxIndex ? "w-5 bg-accent" : "w-2 bg-white/40")}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm font-medium text-accent-light">About Me</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Get to know more <span className="text-gradient">about me.</span>
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="relative mx-auto h-80 w-full max-w-md overflow-hidden rounded-2xl border border-border lg:mx-0">
            <Image src="/images/aboutme1.png" alt={profile.name} fill className="object-cover" />
          </div>

          <div>
            <p className="text-white/60">
              I am a passionate Information Technology graduate who loves turning ideas into
              real-world solutions. I enjoy learning new technologies and building applications
              that make a difference.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InfoItem icon={<User size={18} />} label="Name" value={profile.name} />
              <InfoItem icon={<Calendar size={18} />} label="Age" value={String(profile.age)} />
              <InfoItem icon={<Mail size={18} />} label="Email" value={profile.email} />
              <InfoItem icon={<MapPin size={18} />} label="Location" value={profile.location} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InfoItem label="Education" value={profile.degree} />
              <InfoItem label="University" value={profile.university} />
            </div>

            <div className="mt-6 rounded-lg border border-border bg-bg-card/60 p-4">
              <p className="text-xs text-white/40">Availability</p>
              <p className="font-medium text-emerald-400">{profile.availability}</p>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Certificates &amp; Recognition</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/40">
                {certPage * perPage + 1}–{Math.min(certPage * perPage + perPage, certificates.length)} of {certificates.length}
              </span>
              <button
                onClick={() => setCertPage((p) => Math.max(0, p - 1))}
                disabled={certPage === 0}
                className="rounded-full border border-border p-1.5 text-white/60 hover:border-accent hover:text-accent disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCertPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={certPage === totalPages - 1}
                className="rounded-full border border-border p-1.5 text-white/60 hover:border-accent hover:text-accent disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {visibleCerts.map((c, i) => (
              <div
                key={c.title}
                onClick={() => openLightbox(i)}
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-lg border border-border bg-bg-card transition-colors hover:border-accent/50"
              >
                <Image src={c.image} alt={c.title} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomInIcon />
                </div>
              </div>
            ))}
          </div>

          {/* Page dots */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCertPage(i)}
                  className={"h-1.5 rounded-full transition-all " + (i === certPage ? "w-5 bg-accent" : "w-1.5 bg-white/20")}
                />
              ))}
            </div>
          )}
        </div>

        {/* Interests */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold">My Interests</h3>
          <div className="mt-5 flex flex-wrap gap-4">
            {interests.map((interest) => (
              <div
                key={interest}
                className="rounded-lg border border-border bg-bg-card/60 px-5 py-3 text-sm text-white/70"
              >
                {interest}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ZoomInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      {icon && <span className="mt-1 text-accent-light">{icon}</span>}
      <div>
        <p className="text-xs text-white/40">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}