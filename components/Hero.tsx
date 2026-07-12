"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { ArrowDown, MoveRight } from "lucide-react";
import { AgentTypingPreview } from "./AgentTypingPreview";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-start md:justify-center overflow-hidden pt-28 md:pt-20 pb-16"
    >
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-orb rounded-full blur-3xl opacity-20 animate-floatY" />
      <div className="absolute top-40 -right-40 w-[520px] h-[520px] bg-orb2 rounded-full blur-3xl opacity-15 animate-floatY" />

      <div className="max-w-6xl w-full mx-auto px-6 md:px-10 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[13px] text-cyan tracking-wide mb-6"
        >
          // {profile.location} · open to opportunities
        </motion.p>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="font-display text-[13vw] md:text-[5.2vw] leading-[0.95] font-semibold tracking-tight text-fog"
            >
              {profile.name}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display mt-3 text-2xl md:text-3xl font-medium text-gradient"
            >
              {profile.role}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-mist"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#agent"
                className="group inline-flex items-center gap-2 rounded-full bg-fog text-ink px-6 py-3 text-[14px] font-medium shadow-[0_0_0_0_rgba(10,132,255,0)] hover:shadow-[0_0_30px_4px_rgba(10,132,255,0.35)] hover:bg-white transition-all duration-300 focus-ring"
              >
                Talk to my agent
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] text-fog hover:bg-white/10 transition-colors focus-ring"
              >
                See the work
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-6 max-w-lg"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-xl md:text-2xl text-fog">
                    {s.value}
                    <span className="text-ash text-base">{s.suffix}</span>
                  </p>
                  <p className="text-[11px] text-ash mt-1 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
  initial={{ opacity: 0, scale: 0.96, y: 12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
  className="mt-10 md:mt-0 w-full max-w-md mx-auto"
>
  <AgentTypingPreview />
</motion.div>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ash hover:text-mist transition-colors focus-ring"
      >
        <ArrowDown className="w-5 h-5 animate-pulseGlow" />
      </a>
    </section>
  );
}
