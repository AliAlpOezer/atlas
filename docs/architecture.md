# Architecture

> Placeholder — the real diagram lands Day 19 (Sun Jun 28), drawn in [Excalidraw](https://excalidraw.com) and embedded here as a PNG/SVG.

## v1 components (to diagram)

- **UI:** Next.js App Router, streaming chat, model switcher, cost meter, tool-step display.
- **Core:** Vercel AI SDK v6 agent loop; provider abstraction (Claude + 1 other); structured-output validation.
- **Tools:** web search (Tavily), utility/calculator, data lookup — each with timeout + error recovery.
- **Guardrails:** prompt-injection defense on tool inputs/outputs; not trusting model output.
- **Evals:** `evals/` assertion + judge suite, run in CI; scorecard artifact.
- **Observability:** LangSmith tracing on every request.

## Data flow (one turn)

`user → system+history → model → [tool calls ↔ tools] → final stream → cost meter → trace → (eval in CI on a fixed case set)`
