import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export default function SelfCarePage() {
  const activities = [
    {
      id: 1,
      title: "Morning Journaling",
      category: "Mental",
      time: "15 minutes",
      description: "Start your day by writing down your thoughts, feelings, and intentions for the day ahead.",
      steps: [
        "Find a quiet space where you won't be disturbed",
        "Write freely without judging your thoughts",
        "Consider including gratitude, intentions, and reflections",
        "Review periodically to track your mental patterns",
      ],
    },
    {
      id: 2,
      title: "Digital Detox",
      category: "Mental",
      time: "1-3 hours",
      description: "Take a break from screens and digital devices to reduce stress and improve focus.",
      steps: [
        "Set a specific time period for your detox",
        "Turn off notifications or use airplane mode",
        "Find alternative activities like reading or walking",
        "Notice how you feel during and after the detox",
      ],
    },
    {
      id: 3,
      title: "Gentle Stretching Routine",
      category: "Physical",
      time: "10 minutes",
      description: "Release physical tension with a series of gentle stretches for your whole body.",
      steps: [
        "Start with neck and shoulder rolls",
        "Move to gentle side bends and twists",
        "Include hamstring and hip stretches",
        "Hold each stretch for 20-30 seconds, breathing deeply",
      ],
    },
    {
      id: 4,
      title: "Nourishing Meal Preparation",
      category: "Physical",
      time: "30 minutes",
      description: "Prepare a healthy, balanced meal as an act of self-care for your body.",
      steps: [
        "Choose foods that make you feel good",
        "Include a variety of colors and nutrients",
        "Practice mindfulness while cooking",
        "Eat slowly and savor each bite",
      ],
    },
    {
      id: 5,
      title: "Creative Expression",
      category: "Emotional",
      time: "20 minutes",
      description: "Engage in a creative activity like drawing, painting, or crafting to express emotions.",
      steps: [
        "Choose a medium that appeals to you",
        "Focus on the process rather than the result",
        "Allow yourself to express without judgment",
        "Reflect on how the activity made you feel",
      ],
    },
    {
      id: 6,
      title: "Nature Connection",
      category: "Emotional",
      time: "30 minutes",
      description: "Spend time in nature to reduce stress and improve your mood.",
      steps: [
        "Find a natural setting (park, garden, forest, beach)",
        "Leave your phone behind or on silent",
        "Use your senses to fully experience the environment",
        "Notice how your mood shifts during this time",
      ],
    },
    {
      id: 7,
      title: "Boundary Setting Practice",
      category: "Social",
      time: "Ongoing",
      description: "Practice identifying and communicating your personal boundaries in relationships.",
      steps: [
        "Identify areas where you need stronger boundaries",
        "Practice saying no when necessary",
        "Communicate boundaries clearly and respectfully",
        "Notice how healthy boundaries improve your relationships",
      ],
    },
    {
      id: 8,
      title: "Meaningful Connection",
      category: "Social",
      time: "30 minutes",
      description: "Reach out to someone who supports you for a genuine conversation.",
      steps: [
        "Choose someone who makes you feel safe and valued",
        "Share honestly about your experiences",
        "Practice active listening when they share",
        "Express gratitude for the connection",
      ],
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mental":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Physical":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Emotional":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "Social":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">Self-Care Activities</h1>
          <p className="text-gray-600 mb-8 text-center">
            Simple activities to nurture your mental, physical, emotional, and social wellbeing.
          </p>

          <div className="flex justify-center gap-2 mb-6">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Mental</Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Physical</Badge>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Emotional</Badge>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Social</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-blue-600">{activity.title}</CardTitle>
                      <Badge className={`mt-1 ${getCategoryColor(activity.category)}`}>{activity.category}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-3">{activity.description}</CardDescription>
                  <h4 className="text-sm font-medium mb-2">How to practice:</h4>
                  <ol className="text-sm text-gray-600 space-y-1 pl-5 list-decimal">
                    {activity.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
