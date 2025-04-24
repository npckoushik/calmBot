import { BreathingExercise } from "@/components/breathing-exercise"

export default function BreathingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Breathing Exercises</h1>
        <div className="max-w-md mx-auto">
          <BreathingExercise />
        </div>
      </div>
    </main>
  )
}
