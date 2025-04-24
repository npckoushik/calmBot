"use client"

import { useState, useEffect, useRef } from "react"
import { ChatHeader } from "./chat-header"
import { ChatInput } from "./chat-input"
import { ChatMessages } from "./chat-messages"
import { MoodSelector } from "./mood-selector"
import { useAuth } from "@/hooks/use-auth"
import { LoginModal } from "./login-modal"
import { RegisterModal } from "./register-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"
import { fetchHuggingFaceResponse } from "@/lib/huggingface-chat"
import { fetchGroqResponse } from "@/lib/groq-chat";
import { fetchOpenRouterResponse } from "@/lib/openrouter-chat";

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatInterface() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [chatError, setChatError] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isChatLoading, setIsChatLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsChatLoading(true)

    try {
      const reply = await fetchGroqResponse(userMessage.content,"neutral")

      const botMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: reply
      }

      setMessages(prev => [...prev, botMessage])

      if (user) {
        await fetch("/api/chat-history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            messages: [...messages, userMessage, botMessage],
            mood: selectedMood
          })
        })
      }
    } catch (err: any) {
      setChatError(err.message || "Failed to connect to Hugging Face")
    } finally {
      setIsChatLoading(false)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleRetry = () => {
    setChatError(null)
  }

  return (
    <>
      <ChatHeader
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        selectedMood={selectedMood}
      />

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto w-full">
          {chatError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <div className="flex flex-col">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{chatError}</AlertDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry}
                  className="mt-2 self-start"
                >
                  <RefreshCcw size={14} className="mr-2" />
                  Retry
                </Button>
              </div>
            </Alert>
          )}
          <ChatMessages
            messages={messages}
            isLoading={isChatLoading}
            messagesEndRef={messagesEndRef}
            welcomeTitle="Welcome to CalmBot"
            welcomeSubtitle="Your mental health companion"
          />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto w-full">
          <MoodSelector onSelect={setSelectedMood} selectedMood={selectedMood} />
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isChatLoading}
          />
          <div className="text-xs text-gray-500 mt-2 text-center">
            Conversations are private. For emergencies, contact a professional.
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </>
  )
}
