"use client";

import { experience } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-[13px] text-cyan mb-4">
            // 02 — experience
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-fog max-w-2xl">
            Three internships, three different problems, the same approach.
          </h2>
        </Reveal>

        <div className="mt-14 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line hidden md:block" />
          <div className="space-y-12">
            {experience.map((e, i) => (
              <Reveal key={e.org} delay={i * 0.1}>
                <div className="relative md:pl-12">
                  <span className="hidden md:block absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-ink border-2 border-signal" />
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                    <h3 className="text-xl md:text-2xl font-medium text-fog">
                      {e.role} ·{" "}
                      <span className="text-mist">{e.org}</span>
                    </h3>
                    <span className="font-mono text-[12px] text-ash whitespace-nowrap">
                      {e.time}
                    </span>
                  </div>
                  <p className="text-[13px] text-ash mb-4">{e.place}</p>
                  <ul className="space-y-2 max-w-2xl">
                    {e.points.map((pt) => (
                      <li
                        key={pt}
                        className="text-[14.5px] text-mist leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-violet/70"
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
