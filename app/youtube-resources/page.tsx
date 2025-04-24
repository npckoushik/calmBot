import { YouTubeEmbed } from "@/components/youtube-embed"

export default function YouTubeResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "Mindfulness Meditation",
      channel: "Headspace",
      description: "A 10-minute guided meditation for beginners",
      videoId: "ZToicYcHIOU",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Mindfulness+Meditation",
    },
    {
      id: 2,
      title: "Understanding Anxiety",
      channel: "TED-Ed",
      description: "How anxiety affects your brain and body",
      videoId: "jEHwB1PG_-Q",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Understanding+Anxiety",
    },
    {
      id: 3,
      title: "Breathing Techniques for Stress Relief",
      channel: "Yoga With Adriene",
      description: "Simple breathing exercises to reduce stress",
      videoId: "acUZdGd_3Gk",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Breathing+Techniques",
    },
    {
      id: 4,
      title: "The Science of Depression",
      channel: "AsapSCIENCE",
      description: "Understanding the science behind depression",
      videoId: "GOK1tKFFIQI",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Science+of+Depression",
    },
    {
      id: 5,
      title: "How to Practice Emotional First Aid",
      channel: "TED",
      description: "Guy Winch talks about treating emotional injuries",
      videoId: "F2hc2FLOdhI",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Emotional+First+Aid",
    },
    {
      id: 6,
      title: "The Power of Vulnerability",
      channel: "TED",
      description: "Brené Brown on human connection and vulnerability",
      videoId: "iCvmsMzlF7o",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Power+of+Vulnerability",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">YouTube Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <YouTubeEmbed
              key={resource.id}
              title={resource.title}
              description={resource.description}
              videoId={resource.videoId}
              channel={resource.channel}
              thumbnail={resource.thumbnail}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
