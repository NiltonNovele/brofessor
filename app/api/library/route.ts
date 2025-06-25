import { connectToDB } from '@/lib/mongoose'
import { LibraryEntry } from '@/models/LibraryEntry'

export async function GET() {
  try {
    await connectToDB()
    const entries = await LibraryEntry.find().sort({ createdAt: -1 })
    return new Response(JSON.stringify(entries), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch', { status: 500 })
  }
}
