import "server-only";
import { anthropic } from "@ai-sdk/anthropic";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { MODELS, DEFAULT_MODEL_ID } from "./models";
import type { LanguageModel } from "ai";

const openRouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export function getModel(id: string): LanguageModel {
  const info =
    MODELS.find((m) => m.id === id) ??
    MODELS.find((m) => m.id === DEFAULT_MODEL_ID)!;

  switch (info.provider) {
    case "anthropic":
      return anthropic(info.modelId);
    case "openrouter":
      return openRouter.chat(info.modelId);
    default:
      throw new Error(`Unsupported provider: ${info.provider}`);
  }
}
