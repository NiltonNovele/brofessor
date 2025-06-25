'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AcademicCalendar from '@/components/AcademicCalendar'

export default function PracticePage() {
  const router = useRouter()

  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadSubject, setUploadSubject] = useState('')
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  const [library, setLibrary] = useState<
    {
      title: string
      subject: string
      file?: File // local files before upload
      fileUrl?: string // Cloudinary link after upload
      fileName?: string // filename after upload
    }[]
  >([])

  const [showUnavailableModal, setShowUnavailableModal] = useState(false)

  // Optional: load existing entries from DB
  useEffect(() => {
    const fetchLibrary = async () => {
      const res = await fetch('/api/library')
      if (res.ok) {
        const data = await res.json()
        setLibrary(data)
      }
    }

    fetchLibrary()
  }, [])

  const handleUnavailableFeature = () => {
    setShowUnavailableModal(true)
  }

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([newTodo, ...todos])
      setNewTodo('')
    }
  }

  const handleRemoveTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const handleAddDocument = async () => {
    if (!uploadTitle || !uploadSubject || !uploadFile) return

    const formData = new FormData()
    formData.append('file', uploadFile)
    formData.append('upload_preset', 'brofessor-notes')

    const cloudinaryRes = await fetch('https://api.cloudinary.com/v1_1/dftqrcbns/upload', {
      method: 'POST',
      body: formData,
    })

    const cloudinaryData = await cloudinaryRes.json()
    const fileUrl = cloudinaryData.secure_url
    const fileName = cloudinaryData.original_filename + '.' + cloudinaryData.format

    const response = await fetch('/api/library/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: uploadTitle,
        subject: uploadSubject,
        fileUrl,
        fileName,
      }),
    })

    if (response.ok) {
      const newEntry = await response.json()
      setLibrary([newEntry, ...library])
      setUploadTitle('')
      setUploadSubject('')
      setUploadFile(null)
    }
  }

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-12 relative">
      {/* Modal */}
      {showUnavailableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center space-y-4">
            <h3 className="text-lg font-semibold text-orange-600">🚫 Feature Unavailable</h3>
            <p className="text-sm text-gray-700">
              These features are not yet available for your account.<br />
              Please contact support or Instagram <strong>@brofessor.app</strong>.
            </p>
            <button
              onClick={() => setShowUnavailableModal(false)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-orange-600">📚 Practice Hub</h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto -mt-4">
        Boost your learning with tools like flashcards, quizzes, a smart calendar, and an academic library.
      </p>

      {/* Feature Cards */}
      <section className="grid sm:grid-cols-2 gap-8">
        <div
          role="button"
          tabIndex={0}
          onClick={handleUnavailableFeature}
          onKeyDown={(e) => e.key === 'Enter' && handleUnavailableFeature()}
          className="cursor-pointer bg-gradient-to-br from-purple-600 to-violet-800 text-white p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all focus:outline-none focus:ring-4 focus:ring-violet-400 relative"
        >
          <div className="absolute top-6 left-6 bg-violet-900/40 rounded-full w-12 h-12 flex items-center justify-center text-3xl">🎴</div>
          <h2 className="text-2xl font-bold mb-2 pl-20 drop-shadow-md">Create Flashcards</h2>
          <p className="text-sm text-white/90 pl-20">Design your own cards to review key concepts.</p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={handleUnavailableFeature}
          onKeyDown={(e) => e.key === 'Enter' && handleUnavailableFeature()}
          className="cursor-pointer bg-gradient-to-br from-green-600 to-emerald-800 text-white p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400 relative"
        >
          <div className="absolute top-6 left-6 bg-emerald-900/40 rounded-full w-12 h-12 flex items-center justify-center text-3xl">📝</div>
          <h2 className="text-2xl font-bold mb-2 pl-20 drop-shadow-md">Generate Practice Quiz</h2>
          <p className="text-sm text-white/90 pl-20">Automatically or manually create quizzes to test yourself.</p>
        </div>
      </section>

      {/* Calendar */}
      <section>
        <h2 className="text-2xl font-bold text-orange-600 mb-4">📅 Smart Calendar</h2>
        <AcademicCalendar />
      </section>

      {/* Library */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">📂 Academic Library</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Title</label>
            <input
              type="text"
              placeholder="e.g. Photosynthesis Notes"
              className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Subject</label>
            <input
              type="text"
              placeholder="e.g. Biology"
              className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              value={uploadSubject}
              onChange={(e) => setUploadSubject(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Document</label>
            <input
              type="file"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleAddDocument}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={!uploadFile || !uploadTitle || !uploadSubject}
        >
          Add to Library
        </button>

        {/* Document List */}
        {library.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {library.map((entry, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg border hover:shadow transition"
              >
                <p className="font-semibold">{entry.title}</p>
                <p className="text-sm text-gray-600 mb-1">Subject: {entry.subject}</p>
                <a
                  href={entry.fileUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  {entry.file?.name || entry.fileName || 'View Document'}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-4">No documents uploaded yet.</p>
        )}
      </section>
    </main>
  )
}
