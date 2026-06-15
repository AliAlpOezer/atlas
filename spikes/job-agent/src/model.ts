// Provider: OpenRouter — FREE model, $0 in/out. Get a free key: https://openrouter.ai/keys
import "dotenv/config"; // auto-loads OPENROUTER_API_KEY from .env in the current dir
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// GPT-OSS-120B (OpenAI open-weight MoE). Natively supports tool use + structured output.
// Override with JOB_AGENT_MODEL to try another OpenRouter model.
export const MODEL_ID = process.env.JOB_AGENT_MODEL ?? "openai/gpt-oss-120b:free";

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY ?? "" });

// `require_parameters: true` tells OpenRouter to only route to providers that actually
// support the params we send (structured output / tools). This skips flaky free routes
// (e.g. OpenInference) that ignore the schema and return reasoning-only, empty responses
// → NoObjectGeneratedError.
export const model = openrouter(MODEL_ID, {
  extraBody: { provider: { require_parameters: true } },
});

export function assertKey(): void {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("✋ Set OPENROUTER_API_KEY (free key: https://openrouter.ai/keys) in .env or your shell.");
    process.exit(1);
  }
}
