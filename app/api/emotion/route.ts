import type { NextRequest } from "next/server"
import { detectEmotion } from "@/lib/emotion-detection"

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Check if we have all required environment variables
    if (!process.env.HUGGINGFACE_API_KEY || !process.env.HUGGINGFACE_API_URL || !process.env.HUGGINGFACE_MODEL) {
      console.error("Missing required Hugging Face environment variables")
      return new Response(
        JSON.stringify({
          emotion: "neutral",
          warning: "Emotion detection is not fully configured. Using default emotion.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const emotion = await detectEmotion(text)

    return new Response(JSON.stringify({ emotion }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error detecting emotion:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to detect emotion",
        emotion: "neutral", // Provide a fallback
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
