"use client"

import { useState, useEffect } from "react"
import { BookOpen, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Resource = {
  id: string
  title: string
  description: string
  category: "article" | "guide" | "exercise"
  url: string
  relatedMoods: string[]
}

// Mock data - in a real app, this would come from the API
const mockResources: Resource[] = [
  {
    id: "1",
    title: "Understanding Anxiety",
    description: "Learn about the causes, symptoms, and management strategies for anxiety.",
    category: "article",
    url: "https://www.medicalnewstoday.com/articles/323454?utm_source=chatgpt.com#summary",
    relatedMoods: ["anxious", "stressed"],
  },
  {
    id: "2",
    title: "Mindfulness for Beginners",
    description: "A simple guide to practicing mindfulness in your daily life.",
    category: "guide",
    url: "https://www.mindful.org/meditation/mindfulness-getting-started/?utm_source=chatgpt.com",
    relatedMoods: ["anxious", "stressed", "sad"],
  },
  {
    id: "3",
    title: "Progressive Muscle Relaxation",
    description: "Step-by-step instructions for a relaxation technique to reduce physical tension.",
    category: "exercise",
    url: "https://www.healthline.com/health/progressive-muscle-relaxation",
    relatedMoods: ["anxious", "stressed", "angry"],
  },
  {
    id: "4",
    title: "Coping with Depression",
    description: "Strategies and insights for managing depression symptoms.",
    category: "article",
    url: "https://www.helpguide.org/mental-health/depression/coping-with-depression",
    relatedMoods: ["sad", "tired"],
  },
  {
    id: "5",
    title: "Healthy Sleep Habits",
    description: "Tips for improving your sleep quality and establishing a healthy sleep routine.",
    category: "guide",
    url: "https://www.sleepfoundation.org/sleep-habits?utm_source=chatgpt.com",
    relatedMoods: ["tired", "anxious"],
  },
]

export function ResourcesList() {
  const [resources, setResources] = useState<Resource[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResources(mockResources)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredResources =
    activeTab === "all" ? resources : resources.filter((resource) => resource.category === activeTab)

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Mental Health Resources</h2>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
          <TabsTrigger value="exercise">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>

        <TabsContent value="article" className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>

        <TabsContent value="guide" className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>

        <TabsContent value="exercise" className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-blue-600">{resource.title}</CardTitle>
            <CardDescription>{getCategoryLabel(resource.category)}</CardDescription>
          </div>
          <BookOpen className="text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{resource.description}</p>
        <div className="flex flex-wrap gap-2">
          {resource.relatedMoods.map((mood) => (
            <Badge key={mood} variant="outline" className="bg-blue-50">
              {mood}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Read More <ExternalLink size={16} className="ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

function getCategoryLabel(category: string) {
  switch (category) {
    case "article":
      return "Article"
    case "guide":
      return "Practical Guide"
    case "exercise":
      return "Exercise"
    default:
      return category
  }
}