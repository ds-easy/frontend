"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"

export function CreateExamPage() {
  const [formData, setFormData] = useState({
    class: "",
    lesson: "",
    numberOfExercises: "",
    examNumber: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleGenerateExam = () => {
    console.log("Generating exam with data:", formData)
    // Add your exam generation logic here
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Exam</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="p-6">
          <CardContent className="space-y-6 p-0">
            {/* Class Selection */}
            <div className="space-y-2">
              <Label htmlFor="class" className="text-sm font-medium text-gray-700">
                Class
              </Label>
              <Select onValueChange={(value) => handleInputChange("class", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math-101">Mathematics 101</SelectItem>
                  <SelectItem value="physics-201">Physics 201</SelectItem>
                  <SelectItem value="chemistry-101">Chemistry 101</SelectItem>
                  <SelectItem value="biology-101">Biology 101</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lesson Selection */}
            <div className="space-y-2">
              <Label htmlFor="lesson" className="text-sm font-medium text-gray-700">
                Lesson
              </Label>
              <Select onValueChange={(value) => handleInputChange("lesson", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a lesson" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lesson-1">Lesson 1: Introduction</SelectItem>
                  <SelectItem value="lesson-2">Lesson 2: Basic Concepts</SelectItem>
                  <SelectItem value="lesson-3">Lesson 3: Advanced Topics</SelectItem>
                  <SelectItem value="lesson-4">Lesson 4: Applications</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Exercises */}
            <div className="space-y-2">
              <Label htmlFor="exercises" className="text-sm font-medium text-gray-700">
                Number of exercises
              </Label>
              <Input
                id="exercises"
                type="number"
                placeholder="0"
                value={formData.numberOfExercises}
                onChange={(e) => handleInputChange("numberOfExercises", e.target.value)}
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
                value={formData.examNumber}
                onChange={(e) => handleInputChange("examNumber", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Generate Button */}
            <Button onClick={handleGenerateExam} className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3">
              Generate Exam
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="p-6">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] p-0">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">PDF Preview will appear here</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
