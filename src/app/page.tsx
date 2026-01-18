export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            True/False Quiz Generator
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Create engaging true or false quizzes instantly
          </p>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                How to Use
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter your quiz topic or subject</li>
                <li>Choose the number of questions</li>
                <li>Click generate to create your quiz</li>
                <li>Share or export your quiz</li>
              </ol>
            </div>
            
            <div className="text-center">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
