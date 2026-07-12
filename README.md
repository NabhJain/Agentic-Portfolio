# Nabh Jain — Portfolio

Apple-style, dark, techy portfolio built with Next.js 14 + TailwindCSS +
Framer Motion. Your agent (https://huggingface.co/spaces/nabh24/Agentic_Portfolio)
is embedded live in the "Agent" section via iframe — no extra hosting or cost.

Everything here is **free**: Next.js + Vercel free tier + your existing free
Hugging Face Space for the agent. No API keys are needed in this repo.

## Run it on your machine

You need [Node.js 18+](https://nodejs.org) installed.

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000 — that's your live preview while you edit.

To check the production build locally before deploying:

```bash
npm run build
npm run start
```

## Project structure

```
app/                Next.js App Router (layout, page, global styles)
components/         Nav, Hero, Projects, Experience, Skills, AgentSection, About, Contact, Footer
lib/data.ts          ← all your resume content lives here. Edit this file to update text.
```

To change any text (projects, experience, skills, bio, contact info), edit
`lib/data.ts` — nothing else needs to change.

To change the agent embed URL, edit `agentUrl` in `lib/data.ts`. It currently
points to:
`https://nabh24-agentic-portfolio.hf.space`

## Deploy for free on Vercel

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com → sign in with GitHub → "Add New Project" →
   import the repo.
3. Leave all settings as default (Vercel auto-detects Next.js) → Deploy.
4. You'll get a free `your-project.vercel.app` URL. You can add a custom
   domain later for free if you own one (Vercel's hosting itself stays free
   on the Hobby plan).

No environment variables or paid services are required — the agent stays on
its own free Hugging Face Space and is just embedded by URL.

## Notes on the embedded agent

Free Hugging Face Spaces sleep when idle, so the first load after inactivity
can take ~10–20 seconds to "wake up." The Agent section shows a loading
state for this and includes a manual reload button plus an "open directly"
link as a fallback — no action needed from you, it's already handled in
`components/AgentSection.tsx`.

If you'd rather not rely on the iframe (e.g. if Hugging Face ever changes
embed permissions), the simplest fallback is replacing the iframe block in
`AgentSection.tsx` with a styled button linking out to the Space.

## Customizing the look

- Colors, type, spacing tokens: `tailwind.config.js`
- Glass/blur effects, gradients, grain texture: `app/globals.css`
- Fonts use the system UI stack (`-apple-system`/SF Pro on Mac/iOS, Segoe UI
  on Windows) so it renders as truly native-feeling type with zero network
  dependency and zero font licensing cost.
