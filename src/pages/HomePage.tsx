import { Link } from "react-router-dom"
import { FileText, Upload } from "lucide-react"
import { Button } from "../components/ui/button"

export function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Create Exams and Share
          <br />
          Exercises with Ease
        </h1>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Generate custom exams or contribute to our exercise database. Making exam generation simpler for professors
          around the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/create-exam">
            <Button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 text-lg">
              <FileText className="w-5 h-5 mr-2" />
              Create Exam
            </Button>
          </Link>

          <Button
            variant="outline"
            className="px-8 py-3 text-lg border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Exercise
          </Button>
        </div>
      </div>
    </main>
  )
}
