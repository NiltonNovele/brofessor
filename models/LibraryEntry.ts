import mongoose, { Schema, models, model } from 'mongoose'

const LibraryEntrySchema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Will store uploaded file URL
  createdAt: { type: Date, default: Date.now },
})

export const LibraryEntry = models.LibraryEntry || model('LibraryEntry', LibraryEntrySchema)
