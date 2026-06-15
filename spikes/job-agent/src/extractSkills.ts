import { generateObject, NoObjectGeneratedError } from "ai";
import { model } from "./model";
import { CANONICAL_SKILLS, SkillExtraction, type ExtractedSkill } from "./skills";

export async function extractSkills(title: string, jd: string): Promise<ExtractedSkill[]> {
  if (!jd.trim()) return [];
  const prompt =
    `Extract the technical skills, tools, and frameworks this job posting demands. ` +
    `Map each to the closest canonical value from: ${CANONICAL_SKILLS.join(", ")}. ` +
    `Use "other" only if nothing fits. Mark required=true only for hard requirements.\n\n` +
    `TITLE: ${title}\n\nPOSTING:\n${jd}`;

  // Free OpenRouter routes occasionally return a reasoning-only, empty response
  // (content: null) → NoObjectGeneratedError. Retry a couple of times, then skip this
  // posting rather than aborting the whole run.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { object } = await generateObject({ model, schema: SkillExtraction, prompt });
      return object.skills;
    } catch (err) {
      if (!NoObjectGeneratedError.isInstance(err)) throw err;
      if (attempt === 3) {
        console.warn(`  ⚠️  skipped "${title}" — model returned no usable object after ${attempt} tries`);
        return [];
      }
    }
  }
  return [];
}
