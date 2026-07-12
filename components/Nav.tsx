"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#agent", label: "Agent" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <nav className="className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 h-12 md:h-16"">
        <a
          href="#top"
          className="font-mono text-[13px] tracking-tight text-fog focus-ring"
        >
          NJ<span className="text-signal">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-[13px] text-mist">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-fog transition-colors focus-ring"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] px-4 py-1.5 rounded-full glass text-fog hover:bg-white/10 transition-colors focus-ring"
        >
          LinkedIn
        </a>
      </nav>
    </header>
  );
}
