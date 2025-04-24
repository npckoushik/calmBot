"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (token) {
      // Fetch user data
      fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) return res.json()
          throw new Error("Failed to get user")
        })
        .then((data) => {
          setUser(data.user)
        })
        .catch((err) => {
          console.error("Auth error:", err)
          localStorage.removeItem("token")
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to login")
      }

      const data = await res.json()
      localStorage.setItem("token", data.token)
      setUser(data.user)
      return data
    } catch (error: any) {
      throw new Error(error.message || "Failed to login")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to register")
      }

      const data = await res.json()
      localStorage.setItem("token", data.token)
      setUser(data.user)
      return data
    } catch (error: any) {
      throw new Error(error.message || "Failed to register")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
