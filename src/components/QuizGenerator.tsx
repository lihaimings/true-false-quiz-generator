'use client';

import { useState } from 'react';
import { Download, Share2, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answer: boolean;
  explanation?: string;
}

export default function QuizGenerator() {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const generateQuestions = () => {
    if (!topic.trim()) {
      alert('Please enter a topic for your quiz');
      return;
    }

    setIsGenerating(true);
    
    // Simulate quiz generation
    setTimeout(() => {
      const generatedQuestions: Question[] = Array.from({ length: numQuestions }, (_, i) => ({
        id: i + 1,
        question: `${topic} - Sample question ${i + 1}. Is this statement true?`,
        answer: Math.random() > 0.5,
        explanation: `This is an explanation for question ${i + 1} about ${topic}.`
      }));
      
      setQuestions(generatedQuestions);
      setIsGenerating(false);
      setShowQuiz(true);
    }, 1500);
  };

  const downloadQuiz = () => {
    const quizData = {
      topic,
      questions: questions.map(q => ({
        question: q.question,
        answer: q.answer ? 'True' : 'False',
        explanation: q.explanation
      }))
    };
    
    const blob = new Blob([JSON.stringify(quizData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-quiz.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareQuiz = () => {
    const quizText = questions.map((q, i) => 
      `${i + 1}. ${q.question}\nAnswer: ${q.answer ? 'True' : 'False'}\n`
    ).join('\n');
    
    if (navigator.share) {
      navigator.share({
        title: `${topic} Quiz`,
        text: quizText
      }).catch(() => {
        copyToClipboard(quizText);
      });
    } else {
      copyToClipboard(quizText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Quiz copied to clipboard!');
    });
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuestions([]);
    setTopic('');
    setNumQuestions(5);
  };

  if (showQuiz && questions.length > 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Your {topic} Quiz
          </h2>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            New Quiz
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
                  {q.id}
                </span>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium mb-2">{q.question}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">Answer:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      q.answer 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {q.answer ? 'True' : 'False'}
                    </span>
                  </div>
                  {q.explanation && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-semibold">Explanation:</span> {q.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={downloadQuiz}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Quiz
          </button>
          <button
            onClick={shareQuiz}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
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

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., World History, Science, Geography"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Questions: {numQuestions}
          </label>
          <input
            id="numQuestions"
            type="range"
            min="3"
            max="20"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>3</span>
            <span>20</span>
          </div>
        </div>

        <button
          onClick={generateQuestions}
          disabled={isGenerating}
          className="w-full bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              Generating...
            </span>
          ) : (
            'Generate Quiz'
          )}
        </button>
      </div>
    </div>
  );
}
