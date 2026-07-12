"use client";

import { education, certifications, leadership } from "@/lib/data";
import { Reveal } from "./Reveal";
import { GraduationCap, Award, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-[13px] text-cyan mb-4">// 05 — about</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-fog max-w-2xl">
            Currently a 4th-year Computer Engineering student.
          </h2>
          <p className="mt-5 max-w-2xl text-mist text-[16px] leading-relaxed">
            Started in predictive modeling and OCR pipelines, now moving
            deeper into LLMs and agentic AI — building toward systems that
            don&apos;t just predict, but act.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <Reveal className="md:col-span-1">
            <div className="glass rounded-4xl p-7 h-full">
              <GraduationCap className="w-5 h-5 text-cyan mb-4" />
              <h3 className="font-mono text-[12px] text-ash uppercase tracking-wide mb-4">
                Education
              </h3>
              <ul className="space-y-5">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="text-[14px] text-fog font-medium leading-snug">
                      {e.degree}
                    </p>
                    <p className="text-[12.5px] text-mist mt-1">{e.org}</p>
                    <p className="text-[11.5px] text-ash mt-1">
                      {e.time} · {e.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-1">
            <div className="glass rounded-4xl p-7 h-full">
              <Award className="w-5 h-5 text-cyan mb-4" />
              <h3 className="font-mono text-[12px] text-ash uppercase tracking-wide mb-4">
                Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((c) => (
                  <li
                    key={c}
                    className="text-[13.5px] text-mist leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-cyan/70"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-1">
            <div className="glass rounded-4xl p-7 h-full">
              <Users className="w-5 h-5 text-cyan mb-4" />
              <h3 className="font-mono text-[12px] text-ash uppercase tracking-wide mb-4">
                Leadership & Activities
              </h3>
              <ul className="space-y-3">
                {leadership.map((l) => (
                  <li
                    key={l}
                    className="text-[13.5px] text-mist leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-violet/70"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
