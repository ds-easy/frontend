import { Link } from "react-router-dom"
import { User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Ds</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Ds<span className="text-blue-600">Easy</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link to="/how-to" className="text-gray-700 hover:text-gray-900 font-medium">
              How To
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium">
              About us
            </Link>
            <button className="p-2 text-gray-700 hover:text-gray-900">
              <User className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
