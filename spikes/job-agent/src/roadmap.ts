import { readdirSync } from "node:fs";
import type { CanonicalSkill } from "./skills";

export type Coverage = { status: "covered" | "partial" | "gap"; where: string };

// Curated from the AI-Engineer roadmap + the Munich market analysis. Edit as the plan evolves —
// this is the join table between "what the market wants" and "what your sprint plan teaches".
export const ROADMAP_COVERAGE: Record<CanonicalSkill, Coverage> = {
  python: { status: "covered", where: "Drills W1–16 (you already know it)" },
  typescript: { status: "covered", where: "Sprint 1 — Atlas UI" },
  "llm-apis": { status: "covered", where: "Sprint 1 W1" },
  rag: { status: "covered", where: "Sprint 2 (Sage) — whole sprint" },
  "prompt-engineering": { status: "covered", where: "Sprint 1 W2" },
  "langchain-langgraph": { status: "covered", where: "Sprint 2 W7" },
  agents: { status: "covered", where: "Sprint 1–2" },
  "tool-use": { status: "covered", where: "Sprint 1 W2" },
  pytorch: { status: "covered", where: "Sprint 3 (Aug) — late" },
  "deep-learning": { status: "covered", where: "Sprint 3" },
  nlp: { status: "covered", where: "Sprint 1/3 (transformers)" },
  "fine-tuning": { status: "covered", where: "Sprint 4 (Sep) — late" },
  huggingface: { status: "covered", where: "Sprint 4" },
  "vector-databases": { status: "covered", where: "Sprint 2 (Qdrant/pgvector)" },
  evals: { status: "covered", where: "Sprint 1 W3 ⭐ + RAGAS S2 (your differentiator)" },
  docker: { status: "partial", where: "Qdrant S2, FastAPI S4 — light" },
  "cloud-azure": { status: "gap", where: "NOT in plan — Munich enterprise is Azure-heavy; add a deploy" },
  "cloud-aws": { status: "gap", where: "NOT in plan" },
  "cloud-gcp": { status: "gap", where: "NOT in plan" },
  sql: { status: "partial", where: "pgvector touches Postgres only" },
  "pandas-numpy-sklearn": { status: "partial", where: "NumPy S3 prep; pandas/sklearn light" },
  git: { status: "covered", where: "daily" },
  "computer-vision": { status: "gap", where: "deliberately cut" },
  multimodal: { status: "gap", where: "deliberately cut (asked by some Munich roles)" },
  mlops: { status: "gap", where: "explicitly cut to backlog" },
  other: { status: "gap", where: "unmapped — inspect the raw phrase" },
};

const CONCEPTS_DIR =
  process.env.CONCEPTS_DIR ?? "C:/Users/AliAlpOezer/dev/ai-sprint-vault/Concepts";

/** Live read of your vault's concept spine — a freshness signal (graceful if absent). */
export function listConcepts(): string[] {
  try {
    return readdirSync(CONCEPTS_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export interface DemandRow {
  skill: CanonicalSkill;
  mentions: number;
  required: number;
}

export function matchRoadmap(rows: DemandRow[]) {
  return rows
    .map((r) => ({ ...r, ...ROADMAP_COVERAGE[r.skill] }))
    .sort((a, b) => b.mentions - a.mentions);
}
