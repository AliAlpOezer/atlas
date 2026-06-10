# Python Drills

Daily 30–45 min Python katas (Sprint 1: weeks 1–3). **Hand-written solutions only** — AI generates the exercise and reviews for JS-isms, never writes the answer (see [`../PROTOCOL.md`](../PROTOCOL.md)).

## Checkpoints
- **End of Week 1:** write a tested 100-line Python script unaided.
- **End of Week 2:** functions/closures/decorators/generators comfortable.
- **End of Week 3:** re-implement the Atlas eval runner in Python unaided (Day 17).

## Sequence
- **W1:** tooling (`uv`/venv/ipython), core syntax, collections + comprehensions, exceptions/context managers, type hints + `dataclass`, pydantic↔Zod. Milestone Day 03: port your TS retry/backoff helper with `pytest`.
- **W2:** functions deep (`*args`/`**kwargs`, mutable-default trap), closures/late-binding, decorators, modules/`__main__`, generators.
- **W3:** classes + dunder (`__call__`, `__getitem__`), context managers, `pathlib`/`json`/`httpx`. Milestone Day 17: Python eval runner.

## Gotchas deck (add as you hit them)
mutable default args · late-binding closures · `is` vs `==` · `//` vs `/` · shallow vs deep copy · truthiness of `[]`/`0`/`None` · shadowing stdlib names
