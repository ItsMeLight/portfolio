"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram, Send } from "lucide-react";
import { profile } from "@/data/content";
import { supabase } from "@/lib/supabaseClient";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("full_name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      // 1. Send the email straight to your Gmail via EmailJS.
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          full_name: fullName,
          email,
          subject,
          message,
          to_email: profile.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );

      // 2. Optionally also log the message in Supabase so you have a
      //    record of every submission. Safe to remove if you don't
      //    want a "messages" table.
      try {
        await supabase.from("messages").insert({
          full_name: fullName,
          email,
          subject,
          message,
        });
      } catch {
        // Non-fatal: the email already went out, so don't block on this.
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong sending your message. Please try again.");
    }
  }

  return (
    <section id="contact" className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm font-medium text-accent-light">Get In Touch</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Let&apos;s work <span className="text-gradient">together.</span>
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-white/60">
              Have a project in mind or want to collaborate? Feel free to send me a message.
            </p>

            <div className="mt-8 space-y-5">
              <ContactRow icon={<Mail size={18} />} label="Email" value={profile.email} />
              <ContactRow icon={<Phone size={18} />} label="Phone" value={profile.phone} />
              <ContactRow icon={<MapPin size={18} />} label="Location" value={profile.location} />
              <ContactRow
                icon={<Github size={18} />}
                label="GitHub"
                value={profile.socials.github.replace("https://github.com/ItsMeLight://", "")}
              />
              <ContactRow
                icon={<Linkedin size={18} />}
                label="LinkedIn"
                value={profile.socials.linkedin.replace("https://", "")}
              />
            </div>

            <div className="mt-6 flex gap-4 text-white/60">
              <a href={profile.socials.github} className="hover:text-accent-light">
                <Github size={20} />
              </a>
              <a href={profile.socials.linkedin} className="hover:text-accent-light">
                <Linkedin size={20} />
              </a>
              <a href={profile.socials.facebook} className="hover:text-accent-light">
                <Facebook size={20} />
              </a>
              <a href={profile.socials.instagram} className="hover:text-accent-light">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-bg-card/60 p-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" name="full_name" placeholder="Your name" required />
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" placeholder="Subject" required />
            </div>
            <div className="mt-5">
              <label className="mb-1.5 block text-xs text-white/50">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Your message here..."
                className="w-full rounded-md border border-border bg-bg-panel px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
              <Send size={16} />
            </button>

            {status === "success" && (
              <p className="mt-3 text-sm text-emerald-400">
                Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && <p className="mt-3 text-sm text-red-400">{errorMsg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-accent-light">{icon}</span>
      <div>
        <p className="text-xs text-white/40">{label}</p>
        <p className="text-sm text-white/80">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-white/50">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-border bg-bg-panel px-4 py-3 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}
