import { Link } from "react-router-dom"
import { FileText, Upload } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

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

          <Link to="/upload-exercise">
            <Button variant="outline" 
                  className="px-8 py-3 text-lg border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              <Upload className="w-5 h-5 mr-2" />
              Upload Exercise
            </Button>
          </Link>

        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customizable Exams</h3>
              <p className="text-gray-600">Create tailored exams with our extensive exercise database</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">Contribute your own exercises to help others learn</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">Simple interface for creating and sharing exercises</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">Generate high-quality PDF exams ready for distribution</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
