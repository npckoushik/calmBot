"use client"

import type React from "react"

import type { FormEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ChatInputProps = {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <Textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message here..."
        className="flex-1 min-h-[60px] max-h-[200px] resize-none border-blue-200 focus-visible:ring-blue-500 rounded-xl"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (input.trim()) {
              handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
            }
          }
        }}
      />
      <Button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-blue-600 hover:bg-blue-700 rounded-full h-10 w-10 p-0 flex items-center justify-center"
      >
        <Send size={18} />
      </Button>
    </form>
  )
}
