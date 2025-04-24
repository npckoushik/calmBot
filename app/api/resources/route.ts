import type { NextRequest } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const mood = searchParams.get("mood")

    const { db } = await connectToDatabase()

    const query: any = {}

    if (category) {
      query.category = category
    }

    if (mood) {
      query.relatedMoods = mood
    }

    const resources = await db.collection("resources").find(query).sort({ createdAt: -1 }).toArray()

    return new Response(JSON.stringify({ resources }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching resources:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch resources" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
