"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, RotateCcw, Zap } from "lucide-react";
import { Reveal } from "./Reveal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "What has Nabh shipped recently?",
  "What's his strongest technical skill?",
  "Is he open to internships?",
  "Tell me about the eDNA project.",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-cyan"
          style={{
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-signal to-violet flex items-center justify-center text-[10px] font-bold text-white mr-2.5 mt-0.5 shrink-0">
          NJ
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
          isUser
            ? "bg-signal/20 border border-signal/30 text-fog rounded-tr-sm"
            : "glass border-line text-mist rounded-tl-sm"
        }`}
      >
        {msg.content.split("\n").map((line, i) => {
          if (line.startsWith("- ") || line.startsWith("• ")) {
            return (
              <div key={i} className="flex gap-2 mt-1">
                <span className="mt-[9px] w-1 h-1 rounded-full bg-cyan shrink-0" />
                <span>{line.slice(2)}</span>
              </div>
            );
          }
          if (line.trim() === "") return <div key={i} className="h-2" />;
          return (
            <p key={i} className={i > 0 ? "mt-1" : ""}>
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export function AgentSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey — I'm Nabh's AI agent, trained on his actual resume and projects. Ask me anything you'd ask him in an intro call.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const prevLengthRef = useRef(0);

  useEffect(() => {
    if (messages.length > prevLengthRef.current) {
      prevLengthRef.current = messages.length;
    }
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updated }),
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          setError(data.error ?? "Something went wrong. Please try again.");
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
        }
      } catch {
        setError("Network error. Please check your connection and retry.");
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [messages, loading]
  );

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const reset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hey — I'm Nabh's AI agent, trained on his actual resume and projects. Ask me anything you'd ask him in an intro call.",
      },
    ]);
    setInput("");
    setError(null);
  };

  return (
    <>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
      <section id="agent" className="relative py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-mono text-[13px] text-cyan mb-4">// 04 — agent</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-fog max-w-2xl">
              This isn&apos;t a chatbot widget.
              <span className="text-mist"> It&apos;s the actual agent.</span>
            </h2>
            <p className="mt-5 max-w-xl text-mist text-[16px] leading-relaxed">
              Powered by AI, grounded in my real resume and
              project history. Ask it anything you&apos;d ask in an interview.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            {/* Starter chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {STARTERS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="font-mono text-[12px] px-3.5 py-1.5 rounded-full border border-line text-ash hover:border-cyan/50 hover:text-cyan transition-all duration-200 disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat window */}
            <div className="glass-strong rounded-4xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#28c840] animate-pulseGlow" />
                  <span className="font-mono text-[12px] text-ash">
                    nabh.agent / live
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-ash/60">
                    <Zap className="w-3 h-3 text-cyan" />
                    live
                  </div>
                  <button
                    onClick={reset}
                    className="text-ash hover:text-fog transition-colors focus-ring p-1"
                    aria-label="Reset conversation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[420px] overflow-y-auto px-5 py-5">
                {messages.map((m, i) => (
                  <MessageBubble key={i} msg={m} />
                ))}
                {loading && (
                  <div className="flex items-start gap-2.5 mb-4">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-signal to-violet flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                      NJ
                    </div>
                    <div className="glass border border-line rounded-2xl rounded-tl-sm px-4 py-3">
                      <TypingDots />
                    </div>
                  </div>
                )}
                {error && (
                  <p className="text-center text-[12px] font-mono text-red-400/80 py-2">
                    {error}
                  </p>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-line px-4 py-3 flex items-end gap-3">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={handleKey}
                  placeholder="Ask about projects, skills, availability…"
                  disabled={loading}
                  className="flex-1 bg-transparent text-[14px] text-fog placeholder:text-ash/50 resize-none outline-none font-sans leading-relaxed disabled:opacity-50 max-h-[120px]"
                  style={{ height: "24px" }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  className="w-8 h-8 rounded-full bg-signal flex items-center justify-center shrink-0 hover:bg-signal/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_16px_rgba(10,132,255,0.4)] hover:shadow-[0_0_24px_rgba(10,132,255,0.6)] focus-ring"
                  aria-label="Send"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            <p className="mt-4 font-mono text-[11.5px] text-ash">
              Enter to send · Shift+Enter for new line
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
