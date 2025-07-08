"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { FileText, Loader2, Download, X,Plus, Trash2, Settings, Globe } from "lucide-react"
import { useExamStore } from "../store/examStore"

type LimitMode = "global" | "individual"

interface SelectedLesson {
  id: string
  lesson_name: string
  limit: number
}

export function CreateExamPage() {
  const { lessons, isLoading, error, pdfUrl, fetchLessons, submitExam, clearPdf } = useExamStore()

  const [limitMode, setLimitMode] = useState<LimitMode>("global")
  const [selectedLessons, setSelectedLessons] = useState<SelectedLesson[]>([])
  const [globalLimit, setGlobalLimit] = useState<number>(4)


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

  const addLesson = () => {
    if (lessons.length === 0) return
    
    const newId = Date.now().toString()
    const newLesson: SelectedLesson = {
      id: newId,
      lesson_name: lessons[0].lesson_name,
      limit: 2
    }
    
    setSelectedLessons([...selectedLessons, newLesson])
  }

  const removeLesson = (id: string) => {
    setSelectedLessons(selectedLessons.filter(lesson => lesson.id !== id))
  }

  const updateSelectedLesson = (id: string, field: keyof SelectedLesson, value: string | number) => {
    setSelectedLessons(selectedLessons.map(lesson => 
      lesson.id === id ? { ...lesson, [field]: value } : lesson
    ))
  }


  const handleGenerateExam = async () => {
    // Validate form
    if (!formData.exam_number || !formData.date_of_passing) {
      alert("Please fill in exam number and date")
      return
    }

    if (selectedLessons.length === 0) {
      alert("Please select at least one lesson")
      return
    }

    if (limitMode === "global" && globalLimit < selectedLessons.length) {
      alert(`Global limit (${globalLimit}) cannot be less than the number of lessons (${selectedLessons.length})`)
      return
    }

    // Clear previous PDF
    if (pdfUrl) {
      clearPdf()
    }

    // Prepare data for submission based on limit mode
    let examData: any = {
      date_of_passing: new Date(formData.date_of_passing).toISOString(),
      exam_number: Number.parseInt(formData.exam_number),
    }

    if (limitMode === "global") {
      // Global limit mode
      examData.lessons = selectedLessons.map(lesson => ({
        lesson_name: lesson.lesson_name
      }))
      examData.global_limit = globalLimit
    } else {
      // Individual limits mode
      examData.lessons = selectedLessons.map(lesson => ({
        lesson_name: lesson.lesson_name,
        limit: lesson.limit
      }))
    }

    try {
      await submitExam(examData)
    } catch (error) {
      console.error("Error creating exam:", error)
    }
  }

  const getAvailableLessons = (currentLessonId: string) => {
    const usedLessons = selectedLessons
      .filter(lesson => lesson.id !== currentLessonId)
      .map(lesson => lesson.lesson_name)
    
    return lessons.filter(lesson => !usedLessons.includes(lesson.lesson_name))
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
            {/* Limit Mode Tabs */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Exercise Limit Mode</Label>
              <div className="flex space-x-2">
                <Button
                  variant={limitMode === "global" ? "default" : "outline"}
                  onClick={() => setLimitMode("global")}
                  className="flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>Global Limit</span>
                </Button>
                <Button
                  variant={limitMode === "individual" ? "default" : "outline"}
                  onClick={() => setLimitMode("individual")}
                  className="flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Individual Limits</span>
                </Button>
              </div>
            </div>

            {/* Global Limit Input (only shown in global mode) */}
            {limitMode === "global" && (
              <div className="space-y-2">
                <Label htmlFor="globalLimit" className="text-sm font-medium text-gray-700">
                  Total number of exercises
                </Label>
                <Input
                  id="globalLimit"
                  type="number"
                  placeholder="4"
                  value={globalLimit}
                  onChange={(e) => setGlobalLimit(Number.parseInt(e.target.value) || 0)}
                  className="w-full"
                  min="1"
                />
                <p className="text-xs text-gray-500">
                  This will be distributed evenly across all selected lessons
                </p>
              </div>
            )}

            {/* Selected Lessons */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700">
                  Selected Lessons
                </Label>
                <Button
                  onClick={addLesson}
                  size="sm"
                  variant="outline"
                  className="flex items-center space-x-2"
                  disabled={isLoading || selectedLessons.length >= lessons.length}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lesson</span>
                </Button>
              </div>

              {selectedLessons.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No lessons selected</p>
                  <p className="text-sm">Click "Add Lesson" to get started</p>
                </div>
              )}

              {selectedLessons.map((selectedLesson) => (
                <div key={selectedLesson.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <div className="flex-1">
                    <Select
                      value={selectedLesson.lesson_name}
                      onValueChange={(value) => updateSelectedLesson(selectedLesson.id, "lesson_name", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableLessons(selectedLesson.id).map((lesson) => (
                          <SelectItem key={lesson.id} value={lesson.lesson_name}>
                            {lesson.lesson_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {limitMode === "individual" && (
                    <div className="w-24">
                      <Input
                        type="number"
                        placeholder="Limit"
                        value={selectedLesson.limit}
                        onChange={(e) => updateSelectedLesson(selectedLesson.id, "limit", Number.parseInt(e.target.value) || 0)}
                        className="w-full"
                        min="1"
                      />
                    </div>
                  )}
                  
                  <Button
                    onClick={() => removeLesson(selectedLesson.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
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

            {/* Summary */}
            {selectedLessons.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Summary</h4>
                <div className="text-sm text-gray-600">
                  <p>Lessons: {selectedLessons.length}</p>
                  <p>
                    Total exercises: {limitMode === "global" 
                      ? globalLimit 
                      : selectedLessons.reduce((sum, lesson) => sum + lesson.limit, 0)
                    }
                  </p>
                  {limitMode === "global" && selectedLessons.length > 0 && (
                    <p className="text-xs mt-1">
                      Distribution: ~{Math.floor(globalLimit / selectedLessons.length)} per lesson
                      {globalLimit % selectedLessons.length > 0 && 
                        ` (+${globalLimit % selectedLessons.length} extra)`
                      }
                    </p>
                  )}
                </div>
              </div>
            )}
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
