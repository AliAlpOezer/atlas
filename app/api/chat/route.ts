import { streamText, convertToModelMessages, UIMessage } from "ai";
import { DEFAULT_MODEL_ID } from "@/lib/models";
import { getModel } from "@/lib/provider";
export async function POST(req: Request) {
  const { messages, modelId } = (await req.json()) as {
    messages: UIMessage[];
    modelId?: string;
  };
  const result = streamText({
    model: getModel(modelId ?? DEFAULT_MODEL_ID),
    messages: await convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
