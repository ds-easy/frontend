import { Link } from "react-router-dom"

export function HowToPage() {
  return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-3xl font-bold text-[#0D1E4C]">How To Use DsEasy</h1>
			<div className="bg-white p-6 rounded-lg shadow-md">
				<div className="prose prose-lg max-w-none">
					<h2 className="text-2xl font-semibold text-[#0D1E4C] mt-6 mb-4">Getting Started</h2>
					<ol className="list-decimal pl-6 mb-4">
						<li className="mb-2">Create an account or log in to your existing account.</li>
						<li className="mb-2">Navigate to the "Create Exam" page from the main dashboard.</li>
						<li className="mb-2">Choose your desired lesson and template from the dropdown menus.</li>
						<li className="mb-2">Specify the number of exercises and the exam number.</li>
						<li className="mb-2">Set the date for when the exam will be administered.</li>
						<li className="mb-2">Click "Generate Exam" to create your customized exam.</li>
					</ol>

					<h2 className="text-2xl font-semibold text-[#0D1E4C] mt-6 mb-4">Creating an Exam</h2>
					<p className="mb-4">
						To create an exam, follow these steps:
					</p>
					<ol className="list-decimal pl-6 mb-4">
						<li className="mb-2">Select the appropriate lesson from the dropdown menu.</li>
						<li className="mb-2">Choose a template that fits your exam structure.</li>
						<li className="mb-2">Enter the number of exercises you want in your exam.</li>
						<li className="mb-2">Specify the exam number for your records.</li>
						<li className="mb-2">Set the date when the exam will be administered.</li>
						<li className="mb-2">Review your selections and click "Generate Exam".</li>
						<li className="mb-2">Preview the generated PDF and make any necessary adjustments.</li>
						<li className="mb-2">Download or save the final exam for your use.</li>
					</ol>

					<h2 className="text-2xl font-semibold text-[#0D1E4C] mt-6 mb-4">Uploading Exercises</h2>
					<p className="mb-4">
						To contribute exercises to our database:
					</p>
					<ol className="list-decimal pl-6 mb-4">
						<li className="mb-2">Navigate to the "Upload Exercise" page.</li>
						<li className="mb-2">Select the relevant lesson and topic for your exercise.</li>
						<li className="mb-2">Type or paste your exercise into the provided text area.</li>
						<li className="mb-2">Add any necessary images or diagrams.</li>
						<li className="mb-2">Provide a solution or answer key for the exercise.</li>
						<li className="mb-2">Submit the exercise for review.</li>
					</ol>

					<h2 className="text-2xl font-semibold text-[#0D1E4C] mt-6 mb-4">Tips for Effective Use</h2>
					<ul className="list-disc pl-6 mb-4">
						<li className="mb-2">Regularly update your exercise database to ensure a diverse range of questions.</li>
						<li className="mb-2">Use different templates to vary the structure of your exams.</li>
						<li className="mb-2">Collaborate with colleagues by sharing your created exams and exercises.</li>
						<li className="mb-2">Utilize the preview function to ensure your exam looks exactly as you want it.</li>
						<li className="mb-2">Keep track of your exam history to avoid repetition and ensure balanced assessment over time.</li>
					</ul>

					<h2 className="text-2xl font-semibold text-[#0D1E4C] mt-6 mb-4">Need Help?</h2>
					<p className="mb-4">
						If you encounter any issues or have questions, please don't hesitate to contact our support team. We're here to ensure your experience with DsEasy is smooth and efficient.
					</p>

					<div className="mt-8 text-center">
						<Link to="/create-exam" className="inline-block bg-[#0D1E4C] text-white py-2 px-6 rounded-md hover:bg-[#0D1E4C]/90 transition-colors">
							Start Creating Your Exam
						</Link>
					</div>
				</div>
			</div>
		</div>


  )
}
