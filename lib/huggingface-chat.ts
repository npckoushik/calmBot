
import axios from "axios";

const HF_API_TOKEN = process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN || "";
let chatHistory = "";
const endpoint = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large";

export async function fetchHuggingFaceResponse(prompt: string) {
  const promptt = chatHistory + `User: ${prompt}\nBot:`;

  const response = await axios.post(
    endpoint,
    {
      inputs: promptt,
      parameters: {
        max_new_tokens: 100,
        do_sample: true,
        temperature: 0.7,
        repetition_penalty: 1.1,
        return_full_text: false,
      },
      options: { wait_for_model: true },
    },
    {
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const fullText = response.data?.[0]?.generated_text || "";
  const reply = fullText.startsWith(promptt)
    ? fullText.slice(promptt.length).trim()
    : fullText.trim();

  const safeReply = reply.length > 0 ? reply : "[No reply]";
  chatHistory += `User: ${prompt}\nBot: ${safeReply}\n`;

  return safeReply;
}



// import axios from "axios";

// const HF_API_TOKEN = process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN || "";
// let chatHistory = "";
// const endpoint = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large";

// export async function fetchHuggingFaceResponse(prompt: string) {
//   const promptt = chatHistory + `User: ${prompt}\nBot:`;

//   const response = fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": "Bearer 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",
//       "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
//       "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       "model": "deepseek/deepseek-v3-base:free",
//       "messages": [
//         {
//           "role": "user",
//           "content": promptt
//         }
//       ]
//     })
//   });

//   const fullText = response.data?.[0]?.generated_text || "";
//   const reply = fullText.startsWith(promptt)
//     ? fullText.slice(promptt.length).trim()
//     : fullText.trim();

//   const safeReply = reply.length > 0 ? reply : "[No reply]";
//   chatHistory += `User: ${prompt}\nBot: ${safeReply}\n`;

//   return safeReply;
// }


// import axios from "axios";


// const HF_API_TOKEN = process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN || "";
// let chatHistory = "";
// const endpoint = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large";

// export async function fetchHuggingFaceResponse(prompt: string) {
//     const promptt = chatHistory + prompt;
//     const response = await axios.post(
//         endpoint,
//         { inputs: promptt },
//         {
//           headers: {
//             Authorization: `Bearer ${HF_API_TOKEN}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const botReply = response.data?.[0]?.generated_text || "[No reply]";
//       chatHistory += `${prompt} ${botReply}\n`;
//       return botReply;
//     }

// // microsoft/DialoGPT-large




// const HUGGINGFACE_TOKEN = process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN || "";

// export async function fetchHuggingFaceResponse(prompt: string) {
//   const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-large", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
//     },
//     body: JSON.stringify({ inputs: prompt }),

//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
//   }

//   const data = await response.json();
//   const reply = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text;
//   return reply || "Sorry, I couldn't generate a reply.";
// }
