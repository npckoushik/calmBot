import type { NextRequest } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { getAuthUser } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req)

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { db } = await connectToDatabase()

    const chats = await db
      .collection("chats")
      .find({ userId: new ObjectId(user.userId) })
      .sort({ createdAt: -1 })
      .toArray()

    return new Response(JSON.stringify({ chats }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching chat history:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch chat history" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req)

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { messages, mood } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid chat data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { db } = await connectToDatabase()

    const result = await db.collection("chats").insertOne({
      userId: new ObjectId(user.userId),
      messages,
      mood,
      createdAt: new Date(),
    })

    return new Response(
      JSON.stringify({
        message: "Chat saved successfully",
        chatId: result.insertedId.toString(),
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error saving chat:", error)
    return new Response(JSON.stringify({ error: "Failed to save chat" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
