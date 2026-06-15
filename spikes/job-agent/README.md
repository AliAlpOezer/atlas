# 🔎 Job-Market Analyzer Agent (Sprint-1 TS spike)

A ReAct agent that answers *"what skills does the Munich AI-Werkstudent market want, and does my roadmap cover them?"* — from live, public data. The tool that answers the question **is itself a portfolio piece** demonstrating the skills the market wants (tools + structured output + an agent loop + roadmap mapping). Built on the **Vercel AI SDK v6** via **OpenRouter**, model **`openai/gpt-oss-120b:free`** — free ($0 in/out), with native tool use + structured output.

## ⚖️ Data policy (non-negotiable)
- **No LinkedIn login. No stored credentials. Ever.** Not in code, not in `.env`, not in chat.
- **No evasion** — no proxy/user-agent rotation, no CAPTCHA solving. On `429/999` we back off.
- Sources are **public / official only**: **arbeitnow** (open JSON API) + the **LinkedIn guest endpoint** (what LinkedIn serves logged-out visitors), used at low volume + cached. Add **Adzuna** (free key) later for robustness.
- Want LinkedIn *member-only* fields? Don't automate a login — log in yourself in your own browser and point Playwright at *your* session. You don't need it: the public fields (title/company/location/description) are enough for skill analysis.

## Setup & run
```bash
cd spikes/job-agent
# Install mutually-compatible latest (more robust than the pinned ranges in package.json):
pnpm add @openrouter/ai-sdk-provider@latest ai@latest zod && pnpm add -D tsx typescript @types/node
echo "OPENROUTER_API_KEY=sk-or-v1-..." > .env   # free key: https://openrouter.ai/keys — NEVER a LinkedIn password

pnpm run jobs    "ai engineer werkstudent" "Munich" 100477049   # no key needed — data-layer check
pnpm run analyze "ai engineer werkstudent" "Munich" 100477049   # needs the key (see below)
pnpm run agent                                                  # the ReAct loop (the model drives the tools)
```
> `analyze` / `agent` read `OPENROUTER_API_KEY`. Either `export OPENROUTER_API_KEY=...` first, or run with Node's env loader: `node --env-file=.env --import tsx src/analyze.ts ...` (Node 20.6+).
> **Free-tier rate limits:** OpenRouter free models cap at ~20 req/min (+ a daily cap). `analyze` reads postings sequentially, so it stays under it; if you hit a `429`, slow down or drop `:free` (the paid `openai/gpt-oss-120b` is still cheap). Swap models any time via `JOB_AGENT_MODEL` or `src/model.ts`.

## Files
| File | Role |
|---|---|
| `src/model.ts` | **Provider/model in one place** — OpenRouter + `gpt-oss-120b:free` (swap here) |
| `src/sources.ts` | Data layer — arbeitnow + LinkedIn guest + `fetchDescription` (no deps beyond built-in `fetch`) |
| `src/skills.ts` | Canonical skill vocabulary + Zod extraction schema |
| `src/extractSkills.ts` | `generateObject` — JD → normalized skills |
| `src/roadmap.ts` | Join table: market skill → your sprint coverage (covered/partial/gap) + live read of `Concepts/` |
| `src/analyze.ts` | **Deterministic pipeline** → the ranked top-skills-vs-roadmap table |
| `src/agent.ts` | **ReAct loop** — `generateText` + `tool()` + `stopWhen: stepCountIs()`; the model orchestrates |
| `src/fetch.ts` | No-key CLI to list live jobs (no API spend) |

## The pipeline
```
searchJobs (arbeitnow + linkedin-guest)  →  fetchDescription(jobId)
   →  extractSkills(jd)  [LLM, Zod]       →  tally per-skill demand
   →  matchRoadmap(counts)                →  ranked report + high-demand gaps
```
`analyze.ts` runs these as a fixed pipeline (reproducible). `agent.ts` exposes the same four as **tools** and lets the model decide the trajectory (the ReAct version).

## Build-out path (matches your sprints)
- **Now (Sprint 1):** this — TS + AI SDK v6 tool-calling on a free model. ✅
- **Sprint 2 (July):** re-implement `agent.ts` as a **LangGraph** ReAct agent (Python) with a vector store over your `Concepts/` notes, checkpointing, a cost budget, and an **eval set** (hand-labeled skills vs extracted). Same agent, two stacks = a built-in before/after blog post.
- **Optional:** add `searchAdzuna()` (official API) to `sources.ts` as the robust primary source.
