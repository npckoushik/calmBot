const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

// This is refreshed per session (or you can persist this per user)
let chatHistory: { role: "system" | "user" | "assistant"; content: string }[] = [];

export async function fetchOpenRouterResponse(userText: string, emotion: string) {
  // Reset chat history if empty (or add a resetChat method manually)
  if (chatHistory.length === 0) {
    chatHistory.push({
      role: "system",
      content: `You are a compassionate, non-judgmental mental health assistant. Speak gently, like a caring therapist. The user may be feeling "${emotion}". Encourage open expression and offer helpful emotional support.`,
    });
  }

  // Add user message
  chatHistory.push({
    role: "user",
    content: userText,
  });

  const response = await fetch(OPENROUTER_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://your-site.com",
      "X-Title": "YourSiteName",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-v3-base:free", // change this model if needed
      messages: chatHistory,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("OpenRouter API error:", error);
    return "[No reply]";
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content?.trim() || "[No reply]";

  // Save assistant reply
  chatHistory.push({ role: "assistant", content: reply });

  return reply;
}


// const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";
// const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

// let chatHistory: { role: "user" | "assistant"; content: string }[] = [];

// export async function fetchOpenRouterResponse(prompt: string) {
//   // Add user message to chat history
//   chatHistory.push({ role: "user", content: prompt });

//   const response = await fetch(OPENROUTER_ENDPOINT, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json",
//       "HTTP-Referer": "https://your-site.com", // Optional
//       "X-Title": "YourSiteName",               // Optional
//     },
//     body: JSON.stringify({
//       model: "deepseek/deepseek-v3-base:free",
//       messages: chatHistory,
//     }),
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     console.error("OpenRouter API error:", error);
//     return "[No reply]";
//   }

//   const data = await response.json();
//   const reply = data?.choices?.[0]?.message?.content?.trim() || "[No reply]";

//   // Save bot reply to chat history
//   chatHistory.push({ role: "assistant", content: reply });

//   return reply;
// }
