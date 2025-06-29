"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { FileText, Loader2, Download, X } from "lucide-react"
import { useExamStore } from "../store/examStore"

export function CreateExamPage() {
  const { lessons, isLoading, error, pdfUrl, fetchLessons, submitExam, clearPdf } = useExamStore()

  const [formData, setFormData] = useState({
    lesson_name: "",
    limit: "",
    exam_number: "",
    date_of_passing: "",
  })

  // Fetch lessons when component mounts
  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  // Cleanup PDF URL when component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        clearPdf()
      }
    }
  }, [pdfUrl, clearPdf])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleGenerateExam = async () => {
    // Validate form
    if (!formData.lesson_name || !formData.limit || !formData.exam_number || !formData.date_of_passing) {
      alert("Please fill in all fields")
      return
    }

    // Clear previous PDF
    if (pdfUrl) {
      clearPdf()
    }

    // Prepare data for submission
    const examData = {
      lesson_name: formData.lesson_name,
      limit: Number.parseInt(formData.limit),
      date_of_passing: new Date(formData.date_of_passing).toISOString(),
      exam_number: Number.parseInt(formData.exam_number),
    }

    try {
      await submitExam(examData)
    } catch (error) {
      console.error("Error creating exam:", error)
    }
  }

  const handleDownloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = `exam-${formData.exam_number}-${formData.lesson_name}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleClearPdf = () => {
    clearPdf()
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Exam</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
          <br />
          <small className="text-red-600">
            If you're seeing a CORS error, make sure your backend server includes the proper CORS headers.
          </small>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="p-6">
          <CardContent className="space-y-6 p-0">
            {/* Lesson Selection */}
            <div className="space-y-2">
              <Label htmlFor="lesson" className="text-sm font-medium text-gray-700">
                Lesson
              </Label>
              <Select
                onValueChange={(value) => handleInputChange("lesson_name", value)}
                value={formData.lesson_name}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isLoading ? "Loading lessons..." : "Select a lesson"} />
                </SelectTrigger>
                <SelectContent>
                  {lessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.lesson_name}>
                      {lesson.lesson_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Exercises (Limit) */}
            <div className="space-y-2">
              <Label htmlFor="limit" className="text-sm font-medium text-gray-700">
                Number of exercises
              </Label>
              <Input
                id="limit"
                type="number"
                placeholder="0"
                value={formData.limit}
                onChange={(e) => handleInputChange("limit", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Exam Number */}
            <div className="space-y-2">
              <Label htmlFor="examNumber" className="text-sm font-medium text-gray-700">
                Exam number
              </Label>
              <Input
                id="examNumber"
                type="number"
                placeholder="0"
                value={formData.exam_number}
                onChange={(e) => handleInputChange("exam_number", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Date of Passing */}
            <div className="space-y-2">
              <Label htmlFor="dateOfPassing" className="text-sm font-medium text-gray-700">
                Date of passing
              </Label>
              <Input
                id="dateOfPassing"
                type="datetime-local"
                value={formData.date_of_passing}
                onChange={(e) => handleInputChange("date_of_passing", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateExam}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Exam...
                </>
              ) : (
                "Generate Exam"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="p-6">
          <CardContent className="p-0">
            {pdfUrl ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Exam Preview</h3>
                  <div className="flex gap-2">
                    <Button onClick={handleDownloadPdf} size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={handleClearPdf} size="sm" variant="outline">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <iframe src={pdfUrl} className="w-full h-[600px]" title="Exam Preview" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                <FileText className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">PDF Preview will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
