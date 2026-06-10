# Develop-AI-with-AI Protocol

The contract that keeps AI assistance from hollowing out understanding. Every file belongs to a class.

## Classes

- **Class A — from-scratch (AI in editor FORBIDDEN).** Not present in *this* repo (Atlas is a product), but applies to the Sprint 3 GPT repo: micrograd, attention/MHA, build-GPT, minbpe, the canonical PyTorch training loop, backprop derivations. Hand-typed in the **"Scratch"** VS Code profile (all AI extensions disabled), closed-book rebuild required, 25-minute solo-debug rule.
- **Class B — production (AI REQUIRED).** Everything in this repo: the Next.js app, tools, eval harness, serving glue. Build it *with* Claude Code at production speed — that **is** the skill being practiced.
- **Class C — glue (AI fully delegated).** Configs, Dockerfiles, CI yaml, data scripts. Zero ceremony.

## Class B guardrails (this repo)

1. **Explain-or-delete.** Any AI-written line you cannot explain in your own self-review gets deleted and rewritten.
2. **2-minute self-review** comment per merged change: what it does + what you'd watch in prod.
3. **Commit tags:** `[hand]`, `[ai]`, `[hand+ai]` on every commit subject. Glance at the ratio each Tuesday.

## Python drills (daily)

AI **generates** exercises and **reviews for JS-isms** ("flag `for i in range(len(x))`, camelCase, mutation-while-iterating, missed comprehensions/context managers"). AI **never writes the answer** — you hand-write every drill solution.

## Eval sets & synthetic data = deliberate practice, not cheating

AI **drafts** candidate cases → **you hand-curate and hand-label all ground truth** (labeling is where task understanding lives — never delegated) → AI runs as **judge** → you **audit a 20% sample** of judge verdicts every run and track judge–human agreement.

## Weekly explain-back exam (Tuesdays, blocks progression)

> "Quiz me Socratically on [this week's topics]. Never reveal an answer first. Press follow-ups until I derive it or admit I can't. Include 30% questions from 2+ weeks ago. Grade each topic 1–5; refuse to pass hand-waving."

Pass bar = **4/5 on every core topic**. Failed topic → +5 flashcards, re-examined next week. Failed twice → next Tuesday re-studies it; one cut-first stretch item is dropped to pay for it.

## Honesty log

One line per day in [`NOTES.md`](NOTES.md): what AI did vs what you did. If a week's log shows AI creeping into Class A or into labeling, next week's first drill block is a no-AI rebuild of the affected piece.
