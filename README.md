# Atlas

> A production tool-using AI assistant — and release **v1** of an evolving product that becomes a hybrid-search RAG + agent system (**Sage**, v2) and finally routes calls to a self-fine-tuned model served on vLLM (v3). Built in public over a 16-week AI-engineering sprint (Jun 10 – Oct 1, 2026).

**Status:** 🚧 Week 1 — scaffolding. Follow the build in [`LOG.md`](LOG.md).

## What this is

Atlas is a streaming, multi-provider LLM assistant that calls real tools, returns typed structured output, and — critically — ships with an **evaluation suite that runs in CI**. Every release carries a scorecard, and the numbers visibly improve across v1 → v2 → v3. That longitudinal eval story is the point.

## Planned architecture (v1)

```
Next.js (App Router) + Vercel AI SDK v6
  ├─ streaming chat UI + model switcher (Claude + 1 other provider)
  ├─ live cost meter (per-message tokens + $)
  ├─ tools: web search · utility · data lookup  (with error recovery)
  ├─ guardrails: prompt-injection defense, structured-output validation
  └─ evals/: assertion + LLM-judge suite, run in CI, scorecard committed
        observability: LangSmith tracing
```

A diagram lands in [`docs/architecture.md`](docs/architecture.md) by end of Week 1's sprint.

## Roadmap

This repo is **repo #1** of three. The full plan: [`AI-Engineer-Roadmap-16-Weeks.md`](../../Downloads/AI-Engineer-Roadmap-16-Weeks.md). The detailed Sprint 1 plan driving daily commits: [`docs/sprint-1-plan.md`](docs/sprint-1-plan.md).

| Release | Target | Adds |
|---|---|---|
| **v1.0 "Atlas"** | Jun 30 | Tool-using assistant + eval suite in CI + tracing + cost meter |
| **v2.0 "Sage"** | Jul 28 | Hybrid-search RAG with citations + LangGraph agent mode |
| **v3.0 capstone** | Sep 29 | Routes selected calls to a self-fine-tuned model on vLLM |

## Run it

> Scaffolding lands Day 04 (Sat Jun 13). Until then this section is a placeholder.

```bash
pnpm install
cp .env.local.example .env.local   # add ANTHROPIC_API_KEY + one other provider
pnpm dev
```

## How this was built

Built with an explicit AI-assistance contract — see [`PROTOCOL.md`](PROTOCOL.md). Commits are tagged `[hand]` / `[ai]` / `[hand+ai]` for transparency. Learning notes live in [`NOTES.md`](NOTES.md).

## License

MIT — see [`LICENSE`](LICENSE).
