import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { HomePage } from "./pages/HomePage"
import { CreateExamPage } from "./pages/CreateExamPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-exam" element={<CreateExamPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
