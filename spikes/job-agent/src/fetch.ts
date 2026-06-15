// No-key data-layer check: lists live jobs without touching the LLM (no API spend).
//   pnpm fetch "ai engineer werkstudent" "Munich" 100477049
import { searchAll } from "./sources";

const [, , KW = "ai engineer werkstudent", LOC = "Munich", GEO = "100477049"] = process.argv;

const jobs = await searchAll(KW, LOC, GEO);
console.log(`\n🔎 "${KW}" near ${LOC} (geoId ${GEO}) — ${jobs.length} jobs\n`);
for (const j of jobs) {
  console.log(`• [${j.source}] ${j.title} — ${j.company} (${j.location})${j.url ? `\n   ${j.url}` : ""}`);
}
console.log(`\nNext: pnpm run analyze (extract skills + map to your roadmap) — needs OPENROUTER_API_KEY.`);
