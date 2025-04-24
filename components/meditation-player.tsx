"use client"

import { useState, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type MeditationTrack = {
  id: string
  title: string
  duration: string
  audioSrc: string
  description: string
}

const meditationTracks: MeditationTrack[] = [
  {
    id: "1",
    title: "Calm Breathing Meditation",
    duration: "5:00",
    audioSrc: "/meditations/calm-breathing.mp3", // This would be a real audio file in production
    description: "A short meditation focusing on breath awareness to calm the mind.",
  },
  {
    id: "2",
    title: "Body Scan Relaxation",
    duration: "10:00",
    audioSrc: "/meditations/body-scan.mp3",
    description: "Progressive relaxation technique to release tension throughout the body.",
  },
  {
    id: "3",
    title: "Loving-Kindness Meditation",
    duration: "7:30",
    audioSrc: "/meditations/loving-kindness.mp3",
    description: "Cultivate feelings of compassion for yourself and others.",
  },
]

export function MeditationPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrack = meditationTracks[currentTrackIndex]

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? meditationTracks.length - 1 : prev - 1))
    setProgress(0)
    setIsPlaying(false)
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev === meditationTracks.length - 1 ? 0 : prev + 1))
    setProgress(0)
    setIsPlaying(false)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-blue-600">{currentTrack.title}</CardTitle>
        <CardDescription>{currentTrack.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* This would be a real audio element in production */}
          <audio
            ref={audioRef}
            src={currentTrack.audioSrc}
            onTimeUpdate={() => {
              if (audioRef.current) {
                const duration = audioRef.current.duration || 1
                setProgress((audioRef.current.currentTime / duration) * 100)
              }
            }}
            onEnded={() => {
              setIsPlaying(false)
              setProgress(0)
            }}
          />

          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatTime(progress * 0.01 * (audioRef.current?.duration || 0))}</span>
            <span>{currentTrack.duration}</span>
          </div>

          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            className="cursor-pointer"
            onValueChange={(value) => {
              setProgress(value[0])
              if (audioRef.current) {
                audioRef.current.currentTime = (value[0] / 100) * (audioRef.current.duration || 0)
              }
            }}
          />

          <div className="flex items-center justify-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handlePrevious}>
              <SkipBack size={24} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-2 border-blue-600"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause size={24} className="text-blue-600" />
              ) : (
                <Play size={24} className="text-blue-600 ml-1" />
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={handleNext}>
              <SkipForward size={24} />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 size={20} className="text-gray-500" />
            <Slider value={[volume]} max={100} step={1} className="cursor-pointer" onValueChange={handleVolumeChange} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          Track {currentTrackIndex + 1} of {meditationTracks.length}
        </div>
      </CardFooter>
    </Card>
  )
}
