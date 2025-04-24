"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Smile } from "lucide-react"

type MoodSelectorProps = {
  onSelect: (mood: string) => void
  selectedMood: string | null
}

const moods = [
  { name: "Happy", emoji: "😊" },
  { name: "Sad", emoji: "😢" },
  { name: "Anxious", emoji: "😰" },
  { name: "Angry", emoji: "😠" },
  { name: "Calm", emoji: "😌" },
  { name: "Tired", emoji: "😴" },
  { name: "Confused", emoji: "😕" },
  { name: "Neutral", emoji: "😐" },
]

export function MoodSelector({ onSelect, selectedMood }: MoodSelectorProps) {
  const [open, setOpen] = useState(false)
  const [detectedMood, setDetectedMood] = useState<string | null>(null)

  // This would normally be triggered after the user types a message
  // For demo purposes, we'll just set a random mood
  useEffect(() => {
    if (!selectedMood && !detectedMood) {
      // In a real app, this would come from the emotion detection API
      const randomMood = moods[Math.floor(Math.random() * moods.length)].name
      setDetectedMood(randomMood)
    }
  }, [selectedMood, detectedMood])

  const handleMoodSelect = (mood: string) => {
    onSelect(mood)
    setOpen(false)
  }

  const getEmojiForMood = (mood: string) => {
    return moods.find((m) => m.name.toLowerCase() === mood.toLowerCase())?.emoji || "😐"
  }

  return (
    <div className="flex items-center mb-2">
      <span className="text-sm text-gray-500 mr-2">How are you feeling?</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-blue-200 bg-white">
            {selectedMood ? (
              <>
                <span>{getEmojiForMood(selectedMood)}</span>
                <span>{selectedMood}</span>
              </>
            ) : detectedMood ? (
              <>
                <span>{getEmojiForMood(detectedMood)}</span>
                <span>{detectedMood} (detected)</span>
              </>
            ) : (
              <>
                <Smile size={16} />
                <span>Select mood</span>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="grid grid-cols-4 gap-2">
            {moods.map((mood) => (
              <Button
                key={mood.name}
                variant="ghost"
                size="sm"
                className="flex flex-col items-center justify-center h-16 p-2"
                onClick={() => handleMoodSelect(mood.name)}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs mt-1">{mood.name}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
