import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-[#0D1E4C]">About Us</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="prose prose-lg max-w-none">
          <p className="mb-4">
            Welcome to DsEasy, where we're revolutionizing the way exams are created and shared in the academic world.
          </p>

          <p className="mb-4">
            We are a passionate group of students and teachers united by a common goal: to make examination easier for
            everyone. Our journey began with a simple observation - the process of creating exams and sharing exercises
            among educators could be significantly improved.
          </p>

          <h2 className="text-2xl font-semibold text-[#0D1E4C] mt-6 mb-4">Our Mission</h2>

          <p className="mb-4">
            At DsEasy, we believe that by streamlining the exam creation process, we can alleviate the stress on
            teachers and allow them to focus more on what truly matters - nurturing young minds and fostering a love for
            learning.
          </p>

          <p className="mb-4">
            Our mission is to create a platform that empowers educators to effortlessly generate exams, share exercises,
            and collaborate with peers. We aim to build a community where knowledge and resources are freely exchanged,
            ultimately benefiting students through well-crafted, diverse, and engaging assessments.
          </p>

          <h2 className="text-2xl font-semibold text-[#0D1E4C] mt-6 mb-4">Why Choose DsEasy?</h2>

          <ul className="list-disc pl-6 mb-4">
            <li>Created by educators for educators</li>
            <li>Simplifies the exam creation process</li>
            <li>Facilitates sharing and collaboration among teachers</li>
            <li>Constantly evolving based on user feedback</li>
            <li>Committed to improving the educational experience for all</li>
          </ul>

          <p className="mb-4">
            Join us in our mission to make examination easier for professors around the world. Together, we can create a
            more efficient, collaborative, and enjoyable educational environment.
          </p>

          <div className="mt-8 text-center">
            <Link to="/create-exam">
              <Button className="bg-[#0D1E4C] text-white py-2 px-6 rounded-md hover:bg-[#0D1E4C]/90 transition-colors">
                Get Started with DsEasy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
