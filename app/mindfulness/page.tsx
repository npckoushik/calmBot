import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"

export default function MindfulnessPage() {
  const practices = [
    {
      id: 1,
      title: "Body Scan Meditation",
      duration: "10 minutes",
      description:
        "A guided practice to bring awareness to each part of your body, releasing tension and promoting relaxation.",
      benefits: ["Reduces physical tension", "Increases body awareness", "Promotes relaxation"],
    },
    {
      id: 2,
      title: "Mindful Eating",
      duration: "15 minutes",
      description:
        "Learn to eat with full awareness, savoring each bite and developing a healthier relationship with food.",
      benefits: ["Improves digestion", "Prevents overeating", "Enhances enjoyment of food"],
    },
    {
      id: 3,
      title: "Walking Meditation",
      duration: "20 minutes",
      description: "Transform an ordinary walk into a mindful practice by bringing awareness to each step and breath.",
      benefits: ["Combines exercise with meditation", "Can be done anywhere", "Improves focus"],
    },
    {
      id: 4,
      title: "Five Senses Exercise",
      duration: "5 minutes",
      description: "A quick grounding technique using your five senses to bring you back to the present moment.",
      benefits: ["Effective for anxiety", "Easy to remember", "Can be done discreetly"],
    },
    {
      id: 5,
      title: "Loving-Kindness Meditation",
      duration: "15 minutes",
      description: "Develop compassion for yourself and others through this heart-centered meditation practice.",
      benefits: ["Increases empathy", "Reduces negative emotions", "Improves relationships"],
    },
    {
      id: 6,
      title: "Mindful Listening",
      duration: "10 minutes",
      description: "Practice deep listening without judgment, enhancing your communication skills and relationships.",
      benefits: ["Improves relationships", "Enhances communication", "Reduces misunderstandings"],
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">Mindfulness Practices</h1>
          <p className="text-gray-600 mb-8 text-center">
            Simple techniques to help you stay present, reduce stress, and improve your mental wellbeing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practices.map((practice) => (
              <Card key={practice.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-blue-600">{practice.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {practice.duration}
                    </div>
                  </div>
                  <CardDescription>{practice.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
                    {practice.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Start Practice <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
