import { create } from "zustand"
import type { LessonRequest } from "./lessonStore"

interface ExamFormData {
  lessons: LessonRequest[]
  global_limit?: number
  date_of_passing: string
  exam_number: number
}

interface ExamStore {
  pdfUrl: string | null
  isLoading: boolean
  error: string | null
  submitExam: (formData: ExamFormData) => Promise<void>
  clearPdf: () => void
}

export const useExamStore = create<ExamStore>((set, get) => ({
  pdfUrl: null,
  isLoading: false,
  error: null,

  submitExam: async (formData) => {
    set({ isLoading: true, error: null })

    const payload = {
      ...formData,
      professor_id: 2,
      template_name: "ELDS2",
    }

    try {
      const res = await fetch("http://localhost:8080/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let msg = `Failed to create exam: ${res.statusText}`
        try {
          const err = await res.json()
          if (err?.error) msg = err.error
        } catch {}
        throw new Error(msg)
      }

      const blob = await res.blob()
      const pdfUrl = URL.createObjectURL(blob)
      set({ pdfUrl, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error creating exam",
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
