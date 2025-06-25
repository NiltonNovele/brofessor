'use client';

import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Companion {
  id: string;
  name: string;
}

export default function PracticeQuizzesPage() {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [pastedText, setPastedText] = useState('');
  const [selectedCompanion, setSelectedCompanion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const companions: Companion[] = [
    { id: '1', name: 'Biology Bro' },
    { id: '2', name: 'Math Master' },
    { id: '3', name: 'History Hero' },
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = selectedOption;
      setAnswers(updatedAnswers);
      setSelectedOption(null);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
    setSelectedOption(answers[currentIndex - 1] || null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError('');
    setTimeout(() => {
      // Mocked quiz generation
      setQuiz(mockQuiz);
      setCurrentIndex(0);
      setAnswers([]);
      setLoading(false);
    }, 1000);
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    setLoading(true);
    setError('');
    setTimeout(() => {
      setQuiz(mockQuiz);
      setCurrentIndex(0);
      setAnswers([]);
      setLoading(false);
    }, 1000);
  };

  const handleCompanionSelect = () => {
    if (!selectedCompanion) return;
    setLoading(true);
    setError('');
    setTimeout(() => {
      setQuiz(mockQuiz);
      setCurrentIndex(0);
      setAnswers([]);
      setLoading(false);
    }, 1000);
  };

  const mockQuiz: QuizQuestion[] = [
    {
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Body'],
      correctAnswer: 'Mitochondria',
    },
    {
      question: 'What is 9 + 10?',
      options: ['18', '19', '20', '21'],
      correctAnswer: '19',
    },
  ];

  if (quiz.length > 0 && currentIndex < quiz.length) {
    const currentQuestion = quiz[currentIndex];

    return (
      <main className="max-w-3xl mx-auto p-6 flex flex-col items-center space-y-6">
        <div className="w-full bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-3">{`Question ${currentIndex + 1} of ${quiz.length}`}</h2>
          <p className="mb-4 text-lg font-medium">{currentQuestion.question}</p>
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`p-3 border rounded cursor-pointer transition ${
                  selectedOption === option ? 'bg-purple-100 border-purple-500' : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentIndex}`}
                  value={option}
                  className="mr-2"
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                {option}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className="px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {currentIndex === quiz.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // No quiz in progress
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Practice Quizzes & Tests</h1>

      {/* Upload */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">📁 Upload a Document</h2>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="border rounded px-3 py-2 w-full"
          aria-label="Upload a text document"
        />
        <p className="text-sm mt-2 text-gray-600">Upload a .txt file to auto-generate a quiz.</p>
      </section>

      {/* Paste */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">📋 Paste Text</h2>
        <textarea
          rows={6}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder="Paste your material here..."
          className="border rounded p-3 w-full resize-y"
          aria-label="Paste text for quiz generation"
        />
        <button
          onClick={handlePasteSubmit}
          className="mt-3 px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          disabled={loading}
        >
          Generate Quiz
        </button>
      </section>

      {/* Companion */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">🤝 Generate from Companion</h2>
        <select
          value={selectedCompanion}
          onChange={(e) => setSelectedCompanion(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">Select a companion...</option>
          {companions.map((comp) => (
            <option key={comp.id} value={comp.name}>
              {comp.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleCompanionSelect}
          className="mt-3 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          Generate Quiz
        </button>
      </section>

      {loading && <p className="text-center text-gray-500">Generating quiz...</p>}
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
    </main>
  );
}
