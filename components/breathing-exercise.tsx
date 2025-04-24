"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setCounter((prev) => {
          // Inhale for 4 seconds
          if (phase === "inhale" && prev >= 4) {
            setPhase("hold")
            return 0
          }
          // Hold for 7 seconds
          else if (phase === "hold" && prev >= 7) {
            setPhase("exhale")
            return 0
          }
          // Exhale for 8 seconds
          else if (phase === "exhale" && prev >= 8) {
            setPhase("inhale")
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, phase])

  const toggleExercise = () => {
    setIsActive(!isActive)
    if (!isActive) {
      setPhase("inhale")
      setCounter(0)
    }
  }

  const getInstructions = () => {
    switch (phase) {
      case "inhale":
        return "Breathe in slowly through your nose"
      case "hold":
        return "Hold your breath"
      case "exhale":
        return "Exhale slowly through your mouth"
    }
  }

  const getCircleSize = () => {
    if (phase === "inhale") {
      // Gradually increase size during inhale
      return 100 + counter * 25
    } else if (phase === "hold") {
      // Maintain maximum size during hold
      return 200
    } else {
      // Gradually decrease size during exhale
      return 200 - counter * 25
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-blue-600">4-7-8 Breathing Exercise</CardTitle>
        <CardDescription>A simple breathing technique to help reduce anxiety and promote relaxation.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-6" style={{ height: "200px" }}>
          <div
            className="absolute bg-blue-100 rounded-full transition-all duration-1000"
            style={{
              width: `${getCircleSize()}px`,
              height: `${getCircleSize()}px`,
            }}
          />
          <div className="relative z-10 text-blue-600 font-bold text-xl">
            {isActive ? getInstructions() : "Press Start"}
          </div>
        </div>

        {isActive && <div className="text-2xl font-bold mb-4">{counter + 1}</div>}
      </CardContent>
      <CardFooter>
        <Button onClick={toggleExercise} className="w-full bg-blue-600 hover:bg-blue-700">
          {isActive ? "Stop" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  )
}
