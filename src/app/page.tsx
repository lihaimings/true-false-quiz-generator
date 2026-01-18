import QuizGenerator from '@/src/components/QuizGenerator';

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
          
          <QuizGenerator />
        </div>
      </div>
    </main>
  );
}
