import { connectToDB } from '@/lib/mongoose'
import { LibraryEntry } from '@/models/LibraryEntry'

export async function POST(req: Request) {
  const body = await req.json()
  const { title, subject, fileUrl } = body

  if (!title || !subject || !fileUrl) {
    return new Response('Missing fields', { status: 400 })
  }

  try {
    await connectToDB()
    const entry = await LibraryEntry.create({ title, subject, fileUrl })
    return new Response(JSON.stringify(entry), { status: 201 })
  } catch (error) {
    return new Response('Server error', { status: 500 })
  }
}
