"use client";

import { skills } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-[13px] text-cyan mb-4">// 03 — stack</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-fog max-w-2xl">
            The toolbox behind the agent.
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.08}>
              <div className="glass rounded-4xl p-7 h-full">
                <h3 className="font-mono text-[12px] text-cyan uppercase tracking-wide mb-4">
                  {group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="text-[13.5px] text-mist px-3 py-1.5 rounded-full border border-line hover:border-signal/40 hover:text-fog transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
