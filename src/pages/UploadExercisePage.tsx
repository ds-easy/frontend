"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Upload, FileText, Loader2, Trash2 } from "lucide-react"
import { useExerciseStore } from "../store/exerciseStore"
import { useLessonStore } from "../store/lessonStore"

export function UploadExercisePage() {
  const { uploadExercise, isLoading, error } = useExerciseStore()
  const { lessons, fetchLessons } = useLessonStore()

  const [formData, setFormData] = useState({
    lesson_name: "",
    exercise_name: "",
    visibility: "private",
    uploadedBy: "",
    file: null as File | null,
  })

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleInputChange("file", file)
  }

  const handleSubmit = async () => {
    const { lesson_name, exercise_name, uploadedBy, file } = formData

    if (!lesson_name || !exercise_name || !uploadedBy || !file) {
      alert("Please fill all fields before submitting.")
      return
    }

    const data = new FormData()
    data.append("lesson_name", lesson_name)
    data.append("exercise_name", exercise_name)
    data.append("is_public", formData.visibility === "public" ? "true" : "false")
    data.append("uploadedBy", uploadedBy)
    data.append("exo_file", file)

    try {
      await uploadExercise(data)
      setFormData({
        lesson_name: "",
        exercise_name: "",
        visibility: "private",
        uploadedBy: "",
        file: null,
      })
    } catch (err) {
      console.error("Upload error:", err)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Upload New Exercise</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      <Card className="p-6">
        <CardContent className="space-y-6 p-0">
          {/* Lesson Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Lesson</Label>
            <Select
              value={formData.lesson_name}
              onValueChange={(value) => handleInputChange("lesson_name", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a lesson" />
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

          {/* Exercise Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Exercise Name</Label>
            <Input
              type="text"
              placeholder="Enter exercise name"
              value={formData.exercise_name}
              onChange={(e) => handleInputChange("exercise_name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Your Email</Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={formData.uploadedBy}
              onChange={(e) => handleInputChange("uploadedBy", e.target.value)}
            />
          </div>

          {/* Visibility Selector */}
        <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Visibility</Label>
            <Select
                value={formData.visibility}
                onValueChange={(value) => handleInputChange("visibility", value)}
            >
                <SelectTrigger>
                <SelectValue placeholder="Choose visibility" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="private">🔒 Private (Just me)</SelectItem>
                <SelectItem value="public">🌍 Public (Everyone)</SelectItem>
                </SelectContent>
            </Select>
        </div>


          {/* File Upload */}
        <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Exercise File</Label>

            <label
                htmlFor="fileUpload"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors w-fit"
            >
                <Upload className="w-4 h-4" />
                {formData.file ? "Replace File" : "Choose File"}
            </label>
            <input
                id="fileUpload"
                type="file"
                accept=".typ, .txt"
                className="hidden"
                onChange={handleFileChange}
            />

            {formData.file && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="truncate max-w-xs">{formData.file.name}</span>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleInputChange("file", null)}
                >
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
                </div>
            )}
        </div>


          {/* Submit */}
          <Button
            onClick={handleSubmit}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Exercise
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
