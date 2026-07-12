"use client";

import { projects } from "@/lib/data";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  return (
    <section id="work" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-[13px] text-cyan mb-4">// 01 — work</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-fog max-w-2xl">
            Three systems, one habit: ship the agent, not the demo.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <a
                href={p.link ?? "#agent"}
                target={p.link ? "_blank" : undefined}
                rel={p.link ? "noopener noreferrer" : undefined}
                className={`group block rounded-4xl p-8 md:p-10 transition-all duration-300 glass hover:bg-white/[0.06] ${
                  p.featured ? "md:p-12 border-signal/30" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[12px] text-ash">
                        {p.time}
                      </span>
                      {p.featured && (
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-signal/15 text-signal">
                          live on this page
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-medium text-fog tracking-tight flex items-center gap-2">
                      {p.title}
                      <ArrowUpRight className="w-5 h-5 text-ash opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="mt-3 text-mist text-[15px] leading-relaxed max-w-2xl">
                      {p.description}
                    </p>
                    <ul className="mt-5 space-y-1.5">
                      {p.points.slice(0, p.featured ? 3 : 2).map((pt) => (
                        <li
                          key={pt}
                          className="text-[13.5px] text-ash leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-cyan/70"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:w-40 shrink-0">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[11px] text-mist px-2.5 py-1 rounded-full border border-line"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
