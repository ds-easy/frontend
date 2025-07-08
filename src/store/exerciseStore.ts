import { create } from "zustand"

interface ExerciseStore {
  isLoading: boolean
  error: string | null
  uploadExercise: (formData: FormData) => Promise<void>
}

export const useExerciseStore = create<ExerciseStore>((set) => ({
  isLoading: false,
  error: null,

  uploadExercise: async (formData) => {
    set({ isLoading: true, error: null })

    try {
      const res = await fetch("http://localhost:8080/exercises", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        let msg = `Upload failed: ${res.statusText}`
        try {
          const err = await res.json()
          if (err?.error) msg = err.error
        } catch {}
        throw new Error(msg)
      }

      set({ isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error uploading exercise",
        isLoading: false,
      })
    }
  },
}))

