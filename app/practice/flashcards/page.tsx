'use client';

import React, { useState, useEffect } from 'react';

type Flashcard = {
  question: string;
  answer: string;
  reference?: string;
};

const pastelColors = [
  'bg-pink-100',
  'bg-purple-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-blue-100',
  'bg-orange-100',
  'bg-teal-100',
];

export default function FlashcardsPage() {
  // Inputs and flashcards data
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [selectedCompanion, setSelectedCompanion] = useState<string>('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Study mode state
  const [studyStarted, setStudyStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // User feedback per card
  const [knewAnswer, setKnewAnswer] = useState<boolean[]>([]);
  const [hadToFlip, setHadToFlip] = useState<boolean[]>([]);

  // Dummy companion list
  const companions = [
    { id: 'comp1', name: 'Math Companion' },
    { id: 'comp2', name: 'History Companion' },
    { id: 'comp3', name: 'Science Companion' },
  ];

  // Generate flashcards from text (simulate)
  async function generateFlashcardsFromText(text: string) {
    setLoading(true);
    setError(null);
    setStudyStarted(false);
    setCurrentIndex(0);
    setFlipped(false);
    try {
      await new Promise((r) => setTimeout(r, 1000));

      // Create flashcards (up to 7)
      const cards = text
        .split('.')
        .filter(Boolean)
        .slice(0, 7)
        .map((sentence, i) => ({
          question: `Q${i + 1}: What is this about?`,
          answer: sentence.trim(),
          reference: `Source ${i + 1}`,
        }));

      setFlashcards(cards);
      setKnewAnswer(new Array(cards.length).fill(false));
      setHadToFlip(new Array(cards.length).fill(false));
      setStudyStarted(true);
    } catch {
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Handle file upload (only .txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFlashcards([]);
    setError(null);
    setStudyStarted(false);
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          generateFlashcardsFromText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle pasted text submission
  const handlePasteSubmit = () => {
    if (!pastedText.trim()) {
      setError('Please paste some text to generate flashcards.');
      return;
    }
    setFlashcards([]);
    setError(null);
    setStudyStarted(false);
    generateFlashcardsFromText(pastedText);
  };

  // Handle companion selection
  const handleCompanionSelect = () => {
    if (!selectedCompanion) {
      setError('Please select a companion to generate flashcards.');
      return;
    }
    setFlashcards([]);
    setError(null);
    setLoading(true);
    setStudyStarted(false);

    setTimeout(() => {
      const cards = [
        {
          question: 'What does the companion cover?',
          answer: `Flashcards generated from ${selectedCompanion}`,
          reference: 'Companion Source',
        },
        {
          question: 'How to use the companion?',
          answer: 'Use it to study key topics easily.',
          reference: 'Companion Source',
        },
      ];
      setFlashcards(cards);
      setKnewAnswer(new Array(cards.length).fill(false));
      setHadToFlip(new Array(cards.length).fill(false));
      setStudyStarted(true);
      setLoading(false);
    }, 1000);
  };

  // Flip card on click
  const toggleFlip = () => {
    setFlipped((f) => {
      if (!f) {
        // If user flips to back, mark hadToFlip for current card
        const updatedHadToFlip = [...hadToFlip];
        updatedHadToFlip[currentIndex] = true;
        setHadToFlip(updatedHadToFlip);
      }
      return !f;
    });
  };

  // Handle checkbox changes
  const handleKnewChange = (checked: boolean) => {
    const updated = [...knewAnswer];
    updated[currentIndex] = checked;
    setKnewAnswer(updated);
  };

  const handleFlipChange = (checked: boolean) => {
    const updated = [...hadToFlip];
    updated[currentIndex] = checked;
    setHadToFlip(updated);
  };

  // Next card
  const goNext = () => {
    setFlipped(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  // Previous card
  const goPrev = () => {
    setFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  // Restart session
  const restart = () => {
    setStudyStarted(false);
    setFlashcards([]);
    setUploadFile(null);
    setPastedText('');
    setSelectedCompanion('');
    setError(null);
    setLoading(false);
    setCurrentIndex(0);
    setFlipped(false);
    setKnewAnswer([]);
    setHadToFlip([]);
  };

  // Calculate summary stats
  const knownCount = knewAnswer.filter(Boolean).length;
  const flippedCount = hadToFlip.filter(Boolean).length;

  // If study mode started, show flashcard viewer
  if (studyStarted && flashcards.length > 0) {
    if (currentIndex >= flashcards.length) {
      // Show summary

//       async function generateFlashcardsFromText(text: string) {
//   setLoading(true);
//   setError(null);
//   setStudyStarted(false);
//   setCurrentIndex(0);
//   setFlipped(false);
//   try {
//     const res = await fetch('/api/generate-flashcards', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text }),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setError(data.error || 'Failed to generate flashcards');
//       setLoading(false);
//       return;
//     }

//     if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) {
//       setError('No flashcards generated');
//       setLoading(false);
//       return;
//     }

//     setFlashcards(data.flashcards);
//     setKnewAnswer(new Array(data.flashcards.length).fill(false));
//     setHadToFlip(new Array(data.flashcards.length).fill(false));
//     setStudyStarted(true);
//   } catch {
//     setError('Network error while generating flashcards');
//   } finally {
//     setLoading(false);
//   }
// }

      return (
        <main className="max-w-3xl mx-auto p-6 text-center space-y-6">
          <h1 className="text-4xl font-bold">Study Session Complete!</h1>
          <p className="text-lg">
            You knew <span className="font-semibold">{knownCount}</span> out of{' '}
            <span className="font-semibold">{flashcards.length}</span> flashcards.
          </p>
          <p className="text-lg">
            You had to flip around <span className="font-semibold">{flippedCount}</span> times.
          </p>
          <button
            onClick={restart}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Start Over
          </button>
        </main>
      );
    }

    const card = flashcards[currentIndex];
    const colorClass = pastelColors[currentIndex % pastelColors.length];

    return (
      <main className="max-w-3xl mx-auto p-6 flex flex-col items-center space-y-6 select-none">
        <div
          onClick={toggleFlip}
          className={`relative w-80 h-48 perspective cursor-pointer`}
          aria-label="Flashcard. Click to flip."
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? toggleFlip() : null)}
        >
          <div
            className={`relative w-full h-full duration-700 transform-style preserve-3d ${
              flipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front */}
            <div
              className={`absolute w-full h-full rounded-xl shadow-lg flex flex-col justify-center items-center p-6 text-center text-gray-900 ${colorClass} backface-hidden`}
            >
              <p className="text-xl font-semibold">{card.question}</p>
              <p className="mt-2 text-sm text-gray-700 italic">Click to see answer</p>
            </div>

            {/* Back */}
            <div
              className={`absolute w-full h-full rounded-xl shadow-lg flex flex-col justify-between p-6 text-center bg-white text-gray-900 rotate-y-180 backface-hidden`}
              style={{ border: '2px solid #ccc' }}
            >
              <div>
                <p className="text-xl font-semibold mb-3">Answer</p>
                <p className="mb-4">{card.answer}</p>
              </div>

              <p className="text-xs text-gray-500 italic">Reference: {card.reference ?? 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="w-80 flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={knewAnswer[currentIndex] || false}
              onChange={(e) => handleKnewChange(e.target.checked)}
              className="w-5 h-5 accent-purple-600"
            />
            <span>I knew this answer</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hadToFlip[currentIndex] || false}
              onChange={(e) => handleFlipChange(e.target.checked)}
              className="w-5 h-5 accent-purple-600"
            />
            <span>I had to flip it around</span>
          </label>
        </div>

        <div className="flex gap-6 mt-4">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition`}
          >
            Previous
          </button>
          <button
            onClick={goNext}
            className="px-6 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            {currentIndex === flashcards.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </main>
    );
  }

  // If not in study mode, show input options
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Generate Flashcards</h1>

      {/* 1. Upload Document */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">📁 Upload a Document</h2>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="border rounded px-3 py-2 w-full"
          aria-label="Upload a text document to generate flashcards"
        />
        <p className="text-sm mt-2 text-gray-600">Upload a .txt file and flashcards will be generated from its content.</p>
      </section>

      {/* 2. Paste Text */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">📋 Paste Text</h2>
        <textarea
          rows={6}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder="Paste your study material here..."
          className="border rounded p-3 w-full resize-y"
          aria-label="Paste text to generate flashcards"
        />
        <button
          onClick={handlePasteSubmit}
          className="mt-3 px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          disabled={loading}
        >
          Generate Flashcards
        </button>
      </section>

      {/* 3. Select from Companion */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">🤝 Generate from Companion</h2>
        <select
          value={selectedCompanion}
          onChange={(e) => setSelectedCompanion(e.target.value)}
          className="border rounded p-2 w-full"
          aria-label="Select a companion to generate flashcards from"
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
          Generate Flashcards
        </button>
      </section>

      {/* Loading and error states */}
      {loading && <p className="text-center text-gray-500">Generating flashcards...</p>}
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
    </main>
  );
}
