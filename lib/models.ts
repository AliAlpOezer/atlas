// Pure metadata — NO provider imports, NO secrets. Safe to import from client
// components (the model switcher). The provider functions that turn `modelId`
// into a real model live only in ./provider.ts (server-only).

export type ModelInfo = {
  id: string;
  label: string;
  provider: "anthropic" | "openrouter";
  modelId: string;
  inputPer1M: number;
  outputPer1M: number;
};
export const MODELS: ModelInfo[] = [
  {
    id: "claude-haiku",
    label: "Claude Haiku 4.5",
    provider: "anthropic",
    modelId: "claude-haiku-4-5", // TODO: confirm exact id in your Anthropic console
    inputPer1M: 1, // TODO: confirm on anthropic.com/pricing
    outputPer1M: 5,
  },
  {
    id: "nemotron-free",
    label: "Nemotron 3 Ultra (free)",
    provider: "openrouter",
    // TODO: confirm exact slug via the "copy model ID" button on openrouter.ai/models
    modelId: "nvidia/nemotron-3-ultra-550b-a55b:free",
    inputPer1M: 0,
    outputPer1M: 0,
  },
  {
    id: "gpt-oss-free",
    label: "GPT-OSS 120B (free)",
    provider: "openrouter",
    // TODO: confirm exact slug via the "copy model ID" button on openrouter.ai/models
    modelId: "openai/gpt-oss-120b:free",
    inputPer1M: 0,
    outputPer1M: 0,
  },
];

export const DEFAULT_MODEL_ID = MODELS[0].id;
