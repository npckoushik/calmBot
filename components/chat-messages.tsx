"use client"

import type { RefObject } from "react"
import type { Message } from "ai"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { SmilePlus } from "lucide-react"

type ChatMessagesProps = {
  messages: Message[]
  isLoading: boolean
  messagesEndRef: RefObject<HTMLDivElement>
  welcomeTitle?: string
  welcomeSubtitle?: string
}

export function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
  welcomeTitle = "Welcome to CalmBot",
  welcomeSubtitle = "Feel free to share how you're feeling or ask for support.",
}: ChatMessagesProps) {
  // If there are no messages, show a welcome message
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="bg-blue-100 rounded-full p-6 mb-6">
          <SmilePlus size={48} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{welcomeTitle}</h2>
        <p className="text-gray-600 mb-6 max-w-md">{welcomeSubtitle}</p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 max-w-md">
          <p className="text-gray-700 font-medium">Try asking:</p>
          <ul className="text-gray-600 mt-2 space-y-2 text-left">
            <li>"I'm feeling anxious about my upcoming presentation."</li>
            <li>"What are some ways to manage stress?"</li>
            <li>"I've been feeling down lately and don't know why."</li>
          </ul>
        </div>
        <div ref={messagesEndRef} />
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex w-full", message.role === "user" ? "justify-end" : "justify-start")}>
          <div className={cn("flex items-start gap-3 max-w-[80%]")}>
            {message.role !== "user" && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="/favicon.ico" alt="CalmBot" />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "rounded-lg p-3",
                message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800",
              )}
            >
              {message.content}
            </div>

            {message.role === "user" && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex w-full justify-start">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src="/favicon.ico" alt="CalmBot" />
              <AvatarFallback>CB</AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
              <div className="flex space-x-2">
                <div
                  className="h-2 w-2 bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
