// lib/huggingface.ts
export type HuggingFaceMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function generateStreamWithHuggingFace(
  messages: HuggingFaceMessage[],
  options: {
    temperature?: number;
    max_new_tokens?: number;
    repetition_penalty?: number;
  } = {},
): Promise<ReadableStream> {
  if (!process.env.HUGGINGFACE_API_KEY) {
    throw new Error("HUGGINGFACE_API_KEY missing");
  }

  const formattedPrompt = formatMessagesForOpenAssistant(messages);

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: formattedPrompt,
          parameters: {
            temperature: options.temperature || 0.65,
            max_new_tokens: options.max_new_tokens || 256,
            repetition_penalty: options.repetition_penalty || 1.25,
            return_full_text: false,
            details: true
          },
          options: { wait_for_model: true }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`HF API Error: ${error.error || response.statusText}`);
    }

    const decoder = new TextDecoder();

    return new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        try {
          while (reader) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const parsed = safeJsonParse(chunk);

            if (parsed?.token?.text) {
              controller.enqueue(new TextEncoder().encode(parsed.token.text));
            }
          }
        } finally {
          controller.close();
        }
      }
    });

  } catch (error) {
    console.error("HF Stream Error:", error);
    throw error;
  }
}

function formatMessagesForOpenAssistant(messages: HuggingFaceMessage[]): string {
  return messages.map(m => {
    switch (m.role) {
      case 'system': return `[SYSTEM] ${m.content}`;
      case 'user': return `[PATIENT] ${m.content}`;
      default: return `[THERAPIST] ${m.content}`;
    }
  }).join('\n') + '\n[THERAPIST] ';
}

function safeJsonParse(str: string): any {
  try {
    return JSON.parse(str.replace(/^data: /, ''));
  } catch {
    return null;
  }
}
