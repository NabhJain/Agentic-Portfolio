import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

// ── Pushover notification ──────────────────────────────────────────────────
async function push(text: string) {
  const token = process.env.PUSHOVER_TOKEN;
  const user = process.env.PUSHOVER_USER;
  if (!token || !user) return; // silently skip if not configured
  try {
    await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, user, message: text }),
    });
  } catch {
    console.error("Pushover notification failed");
  }
}

// ── Tool implementations ───────────────────────────────────────────────────
async function record_user_details(
  email: string,
  name = "Name not provided",
  notes = "not provided"
) {
  await push(`Recording ${name} with email ${email} and notes ${notes}`);
  return { recorded: "ok" };
}

async function record_unknown_question(question: string) {
  await push(`Unknown question on portfolio: ${question}`);
  return { recorded: "ok" };
}

// ── Tool schemas ───────────────────────────────────────────────────────────
const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "record_user_details",
      description:
        "Use this tool to record that a user is interested in being in touch and provided an email address",
      parameters: {
        type: "object",
        properties: {
          email: { type: "string", description: "The email address of this user" },
          name: { type: "string", description: "The user's name, if they provided it" },
          notes: {
            type: "string",
            description: "Any additional information about the conversation worth recording",
          },
        },
        required: ["email"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "record_unknown_question",
      description:
        "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
      parameters: {
        type: "object",
        properties: {
          question: { type: "string", description: "The question that couldn't be answered" },
        },
        required: ["question"],
        additionalProperties: false,
      },
    },
  },
];

// ── Tool dispatcher ────────────────────────────────────────────────────────
async function handle_tool_call(
  toolCalls: OpenAI.Chat.ChatCompletionMessageToolCall[]
): Promise<OpenAI.Chat.ChatCompletionToolMessageParam[]> {
  const results: OpenAI.Chat.ChatCompletionToolMessageParam[] = [];
  for (const tc of toolCalls) {
    const fnTc = tc as OpenAI.Chat.ChatCompletionMessageToolCall & {
      function: { name: string; arguments: string };
    };
    const args = JSON.parse(fnTc.function.arguments);
    let result: Record<string, string> = {};
    if (fnTc.function.name === "record_user_details") {
      result = await record_user_details(args.email, args.name, args.notes);
    } else if (fnTc.function.name === "record_unknown_question") {
      result = await record_unknown_question(args.question);
    }
    results.push({
      role: "tool",
      content: JSON.stringify(result),
      tool_call_id: tc.id,
    });
  }
  return results;
}

// ── Load context files ─────────────────────────────────────────────────────
function loadContext(): string {
  let summary = "";
  try {
    summary = fs.readFileSync(path.join(process.cwd(), "me", "summary.txt"), "utf-8");
  } catch {
    summary = "Summary file not found.";
  }

  // LinkedIn PDF text if extracted and saved
  let linkedin = "";
  try {
    linkedin = fs.readFileSync(path.join(process.cwd(), "me", "linkedin.txt"), "utf-8");
  } catch {
    linkedin = ""; // optional — skip if not present
  }

  return `## Summary:\n${summary}\n\n${linkedin ? `## LinkedIn Profile:\n${linkedin}\n\n` : ""}`;
}

// ── System prompt (mirrors the Python class) ───────────────────────────────
function system_prompt(): string {
  const name = "Nabh Jain";
  const context = loadContext();
  return (
    `You are acting as ${name}. You are answering questions on ${name}'s portfolio website, ` +
    `particularly questions related to ${name}'s career, background, skills and experience. ` +
    `Your responsibility is to represent ${name} for interactions on the website as faithfully as possible. ` +
    `You are given a summary of ${name}'s background and LinkedIn profile which you can use to answer questions. ` +
    `Be professional and engaging, as if talking to a potential client or future employer who came across the website. ` +
    `If you don't know the answer to any question, use your record_unknown_question tool to record the question that you couldn't answer, even if it's about something trivial or unrelated to career. ` +
    `If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your record_user_details tool.\n\n` +
    context +
    `With this context, please chat with the user, always staying in character as ${name}.`
  );
}

// ── API Route ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_API_KEY is not configured." }, { status: 500 });
  }

  const gemini = new OpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const { messages: history } = await req.json();

    // Build messages array: system + history
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: system_prompt() },
      ...history,
    ];

    // Agentic loop — mirrors the Python while not done loop
    let done = false;
    let finalContent = "";

    while (!done) {
      const response = await gemini.chat.completions.create({
        model: "qwen/qwen3.6-27b",
        messages,
        tools,
        tool_choice: "auto",
        // @ts-ignore
        reasoning_effort: "none",
      });
    
      const choice = response.choices[0];
      const content = choice.message.content ?? "";
    
      if (choice.finish_reason === "tool_calls" && choice.message.tool_calls) {
        const toolResults = await handle_tool_call(choice.message.tool_calls);
        messages.push(choice.message);
        messages.push(...toolResults);
      } else {
        // Strip any leaked raw function syntax
        let clean = content
          .replace(/<function=[\s\S]*?<\/function>/g, "")
          .replace(/\{"email"[\s\S]*?\}/g, "")
          .trim();
        finalContent = clean || "I couldn't generate a response. Please try again.";
        done = true;
      }
    }

    return NextResponse.json({ reply: finalContent });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Chat route error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
