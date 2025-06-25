"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {subjects} from "@/constants";
import {Textarea} from "@/components/ui/textarea";
import {createCompanion} from "@/lib/actions/companion.actions";
import {redirect} from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required.'}),
    subject: z.string().min(1, { message: 'Subject is required.'}),
    topic: z.string().min(1, { message: 'Topic is required.'}),
    voice: z.string().min(1, { message: 'Voice is required.'}),
    style: z.string().min(1, { message: 'Style is required.'}),
    duration: z.coerce.number().min(1, { message: 'Duration is required.'}),
})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);

        if(companion) {
            redirect(`/companions/${companion.id}`);
        } else {
            console.log('Failed to create a companion');
            redirect('/');
        }
    }

    type Note = {
  _id: string
  title: string
  subject: string
  fileUrl: string
}

const [notes, setNotes] = useState<Note[]>([])
const [searchTerm, setSearchTerm] = useState('')
const [attachedNotes, setAttachedNotes] = useState<string[]>([])

const filteredNotes = notes.filter(
  (note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
)

const handleToggleNote = (id: string) => {
  setAttachedNotes((prev) =>
    prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]
  )
}

// Fetch all available notes once
useEffect(() => {
  const fetchNotes = async () => {
    const res = await fetch("/api/library")
    const data = await res.json()
    setNotes(data)
  }
  fetchNotes()
}, [])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the companion name"
                                    {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key={subject}
                                                className="capitalize"
                                            >
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
  control={form.control}
  name="topic"
  render={({ field }) => (
    <FormItem>
      <FormLabel>What should the companion help with?</FormLabel>
      <FormControl>
        <Textarea
          placeholder="Ex. Derivatives & Integrals"
          {...field}
          className="input"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Attach Notes Section */}
<div className="mt-6 space-y-3">
  <h3 className="font-medium text-gray-800">📎 Attach Notes from Library</h3>

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search notes by title or subject..."
    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {/* Notes List */}
  <div className="max-h-48 overflow-y-auto border rounded-md p-2 bg-white">
    {filteredNotes.length > 0 ? (
      filteredNotes.map((note) => (
        <label key={note._id} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={attachedNotes.includes(note._id)}
            onChange={() => handleToggleNote(note._id)}
          />
          <span className="text-sm">
            <strong>{note.title}</strong> <span className="text-gray-500">({note.subject})</span>
          </span>
        </label>
      ))
    ) : (
      <p className="text-sm text-gray-400 italic">No matching notes found.</p>
    )}
  </div>

  {/* Preview Selected */}
  {attachedNotes.length > 0 && (
    <div className="text-sm text-gray-700">
      Attached: {attachedNotes.length} note{attachedNotes.length > 1 ? 's' : ''}
    </div>
  )}
</div>


                

                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue
                                            placeholder="Select the voice"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue
                                            placeholder="Select the style"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal">
                                            Formal
                                        </SelectItem>
                                        <SelectItem value="casual">
                                            Casual
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration in minutes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="15"
                                    {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
            </form>
        </Form>
    )
}

export default CompanionForm
