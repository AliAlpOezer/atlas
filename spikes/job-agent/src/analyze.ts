// Deterministic pipeline → live ranked "skills the Munich market wants vs. your roadmap".
//   pnpm analyze "ai engineer werkstudent" "Munich" 100477049 8
import { searchAll, fetchDescription } from "./sources";
import { extractSkills } from "./extractSkills";
import { matchRoadmap, listConcepts, type DemandRow } from "./roadmap";
import { assertKey } from "./model";
import type { CanonicalSkill } from "./skills";

const [, , KW = "ai engineer werkstudent", LOC = "Munich", GEO = "100477049", N = "8"] = process.argv;
const TOP_N = Number(N);

assertKey();

const jobs = await searchAll(KW, LOC, GEO);
const withId = jobs.filter((j) => j.jobId).slice(0, TOP_N);
console.log(`\n🔎 "${KW}" near ${LOC} — ${jobs.length} jobs; reading ${withId.length} descriptions…\n`);

const mentions = new Map<CanonicalSkill, number>();
const required = new Map<CanonicalSkill, number>();
let analyzed = 0;

for (const j of withId) {
  const jd = await fetchDescription(j.jobId!);
  if (!jd) continue;
  const skills = await extractSkills(j.title, jd);
  analyzed++;
  const seen = new Set<CanonicalSkill>();
  for (const s of skills) {
    if (seen.has(s.canonical)) continue; // count each skill once per posting
    seen.add(s.canonical);
    mentions.set(s.canonical, (mentions.get(s.canonical) ?? 0) + 1);
    if (s.required) required.set(s.canonical, (required.get(s.canonical) ?? 0) + 1);
  }
  console.log(`  ✓ ${j.title} — ${j.company}`);
}

const rows: DemandRow[] = [...mentions.entries()].map(([skill, m]) => ({
  skill, mentions: m, required: required.get(skill) ?? 0,
}));
const ranked = matchRoadmap(rows);
const icon: Record<string, string> = { covered: "✅", partial: "⚠️", gap: "❌" };

console.log(`\n📊 Skill demand across ${analyzed} Munich postings:\n`);
console.log("   # | skill                  | jobs | req | your plan");
console.log("  ---|------------------------|------|-----|----------");
ranked.forEach((r, i) => {
  console.log(
    `  ${String(i + 1).padStart(2)} | ${r.skill.padEnd(22)} | ${String(r.mentions).padStart(4)} | ` +
    `${String(r.required).padStart(3)} | ${icon[r.status]} ${r.where}`,
  );
});

const gaps = ranked.filter((r) => r.status === "gap" && r.skill !== "other" && r.mentions > 0);
if (gaps.length) console.log(`\n⚠️  High-demand GAPS vs your plan: ${gaps.map((g) => g.skill).join(", ")}`);
console.log(`🧠 Vault concept spine: ${listConcepts().length} notes detected.\n`);
