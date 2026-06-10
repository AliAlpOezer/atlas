# Evals — the standing definition-of-done

No release ships without its eval suite running in CI and a before/after scorecard. Built in Week 3; reused and extended at every later release (RAGAS in Sprint 2, base-vs-tuned in Sprint 4, full-system in the capstone).

## Files (land in Week 3)
- `SPEC.md` — Day 15: what "good" means; the 4 assertion types (exact / contains / JSON-valid / judge).
- `cases.jsonl` — Day 16: 20–50 **hand-labeled** cases (happy-path, tool-error, injection attempt).
- `runner.py` — Day 17: the eval runner (Python — drill milestone), or a TS equivalent wired to CI.
- `scorecard.md` — generated each CI run; the first entry in the program-long eval story.

## Method (see [`../PROTOCOL.md`](../PROTOCOL.md))
AI drafts cases → **you hand-label all ground truth** → AI judges → **you audit 20% of verdicts** every run and track judge–human agreement.
