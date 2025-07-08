import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { HomePage } from "./pages/HomePage"
import { CreateExamPage } from "./pages/CreateExamPage"
import { AboutPage } from "./pages/AboutPage"
import { HowToPage } from "./pages/HowToPage"
import { UploadExercisePage } from "./pages/UploadExercisePage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-exam" element={<CreateExamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-to" element={<HowToPage />} />
          <Route path="/upload-exercise" element={<UploadExercisePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
