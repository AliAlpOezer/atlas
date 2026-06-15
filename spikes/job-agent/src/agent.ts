// The ReAct version: the model orchestrates the tools itself (AI SDK v6 tool-calling loop).
// This is the Sprint-1 learning artifact — compare its trajectory to analyze.ts's fixed pipeline.
//   pnpm run agent   (or: pnpm run agent "your own goal sentence")
import { generateText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { model, assertKey } from "./model";
import { searchAll, fetchDescription } from "./sources";
import { extractSkills } from "./extractSkills";
import { matchRoadmap, type DemandRow } from "./roadmap";
import { CANONICAL_SKILLS } from "./skills";

const [, , GOAL =
  'Find Munich "ai engineer werkstudent" roles, extract the demanded skills, and report the top skills with how each maps to my sprint roadmap.'] = process.argv;

assertKey();

const tools = {
  searchJobs: tool({
    description: "Search PUBLIC job sources (arbeitnow + LinkedIn guest) for AI roles. Returns up to 8 jobs with jobId/title/company/location.",
    inputSchema: z.object({
      keywords: z.string(),
      location: z.string().default("Munich"),
      geoId: z.string().default("100477049"),
    }),
    execute: async ({ keywords, location, geoId }) => {
      const jobs = await searchAll(keywords, location, geoId);
      return jobs.filter((j) => j.jobId).slice(0, 8)
        .map((j) => ({ jobId: j.jobId, title: j.title, company: j.company, location: j.location }));
    },
  }),
  fetchDescription: tool({
    description: "Fetch the full text of ONE job posting by its jobId (public guest endpoint, no auth).",
    inputSchema: z.object({ jobId: z.string() }),
    execute: async ({ jobId }) => (await fetchDescription(jobId)).slice(0, 4000) || "(no description available)",
  }),
  extractSkills: tool({
    description: `Extract normalized skills from one posting. Canonical skills: ${CANONICAL_SKILLS.join(", ")}.`,
    inputSchema: z.object({ title: z.string(), description: z.string() }),
    execute: async ({ title, description }) => extractSkills(title, description),
  }),
  matchRoadmap: tool({
    description: "Join per-skill mention counts to the user's sprint roadmap. Returns covered/partial/gap + where.",
    inputSchema: z.object({
      demand: z.array(z.object({
        skill: z.enum(CANONICAL_SKILLS),
        mentions: z.number(),
        required: z.number(),
      })),
    }),
    execute: async ({ demand }) => matchRoadmap(demand as DemandRow[]),
  }),
};

const { text, steps } = await generateText({
  model,
  tools,
  stopWhen: stepCountIs(20),
  prompt:
    `${GOAL}\n\n` +
    `Approach: call searchJobs once; then for the top ~5 jobs, call fetchDescription and extractSkills. ` +
    `Tally how many postings mention each canonical skill, call matchRoadmap once with those totals, ` +
    `then write a ranked top-10 with each skill's roadmap coverage and call out any high-demand gaps.`,
});

console.log(`\n🤖 ReAct agent finished in ${steps.length} steps.\n`);
console.log(text);
