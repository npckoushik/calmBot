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

    const userData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user.userId) }, { projection: { password: 0 } })

    if (!userData) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({
        user: {
          id: userData._id.toString(),
          name: userData.name,
          email: userData.email,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Auth error:", error)
    return new Response(JSON.stringify({ error: "Failed to authenticate user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
