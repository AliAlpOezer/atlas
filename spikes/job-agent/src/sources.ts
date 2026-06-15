// Job-market data layer — PUBLIC sources only. No login, no credentials, EVER.
// (Ported from the verified fetchJobs.mjs; adds fetchDescription.)
// ⚖️  No proxy/UA rotation, no CAPTCHA solving. On 429/999 we back off, never evade.

export interface Job {
  source: string;
  jobId?: string | null;
  title: string;
  company: string;
  location: string;
  remote?: boolean;
  tags?: string[];
  url: string | null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const decode = (s: string): string =>
  s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));

const clean = (s?: string): string =>
  s ? decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim() : "";

export async function fetchArbeitnow(): Promise<Job[]> {
  const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
  if (!res.ok) throw new Error(`arbeitnow HTTP ${res.status}`);
  const { data } = (await res.json()) as { data: any[] };
  return data.map((j) => ({
    source: "arbeitnow",
    title: j.title,
    company: j.company_name,
    location: j.location,
    remote: j.remote,
    tags: j.tags ?? [],
    url: j.url,
  }));
}

function parseLinkedInCards(html: string): Job[] {
  const cards: Job[] = [];
  for (const b of html.split(/<li[\s>]/).slice(1)) {
    const id = (b.match(/data-entity-urn="urn:li:jobPosting:(\d+)"/) || [])[1];
    const title = (b.match(/base-search-card__title"[^>]*>([\s\S]*?)<\//) || [])[1];
    const company = (b.match(/base-search-card__subtitle"[\s\S]*?>([\s\S]*?)<\//) || [])[1];
    const location = (b.match(/job-search-card__location"[^>]*>([\s\S]*?)<\//) || [])[1];
    if (id || title) {
      cards.push({
        source: "linkedin-guest",
        jobId: id ?? null,
        title: clean(title),
        company: clean(company),
        location: clean(location),
        url: id ? `https://www.linkedin.com/jobs/view/${id}/` : null,
      });
    }
  }
  return cards;
}

export async function searchLinkedInGuest(
  keywords: string, location: string, geoId: string, opts: { pages?: number } = {},
): Promise<Job[]> {
  const pages = opts.pages ?? 1;
  const out: Job[] = [];
  for (let p = 0; p < pages; p++) {
    const url =
      `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?` +
      `keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}` +
      (geoId ? `&geoId=${geoId}` : "") + `&start=${p * 25}`;
    const res = await fetch(url, { headers: { "User-Agent": "personal-job-research" } });
    if (res.status === 429 || res.status === 999) {
      console.warn(`⚠️  LinkedIn rate-limited (HTTP ${res.status}). Backing off — not evading.`);
      break;
    }
    if (!res.ok) { console.warn(`⚠️  LinkedIn HTTP ${res.status}`); break; }
    out.push(...parseLinkedInCards(await res.text()));
    await sleep(2500);
  }
  return out;
}

/** Fetch a single posting's description text from the PUBLIC guest endpoint (no auth). */
export async function fetchDescription(jobId: string): Promise<string> {
  const res = await fetch(
    `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`,
    { headers: { "User-Agent": "personal-job-research" } },
  );
  if (!res.ok) return "";
  const html = await res.text();
  const m = html.match(/show-more-less-html__markup[^>]*>([\s\S]*?)<\/div>/);
  return clean(m ? m[1] : html).slice(0, 6000);
}

export const dedupe = (jobs: Job[]): Job[] => {
  const seen = new Set<string>();
  return jobs.filter((j) => {
    const k = `${(j.title || "").toLowerCase()}|${(j.company || "").toLowerCase()}`;
    return seen.has(k) ? false : (seen.add(k), true);
  });
};

export const isAiish = (j: Job): boolean =>
  /a\.?i\b|ml\b|machine learning|llm|genai|nlp|data scien/i.test(
    `${j.title} ${(j.tags || []).join(" ")}`,
  );

/** Search both sources, filter to AI-ish roles, dedupe. */
export async function searchAll(keywords: string, location: string, geoId: string): Promise<Job[]> {
  const [an, li] = await Promise.allSettled([
    fetchArbeitnow(),
    searchLinkedInGuest(keywords, location, geoId, { pages: 1 }),
  ]);
  return dedupe([
    ...(an.status === "fulfilled" ? an.value.filter(isAiish) : []),
    ...(li.status === "fulfilled" ? li.value : []),
  ]);
}
