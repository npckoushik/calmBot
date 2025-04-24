import { ResourcesList } from "@/components/resources-list"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Mental Health Resources</h1>
        <ResourcesList />
      </div>
    </main>
  )
}
