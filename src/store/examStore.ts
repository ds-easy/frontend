import { create } from "zustand"

interface Lesson {
  id: number
  created_at: string
  updated_at: string
  deleted_at: {
    Time: string
    Valid: boolean
  }
  lesson_name: string
}

interface ExamFormData {
  lesson_name: string
  limit: number
  date_of_passing: string
  exam_number: number
  professor_id: number
  template_name: string
}

interface ExamStore {
  lessons: Lesson[]
  isLoading: boolean
  error: string | null
  pdfUrl: string | null

  // Actions
  fetchLessons: () => Promise<void>
  submitExam: (formData: Omit<ExamFormData, "professor_id" | "template_name">) => Promise<void>
  clearPdf: () => void
}

export const useExamStore = create<ExamStore>((set, get) => ({
  lessons: [],
  isLoading: false,
  error: null,
  pdfUrl: null,

  fetchLessons: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch("http://localhost:8080/lessons", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch lessons: ${response.status} ${response.statusText}`)
      }

      const lessons = await response.json()
      set({ lessons, isLoading: false })
    } catch (error) {
      console.error("Error fetching lessons:", error)
      set({
        error: error instanceof Error ? error.message : "An error occurred while fetching lessons",
        isLoading: false,
      })
    }
  },

  submitExam: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const examData: ExamFormData = {
        ...formData,
        professor_id: 2, // Hardcoded
        template_name: "ELDS2", // Hardcoded
      }

      const response = await fetch("http://localhost:8080/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examData),
        mode: "cors",
      })

      if (!response.ok) {
        throw new Error(`Failed to create exam: ${response.status} ${response.statusText}`)
      }

      // Handle PDF response
      const pdfBlob = await response.blob()

      // Create a URL for the PDF blob
      const pdfUrl = URL.createObjectURL(pdfBlob)

      set({ pdfUrl, isLoading: false })
      console.log("Exam created successfully, PDF generated")
    } catch (error) {
      console.error("Error creating exam:", error)
      set({
        error: error instanceof Error ? error.message : "An error occurred while creating the exam",
        isLoading: false,
      })
    }
  },

  clearPdf: () => {
    const { pdfUrl } = get()
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
      set({ pdfUrl: null })
    }
  },
}))
