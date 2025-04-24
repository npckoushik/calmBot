import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

type JwtPayload = {
  userId: string
  email: string
  iat: number
  exp: number
}

export async function getAuthUser(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    return {
      userId: decoded.userId,
      email: decoded.email,
    }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}
