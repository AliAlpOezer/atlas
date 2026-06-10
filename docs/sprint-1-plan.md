# Sprint 1 — Atlas v1: Detailed Day-by-Day Plan (Weeks 1–3)

**Dates:** Wed Jun 10 → Tue Jun 30, 2026 · **Budget:** ~105 h · **Language:** TypeScript (Python drills daily)
**Outcome:** `atlas` v1.0 tagged — a deployed tool-using assistant with a CI eval suite, tracing, prompt caching, injection guardrails, and a live cost meter feeding a longitudinal scorecard. Plus blog post #1.

> This expands Sprint 1 of [`AI-Engineer-Roadmap-16-Weeks.md`](../../../Downloads/AI-Engineer-Roadmap-16-Weeks.md) into 21 daily entries, each with a block schedule, a **commit target**, and a **done-when** check. One commit per day, minimum. Falling behind is repaid on Tuesday — never by cutting sleep or blowing past 7 h.

## The daily block skeleton (~6 h)

| Block | Time | Purpose |
|---|---|---|
| Warm-up | 0:15 | Anki review + reread yesterday's NOTES paragraph + confirm today's one target |
| Study | 1:45 | Exactly one resource, consumed actively |
| Drill | 0:40 | Python kata (W1–3) — AI generates, **you hand-write the solution** |
| Build | 2:30 | The day's committed artifact |
| Consolidate | 0:50 | NotebookLM + NOTES paragraph (no AI) + 3–5 flashcards + tomorrow's plan |

**Mon = SHIP day** (Study→second Build). **Tue = consolidation + buffer** (lighter, no new material, weekly explain-back exam).

## The "develop AI with AI" rule for this sprint

