const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// Optional session context (like memory)
let chatHistory: { role: "system" | "user" | "assistant"; content: string }[] = [];

export async function fetchGroqResponse(userText: string, mood: string | null = null) {
  if (chatHistory.length === 0) {
    chatHistory.push({
      role: "system",
      content: `You are a kind and empathetic mental health assistant. Always respond in a warm, supportive tone. The user might be feeling: ${mood || "unspecified"}.`,
    });
  }

  chatHistory.push({ role: "user", content: userText });

  const response = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant", // or llama3-8b-8192
      messages: chatHistory,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${error}`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content?.trim() || "[No reply]";

  chatHistory.push({ role: "assistant", content: reply });
  return reply;
}

