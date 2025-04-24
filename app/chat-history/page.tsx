"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ChatHistoryPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [chats, setChats] = useState([])
  const [isLoadingChats, setIsLoadingChats] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }

    if (user) {
      fetchChats()
    } else {
      setIsLoadingChats(false)
    }
  }, [user, isLoading, router])

  const fetchChats = async () => {
    try {
      setError(null)
      console.log("Fetching chat history...")

      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch("/api/chat-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Chat history response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to fetch chat history: ${response.status}`)
      }

      const data = await response.json()
      console.log("Chat history data:", data)

      setChats(data.chats || [])
    } catch (error) {
      console.error("Error fetching chats:", error)
      setError(error.message || "Failed to load chat history")
    } finally {
      setIsLoadingChats(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading || (user && isLoadingChats)) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Chat History</h1>
          <div className="flex justify-center">
            <div className="animate-pulse space-y-4 w-full max-w-3xl">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="w-full">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Chat History</h1>
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center mb-4">Please log in to view your chat history.</p>
              <div className="flex justify-center">
                <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Chat History</h1>

        {error && (
          <Alert variant="destructive" className="mb-4 max-w-3xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <Button variant="outline" size="sm" onClick={fetchChats} className="mt-2">
              Try Again
            </Button>
          </Alert>
        )}

        {!error && chats.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
            <MessageSquare size={48} className="mx-auto text-blue-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No chat history yet</h2>
            <p className="text-gray-500 mb-4">Start a conversation with CalmBot to see your chat history here.</p>
            <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
              Start a New Chat
            </Button>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {chats.map((chat) => (
              <Card key={chat._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-blue-600">Chat {chat.mood ? `(${chat.mood})` : ""}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Calendar size={14} />
                        {formatDate(chat.createdAt)}
                        <span className="mx-1">•</span>
                        <Clock size={14} />
                        {formatTime(chat.createdAt)}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => router.push(`/chat/${chat._id}`)}>
                      View
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 line-clamp-2">
                    {chat.messages && chat.messages[0]?.content ? chat.messages[0].content : "No messages"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