Atlas is **Class B** (production) — build it *with* Claude Code at full speed. Two guardrails: **explain-or-delete** (any AI line you can't explain is deleted and rewritten) and a 2-minute self-review comment per merged change. Python drills are **hand-written** — AI generates exercises and reviews for JS-isms, but never writes the answer. Tag commits `[hand]` / `[ai]` and log one honesty line/day in `NOTES.md`. See [`PROTOCOL.md`](../PROTOCOL.md).

---

# Week 1 (Jun 10–16) — LLM mental model + Atlas v0 ships

**Goal:** own the mental model (tokens, sampling, attention at a high level, cost) and get a streaming, model-switching Atlas live on Vercel with a verified cost meter.

### Day 01 — Wed Jun 10 — Setup + Karpathy Intro + first API calls
- **Morning pre-flight (2 h):** verify Node 20+/pnpm/Python 3.11+uv/Docker/WSL2; create the two VS Code profiles (**"Scratch"** = all AI off, **"AI-on"**); create all free accounts (Anthropic, OpenAI, Google AI Studio, HF, LangSmith, Colab, Kaggle, W&B); collect API keys into a password manager; `.env.local` ready.
- **Study (1:45):** Karpathy [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g) (1 h) — write down 10 terms you can't yet explain.
- **Drill (0:40):** `uv` + venv + ipython; first `.py`; have AI generate a **TS↔Python contrast table**, annotate it yourself.
- **Build (1:30, shortened today):** first 5 Claude API calls in TS with [`@anthropic-ai/sdk`](https://docs.anthropic.com/en/api/client-sdks) in `spikes/`.
- **Consolidate (0:50):** NOTES day-01 paragraph + the 10 terms; first flashcards.
- **Commit:** `day 01: env + first Claude API calls + 10-terms note [hand]`
- **Done when:** an API call returns text from your machine; 10 terms listed; accounts + keys working.

### Day 02 — Thu Jun 11 — Deep Dive + tokenization & cost
- **Study (1:45 + spillover):** Karpathy [Deep Dive into LLMs](https://www.youtube.com/watch?v=7xTGNNLPyMI) (3.5 h at 1.5×, finish over Study + part of Build).
- **Drill (0:40):** core syntax — variables, f-strings, truthiness gotchas (`[]`, `0`, `None`), `if/for/while`.
- **Build (2:30):** play with [Tiktokenizer](https://tiktokenizer.vercel.app); **hand-compute the cost of a 10k-token prompt across 3 models** (Claude Haiku-class, GPT-mini-class, Gemini Flash-class) → `spikes/token-cost.md` with the math shown.
- **Commit:** `day 02: tokenization + cost math across 3 models [hand]`
- **Done when:** you can explain what a token is and produce a correct $/call estimate by hand.

### Day 03 — Fri Jun 12 — Attention (concept) + sampling + drill milestone
- **Study (1:45):** Jay Alammar [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) — sketch the attention flow by hand (keep the sketch).
- **Drill (0:40) ⭐ milestone:** port your real TS **retry/backoff helper** to Python with `pytest` tests → `drills/week-1/retry.py` + `test_retry.py`.
- **Build (2:30):** sampling experiments — same prompt at temp 0 vs 1.0, top-p sweeps, stop sequences → `spikes/sampling.md` with observations.
- **Commit:** `day 03: sampling experiments + python retry port with tests [hand]`
- **Done when:** `pytest` is green; you can state in one line what temperature and top-p actually do.

### Day 04 — Sat Jun 13 — BUILD: scaffold Atlas v0
- **Build-first (5 h):** scaffold **Atlas v0** *with Claude Code*: Next.js + [AI SDK v6](https://ai-sdk.dev) streaming chat, a **model switcher** (Claude + one other provider). Get it running locally, then deploy to Vercel.
- **Study (1:00):** AI SDK v6 core docs (streaming, providers) as you build.
- **Drill (0:20, light):** list/dict/set comprehensions.
- **Commit:** `day 04: scaffold Atlas v0 — streaming chat + model switcher [ai]`
- **Done when:** streaming chat works locally against two providers and the app builds clean.

### Day 05 — Sun Jun 14 — BUILD: live cost meter
- **Build-first (4:30):** wire a **live cost meter** (per-message token counts + running $ cost), hand-verified against your Day-02 math; basic system prompt support.
- **Study (1:00):** AI SDK provider/usage metadata docs.
- **Drill (0:20, light):** exceptions + a first `with` context manager.
- **Commit:** `day 05: live cost meter wired into chat UI [ai]`
- **Done when:** the UI shows accurate per-message cost matching your manual estimate within rounding.

### Day 06 — Mon Jun 15 — SHIP: Atlas v0 live
- **Build (5 h):** deploy to Vercel (env vars, edge/runtime config); write the first README section; **tag `v0`**.
- **Drill (0:20):** type hints + `dataclass`.
- **Commit:** `day 06: deploy Atlas v0 to Vercel; README v0` → then `git tag v0`
- **Done when:** a public Vercel URL streams responses with the cost meter live.

### Day 07 — Tue Jun 16 — BUFFER: consolidate + explain-back #1
- **Lighter day (~4 h, no new material):** NotebookLM *S1* notebook — add both Karpathy videos + Illustrated Transformer → Study Guide + Audio Overview (queue for a walk). Clear flashcard backlog. **Explain-back exam #1** (tokens, sampling params, cost math, attention concept) — AI quizzes Socratically, grade 1–5, target 4/5.
- **Drill (0:30):** pydantic ↔ Zod mapping.
- **Commit:** `day 07: week-1 consolidation + explain-back #1 [hand]`
- **Done when:** explain-back ≥4/5 on every term; Week-2 plan written in `NOTES.md`.

**▶ Week 1 milestone:** Atlas v0 live on Vercel (streaming, model switcher, verified cost meter); Python drill streak at 7 days; mental model solid.

---

# Week 2 (Jun 17–23) — Prompting done formally + multi-tool orchestration

**Goal:** finish the one formal prompting resource; turn Atlas into a real tool-using assistant (3+ tools, recovery, streamed steps).

### Day 08 — Wed Jun 17 — Prompt tutorial ch. 1–5
- **Study (1:45):** Anthropic [Prompt Engineering Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) ch. 1–5 (clone, run locally; swap in a current cheap model id). Fast-path output-formatting chapters — you already ship Zod-validated output.
- **Drill (0:40):** functions deep — `*args`/`**kwargs` + the **mutable-default-arg trap**.
- **Build (2:30):** apply techniques to Atlas's system prompts; start `docs/prompt-patterns.md`.
- **Commit:** `day 08: prompt tutorial ch1-5; prompt-patterns draft [hand]`
- **Done when:** you can name and give an example of 5 prompt techniques.

### Day 09 — Thu Jun 18 — Prompt tutorial ch. 6–9 + cheat-sheet
- **Study (1:45):** tutorial ch. 6–9 + appendix (CoT, avoiding hallucination, complex prompts). [DAIR.AI guide](https://www.promptingguide.ai) → NotebookLM reference only.
- **Drill (0:40):** closures, late-binding gotcha, decorators as higher-order functions.
- **Build (2:30):** finish `docs/prompt-patterns.md` (your personal cheat-sheet) + 3–4 system-prompt personas.
- **Commit:** `day 09: prompt-patterns cheat-sheet + persona prompts [hand]`
- **Done when:** the cheat-sheet is good enough to reuse without the tutorial open.

### Day 10 — Fri Jun 19 — Tool use foundations (start at multi-tool)
- **Study (1:45):** [Anthropic tool-use docs](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview) + [AI SDK v6 tool calling / ToolLoopAgent](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling). Skip the single-tool hello world.
- **Drill (0:40):** modules/imports/`__main__`, generators vs JS generators.
- **Build (2:30):** implement the first real tool (web search via Tavily free tier) end-to-end.
- **Commit:** `day 10: first tool (web search) wired through the agent loop [ai]`
- **Done when:** the model calls the tool and uses its result in a streamed answer.

### Day 11 — Sat Jun 20 — BUILD: 3+ tools + recovery
- **Build-first (5 h):** add a utility/calculator tool and a data-lookup tool; tool-choice control; parallel calls; **tool-error recovery**; stream intermediate steps to the UI.
- **Study (1:00):** [Anthropic cookbook](https://github.com/anthropics/anthropic-cookbook) tool examples.
- **Drill (0:20, light):** `pathlib` basics.
- **Commit:** `day 11: 3 tools + error recovery + streamed intermediate steps [ai]`
- **Done when:** Atlas calls ≥3 tools, survives a forced tool failure, and shows steps in the UI.

### Day 12 — Sun Jun 21 — Agents mental model + system-prompt library
- **Study (1:45):** Anthropic [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) — read **twice** (it's the Sprint 2 mental model).
- **Build (2:30):** finalize the system-prompt library; persona/task switching in the UI.
- **Drill (0:20, light):** `json` + `httpx` vs `fetch`.
- **Commit:** `day 12: system-prompt library + agents reading notes [hand]`
- **Done when:** you can explain the workflow-vs-agent distinction in your own words.

### Day 13 — Mon Jun 22 — SHIP: tool-using assistant
- **Build (5 h):** UX polish on tool runs; release the tool-using build; record short demo clips of each tool.
- **Drill (0:20):** light review.
- **Commit:** `day 13: tool-using assistant milestone + demos`
- **Done when:** a clean end-to-end demo of all 3 tools recorded.

### Day 14 — Tue Jun 23 — BUFFER: consolidate + explain-back #2 (+ flex half-day)
- **Flex half-day (~2.5 h, afternoon off):** NotebookLM Study Guide/FAQ; **explain-back #2** (prompt techniques, tool-use flow, agent mental model) — include 30% Week-1 questions.
- **Drill (0:30):** Python gotchas flashcards (mutable defaults, late binding, `is` vs `==`, `//` vs `/`).
- **Commit:** `day 14: week-2 consolidation + explain-back #2 [hand]`
- **Done when:** explain-back ≥4/5; Week-3 plan written.

**▶ Week 2 milestone:** Atlas calls 3+ tools with recovery and streamed steps; a reusable prompt-patterns cheat-sheet; system-prompt library.

---

# Week 3 (Jun 24–30) — Evals as definition-of-done + harden + ship v1.0

**Goal:** the pro-separating skill. Build the eval harness that becomes the standing definition-of-done for every future release; harden; tag v1.0; publish blog #1.

### Day 15 — Wed Jun 24 — Evals: the mental model
- **Study (1:45):** Hamel Husain [Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/) — read fully, take notes. LLM-as-judge: pairwise vs reference-based ([Anthropic cookbook](https://github.com/anthropics/anthropic-cookbook) eval examples).
- **Drill (0:40):** classes + dunder methods (`__init__`, `__repr__`, `__eq__`).
- **Build (2:30):** design Atlas's main-task eval spec → `evals/SPEC.md` (what "good" means, assertion types).
- **Commit:** `day 15: eval spec + judge-vs-reference notes [hand]`
- **Done when:** you can state your 4 assertion types (exact / contains / JSON-valid / judge) and when each applies.

### Day 16 — Thu Jun 25 — Build the eval set (hand-labeled)
- **Study (1:00):** scan eval-harness patterns; decide LangSmith dataset vs local JSONL.
- **Drill (0:40):** more dunder (`__call__`, `__getitem__` — you'll need these to read PyTorch) + `dataclass`.
- **Build (3:15):** AI **drafts** candidate cases → **you hand-curate and hand-label 20–50** → `evals/cases.jsonl`. Labeling is never delegated.
- **Commit:** `day 16: hand-labeled eval set (N cases) [hand]`
- **Done when:** ≥20 labeled cases covering happy-path, tool-error, and an injection attempt.

### Day 17 — Fri Jun 26 — Tracing + eval runner + CI ⭐ drill milestone
- **Study (1:00):** [LangSmith tracing/eval docs](https://docs.smith.langchain.com).
- **Drill (0:40) ⭐ milestone:** re-implement the eval **runner in Python**, unaided → `evals/runner.py` (proves Week-3 Python checkpoint).
- **Build (3:00):** wire LangSmith tracing into Atlas; eval suite runs in **CI** (GitHub Actions); first **scorecard** generated and committed.
- **Commit:** `day 17: eval runner + LangSmith tracing + CI scorecard [hand+ai]`
- **Done when:** a push runs the eval suite in CI and produces a scorecard artifact.

### Day 18 — Sat Jun 27 — BUILD: harden (only-new production items)
- **Build-first (5 h):** [prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) + its economics; cheap-model-first routing; **prompt-injection guardrails** ([OWASP Top 10 for LLM Apps](https://genai.owasp.org)). Cost meter now feeds the CI scorecard.
- **Study (1:00):** OWASP LLM Top 10 (skim, focus on injection + output handling).
- **Commit:** `day 18: prompt caching + model routing + injection guardrails [ai]`
- **Done when:** the injection case in your eval set is now defended; caching measurably cuts cost in the meter.

### Day 19 — Sun Jun 28 — BUILD: README + architecture + demo
- **Build (4:30):** real README (problem, architecture, run, eval scorecard, what broke); architecture diagram in [Excalidraw](https://excalidraw.com) → `docs/architecture.md`; 2-min Loom demo. **Stretch (only if ahead):** a small **TypeScript MCP server** exposing Atlas's tools ([HF MCP Course](https://huggingface.co/learn/mcp-course)).
- **Drill (0:30, light):** `typing` module + `Protocol`.
- **Commit:** `day 19: README + architecture diagram + demo [hand+ai]`
- **Done when:** a stranger could clone, configure, and run Atlas from the README alone.

### Day 20 — Mon Jun 29 — SHIP: Atlas v1.0 + blog #1
- **Build (5 h):** final polish; **tag `v1.0`**; write + publish **blog post #1**: *"How I built a tool-using AI assistant in TypeScript (and what evals taught me)."*
- **Commit:** `day 20: Atlas v1.0 — eval suite, tracing, caching, guardrails` → then `git tag v1.0`
- **Done when:** `v1.0` tagged, blog published, repo pinned on your GitHub profile.

### Day 21 — Tue Jun 30 — BUFFER: sprint retro + Sprint 2 prep
- **Lighter day (~4 h):** sprint retro in `NOTES.md`; **explain-back #3** (full Sprint 1, 30% from Weeks 1–2). **Pick the Sage corpus** (a doc set you genuinely care about). Confirm Python Week-3 checkpoint passed.
- **Commit:** `day 21: sprint-1 retro + Sage corpus chosen + explain-back #3 [hand]`
- **Done when:** retro written, corpus chosen, Sprint 2 plan drafted.

---

## ▶ Sprint 1 Acceptance (the v1.0 bar)

Atlas v1.0 must: stream responses; switch between ≥2 providers; call **≥3 real tools** with error recovery and streamed intermediate steps; return typed structured output where appropriate; have a **live cost meter**; ship a **20–50 case eval suite (assertions + LLM-judge) running in CI** with **LangSmith tracing**; use prompt caching; defend against the injection case in its eval set. Repo + README + architecture diagram + 2-min demo + **blog post #1**. The CI scorecard is the first entry in the program-long eval story.

## Commit cadence rules
- **One commit per day, minimum** — even buffer days commit `NOTES.md` + flashcards.
- Tag each commit subject with `[hand]`, `[ai]`, or `[hand+ai]`.
- `git tag v0` on Day 06, `git tag v1.0` on Day 20.
- If a day slips below 4 h, log it in `LOG.md` as debt and repay on Day 07 / 14 / 21 — never by cutting sleep.

## Cut-first ladder (if a week overruns)
1. The TypeScript MCP server stretch (Day 19) → drop entirely.
2. The 4th tool / extra UX polish.
3. Reduce eval set to 20 cases (not 50).
4. Architecture diagram → simpler box sketch.
**Never cut:** the eval suite in CI, the cost meter, the injection guardrail, the v1.0 tag, blog #1.
