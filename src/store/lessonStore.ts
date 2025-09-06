import { create } from "zustand"

export interface Lesson {
  id: number
  created_at: string
  updated_at: string
  deleted_at: {
    Time: string
    Valid: boolean
  }
  lesson_name: string
}

interface LessonStore {
  lessons: Lesson[]
  isLoading: boolean
  error: string | null
  fetchLessons: () => Promise<void>
}

export interface LessonRequest {
  lesson_name: string
  limit?: number
}

export const useLessonStore = create<LessonStore>((set) => ({
  lessons: [],
  isLoading: false,
  error: null,

  fetchLessons: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch("http://localhost:8080/lessons")
      if (!response.ok) throw new Error("Failed to fetch lessons")

      const lessons = await response.json()
      set({ lessons, isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Error fetching lessons",
      })
    }
  },
}))
