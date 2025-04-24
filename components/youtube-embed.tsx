"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"

type YouTubeEmbedProps = {
  title: string
  description: string
  videoId: string
  channel: string
  thumbnail?: string
}

export function YouTubeEmbed({ title, description, videoId, channel, thumbnail }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const extractVideoId = (url: string): string => {
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : url
  }

  const processedVideoId =
    videoId.includes("youtube.com") || videoId.includes("youtu.be") ? extractVideoId(videoId) : videoId

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-gray-100 relative">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${processedVideoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
        ) : (
          <>
            <img
              src={thumbnail || `/placeholder.svg?height=180&width=320&text=${encodeURIComponent(title)}`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <Button
              onClick={() => setIsPlaying(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 hover:bg-blue-700 rounded-full h-16 w-16 flex items-center justify-center"
            >
              <Play size={32} className="ml-1" />
            </Button>
          </>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-blue-600">{title}</CardTitle>
        <CardDescription>{channel}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Hide Video" : "Watch Here"}
        </Button>
        <Button variant="outline" asChild>
          <a href={`https://www.youtube.com/watch?v=${processedVideoId}`} target="_blank" rel="noopener noreferrer">
            Open on YouTube <ExternalLink size={16} className="ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
