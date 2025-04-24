"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Copy, Check } from "lucide-react"
import { useState } from "react"

export default function PositiveAffirmationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">Positive Affirmations</h1>
          <p className="text-gray-600 mb-8 text-center">
            Powerful statements to shift your mindset and promote positive thinking.
          </p>

          <AffirmationTabs />
        </div>
      </div>
    </main>
  )
}

function AffirmationTabs() {
  const affirmations = {
    confidence: [
      "I believe in myself and my abilities.",
      "I am capable of achieving my goals.",
      "I trust my decisions and choices.",
      "I am worthy of success and happiness.",
      "I embrace challenges as opportunities to grow.",
      "I am enough exactly as I am.",
      "I speak with confidence and self-assurance.",
      "I am proud of my achievements, big and small.",
      "I radiate confidence, self-respect, and inner harmony.",
      "I am becoming more confident each day.",
    ],
    anxiety: [
      "I am safe and at peace in this moment.",
      "This feeling is temporary and will pass.",
      "I breathe in calmness and breathe out tension.",
      "I release all worry and embrace peace.",
      "I am in control of my thoughts and emotions.",
      "I choose to focus on what I can control.",
      "My mind is calm, my body is relaxed.",
      "I am stronger than my anxiety.",
      "Each breath brings me deeper relaxation.",
      "I trust that everything will work out.",
    ],
    selfLove: [
      "I love and accept myself unconditionally.",
      "I treat myself with kindness and respect.",
      "I am worthy of love and compassion.",
      "I appreciate my unique qualities and gifts.",
      "I honor my needs and take care of myself.",
      "I forgive myself for past mistakes and learn from them.",
      "I am grateful for who I am becoming.",
      "I nurture my mind, body, and spirit with love.",
      "I deserve happiness and fulfillment.",
      "I am whole and complete as I am.",
    ],
    resilience: [
      "I am resilient and can overcome any challenge.",
      "Every setback is a setup for a comeback.",
      "I grow stronger through difficult times.",
      "I have the power to rise after every fall.",
      "I learn and adapt from every experience.",
      "My potential is limitless, and my resilience is powerful.",
      "I face challenges with courage and determination.",
      "I am flexible and can adjust to change.",
      "I have survived difficult times before and I will again.",
      "My strength is greater than any struggle.",
    ],
  }

  return (
    <Tabs defaultValue="confidence" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="confidence">Confidence</TabsTrigger>
        <TabsTrigger value="anxiety">Anxiety Relief</TabsTrigger>
        <TabsTrigger value="selfLove">Self-Love</TabsTrigger>
        <TabsTrigger value="resilience">Resilience</TabsTrigger>
      </TabsList>

      <TabsContent value="confidence">
        <AffirmationList affirmations={affirmations.confidence} />
      </TabsContent>

      <TabsContent value="anxiety">
        <AffirmationList affirmations={affirmations.anxiety} />
      </TabsContent>

      <TabsContent value="selfLove">
        <AffirmationList affirmations={affirmations.selfLove} />
      </TabsContent>

      <TabsContent value="resilience">
        <AffirmationList affirmations={affirmations.resilience} />
      </TabsContent>
    </Tabs>
  )
}

function AffirmationList({ affirmations }: { affirmations: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {affirmations.map((affirmation, index) => (
        <AffirmationCard key={index} affirmation={affirmation} />
      ))}
    </div>
  )
}

function AffirmationCard({ affirmation }: { affirmation: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affirmation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Sparkles size={18} className="text-blue-500 mr-2" />
          Affirmation
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-800 text-lg font-medium mb-4">{affirmation}</p>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-1">
            {copied ? (
              <>
                <Check size={14} className="text-green-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
