import { z } from "zod";

// Canonical skill vocabulary — extraction normalizes every posting's wording to one of these,
// so demand is tally-able and joinable to your roadmap coverage (see roadmap.ts).
export const CANONICAL_SKILLS = [
  "python", "typescript", "llm-apis", "rag", "prompt-engineering", "langchain-langgraph",
  "agents", "tool-use", "pytorch", "deep-learning", "nlp", "fine-tuning", "huggingface",
  "vector-databases", "evals", "docker", "cloud-azure", "cloud-aws", "cloud-gcp", "sql",
  "pandas-numpy-sklearn", "git", "computer-vision", "multimodal", "mlops", "other",
] as const;
export type CanonicalSkill = (typeof CANONICAL_SKILLS)[number];

export const SkillExtraction = z.object({
  skills: z.array(
    z.object({
      canonical: z.enum(CANONICAL_SKILLS),
      raw: z.string().describe("the exact phrase used in the posting"),
      required: z.boolean().describe("true if a hard requirement; false if nice-to-have"),
    }),
  ),
});
export type ExtractedSkill = z.infer<typeof SkillExtraction>["skills"][number];
