"use client";

import { profile } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Mail, Github, Linkedin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-[13px] text-cyan mb-4">// 06 — contact</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-fog max-w-3xl">
            Let&apos;s build the thing that thinks for itself.
          </h2>
          <p className="mt-5 max-w-xl text-mist text-[16px] leading-relaxed">
            Open to internships, research collaborations, and interesting AI
            problems. The fastest way to reach me is email — or just ask the
            agent above to pass on your details.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-fog text-ink px-6 py-3 text-[14px] font-medium hover:bg-white transition-colors focus-ring"
          >
            <Mail className="w-4 h-4" />
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] text-fog hover:bg-white/10 transition-colors focus-ring"
          >
            <Phone className="w-4 h-4" />
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] text-fog hover:bg-white/10 transition-colors focus-ring"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] text-fog hover:bg-white/10 transition-colors focus-ring"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
