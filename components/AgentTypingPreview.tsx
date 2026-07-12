"use client";

import { useEffect, useState } from "react";

const script: { who: "user" | "agent"; text: string }[] = [
  { who: "user", text: "What has Nabh shipped recently?" },
  {
    who: "agent",
    text:
      "An OCR pipeline at Ecoreceipt (+20% extraction reliability) and an agentic RAG assistant — the one you're talking to right now.",
  },
  { who: "user", text: "Is he free for an internship?" },
  { who: "agent", text: "Yes — open to roles starting this year. Want his email?" },
];

export function AgentTypingPreview() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState<{ who: string; text: string }[]>([]);

  useEffect(() => {
    if (lineIndex >= script.length) {
      const reset = setTimeout(() => {
        setDone([]);
        setLineIndex(0);
        setCharIndex(0);
      }, 2600);
      return () => clearTimeout(reset);
    }

    const current = script[lineIndex];
    if (charIndex < current.text.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDone((d) => [...d, current]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  const current = script[lineIndex];

  return (
    <div className="glass-strong rounded-4xl p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 pb-3 border-b border-line mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-ash">
          agentic_portfolio.run
        </span>
      </div>

      <div className="space-y-3 min-h-[220px] font-mono text-[13px] leading-relaxed">
        {done.map((line, i) => (
          <p
            key={i}
            className={
              line.who === "user" ? "text-mist" : "text-cyan"
            }
          >
            <span className="text-ash">{line.who === "user" ? "you ›" : "agent ›"}</span>{" "}
            {line.text}
          </p>
        ))}
        {current && (
          <p className={current.who === "user" ? "text-mist" : "text-cyan"}>
            <span className="text-ash">
              {current.who === "user" ? "you ›" : "agent ›"}
            </span>{" "}
            {current.text.slice(0, charIndex)}
            <span className="inline-block w-[7px] h-[14px] bg-current align-middle ml-0.5 animate-blink" />
          </p>
        )}
      </div>

      <p className="mt-4 pt-3 border-t border-line text-[11px] text-ash font-mono">
        live preview — full agent below ↓
      </p>
    </div>
  );
}
