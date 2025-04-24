"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, Clock, Save, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function DailyCheckInPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [mood, setMood] = useState(5)
  const [energy, setEnergy] = useState(5)
  const [sleep, setSleep] = useState("average")
  const [journal, setJournal] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save this data to your database
    console.log({ mood, energy, sleep, journal })
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setMood(5)
      setEnergy(5)
      setSleep("average")
      setJournal("")
      setSubmitted(false)
    }, 3000)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Daily Check-In</h1>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">Please log in to access your daily check-in.</p>
                <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">Daily Check-In</h1>
          <p className="text-gray-600 mb-8 text-center">Track your mental wellbeing and reflect on your day.</p>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>How are you today?</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Calendar size={14} className="mr-1" />
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    <span className="mx-1">•</span>
                    <Clock size={14} className="mr-1" />
                    {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center py-8">
                  <CheckCircle size={48} className="text-green-500 mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Check-In Submitted!</h3>
                  <p className="text-gray-600">Thank you for your daily check-in.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base">How would you rate your mood today?</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-500 mr-3">Low</span>
                        <Slider
                          value={[mood]}
                          min={1}
                          max={10}
                          step={1}
                          onValueChange={(value) => setMood(value[0])}
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-500 ml-3">High</span>
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-blue-600 font-medium">{mood}/10</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base">How is your energy level?</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-500 mr-3">Low</span>
                        <Slider
                          value={[energy]}
                          min={1}
                          max={10}
                          step={1}
                          onValueChange={(value) => setEnergy(value[0])}
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-500 ml-3">High</span>
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-blue-600 font-medium">{energy}/10</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base">How did you sleep last night?</Label>
                      <RadioGroup value={sleep} onValueChange={setSleep} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="poor" id="poor" />
                          <Label htmlFor="poor">Poor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="average" id="average" />
                          <Label htmlFor="average">Average</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="good" id="good" />
                          <Label htmlFor="good">Good</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="excellent" id="excellent" />
                          <Label htmlFor="excellent">Excellent</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="journal" className="text-base">
                        Journal Entry (Optional)
                      </Label>
                      <Textarea
                        id="journal"
                        placeholder="Reflect on your day, thoughts, or feelings..."
                        value={journal}
                        onChange={(e) => setJournal(e.target.value)}
                        className="mt-2 min-h-[120px]"
                      />
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter>
              {!submitted && (
                <Button type="submit" onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save size={16} className="mr-2" />
                  Save Check-In
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
