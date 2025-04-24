import { NextResponse } from "next/server";
import { analyzeTextSafety } from "@/lib/moderation";
import { detectEmotion } from "@/lib/emotion-detection";
import { fetchOpenRouterResponse } from "@/lib/openrouter-chat";
import { fetchGroqResponse } from "@/lib/groq-chat";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Moderate for toxicity
    const safety = await analyzeTextSafety(text);
    if (safety.toxic) {
      return NextResponse.json({ reply: "Sorry, I can't respond to that message." });
    }

    // Detect emotion
    const emotion = await detectEmotion(text);

    // Get response from OpenRouter
    const reply = await fetchGroqResponse(text, emotion);

    console.log("User:", text);
    console.log("Detected emotion:", emotion);
    console.log("Reply:", reply);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import { analyzeTextSafety } from "@/lib/moderation"; // your existing moderation
// import { detectEmotion } from "@/lib/emotion-detection"; // your existing emotion detection
// // import { generateReply } from "@/lib/generateReply";
// // import { fetchHuggingFaceResponse } from "@/lib/huggingface-chat"; // your existing Hugging Face chat API

// import {fetchOpenRouterResponse} from "@/lib/openrouter-chat"; // your existing OpenRouter chat API
// export async function POST(request: Request) {
//   try {
//     const { text } = await request.json();

//     if (!text || typeof text !== "string") {
//       return NextResponse.json({ error: "Invalid input" }, { status: 400 });
//     }

//     // Moderate for toxicity
//     const safety = await analyzeTextSafety(text);
//     if (safety.toxic) {
//       return NextResponse.json({ reply: "Sorry, I can't respond to that message." });
//     }

//     // Detect emotion (optional)
//     const emotion = await detectEmotion(text);

//     // Create prompt for mental health chatbot
//     // const prompt = `You are a compassionate mental health assistant.\nUser (emotion: ${emotion}): ${text}\nAssistant:`;

//     const prompt = `You are a compassionate and non-judgmental mental health assistant. Your job is to gently support the user.\nUser (emotion: ${emotion}): ${text}\nAssistant:`;


//     // Generate chatbot reply


//     // const reply = await generateReply(prompt);


//     const reply = await fetchOpenRouterResponse(prompt); // Uncomment if using Hugging Face API

//     console.log("User:", text);
// console.log("Detected emotion:", emotion);
// console.log("Reply:", reply);
//     return NextResponse.json({ reply });



//   } catch (error) {
//     console.error("Chat API error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }

  
// }
