import noteService from '@/services/NoteService'
import Category from '@/types/model/category'
import Note from '@/types/model/note'
import { default as NoteRequest } from '@/types/request/note'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import useNotificationStore from './notification'

const NOTES_PER_PAGE = 10

const useNotesStore = defineStore('notes', () => {
  const { addNotification } = useNotificationStore()

  let isGettedAllNotes = false
  const notes = reactive<Note[]>([])
  const currentNote = ref<Note | null>(null)
  const categories = reactive<Category[]>([])

  const formatNote = (note: NoteRequest) => {
    const category = categories.filter((category) => category.id == note.category_id)[0]

    if (!category) {
      console.error('Category not found, category_id: ' + note.category_id)
      return null
    }

    return {
      ...note,
      category,
      created_at: new Date(note.created_at),
      updated_at: new Date(note.updated_at)
    }
  }

  const getCategories = async () => {
    try {
      const gettedCategories = (await noteService.getCategories()).data

      categories.push(...gettedCategories)
    } catch (err) {
      console.error('Error get categories', err)
      addNotification('error', 'Something wrong when getting notes!')
    }
  }

  const getNotes = async () => {
    if (isGettedAllNotes) return
    try {
      const page = Math.floor(notes.length / NOTES_PER_PAGE) + 1
      const getNotesResponse = (await noteService.getNotes(page)).data
      const newNotes: Note[] = []

      isGettedAllNotes = !getNotesResponse.next

      getNotesResponse.data.forEach((noteResponse) => {
        if (notes.find((note) => note.id === noteResponse.id)) return
        const note = formatNote(noteResponse)
        if (note) newNotes.push(note)
      })

      notes.push(...newNotes)
    } catch (err) {
      console.error('Error get notes', err)
      addNotification('error', 'Something wrong when getting notes!')
    }
  }

  const getNote = async (id: string) => {
    const findNote = notes.find((note) => note.id == id)
    if (findNote) return findNote

    try {
      const gettedNote = (await noteService.getNote(id)).data

      const note = formatNote(gettedNote)

      if (!note) return null

      return note
    } catch (err) {
      console.error('Error get note:', err)
      addNotification('error', 'Something wrong when getting the note!')
      return null
    }
  }

  const getCategoryNotes = async (categoryId: string) => {
    try {
      return (await noteService.getCategoryNotes(categoryId)).data
    } catch (err) {
      console.error(`Error get category notes, category id - ${categoryId}`, err)
      addNotification('error', 'Something wrong when getting category notes!')
    }
  }

  const deleteNote = async (id: string) => {
    try {
      const { id: noteId } = (await noteService.deleteNote(id)).data

      const index = notes.map((note) => note.id).indexOf(noteId)

      notes.splice(index, 1)

      addNotification('message', 'Note removed')
    } catch (err) {
      console.error('Error delete note', err)
      addNotification('error', 'Something wrong when deleting a note!')
      return false
    }
    return true
  }

  const setCurrentNote = async (id: string) => {
    const findNote = notes.find((note) => note.id == id)
    if (findNote) {
      currentNote.value = findNote
    }

    try {
      const note = await getNote(id)
      if (note) currentNote.value = note
    } catch (err) {
      console.error('Error get note:', err)
      addNotification('error', 'Something wrong when getting the note!')
      return null
    }
  }

  const clearCurrentNote = () => {
    currentNote.value = null
  }

  return {
    notes,
    currentNote,
    categories,
    getCategories,
    getNotes,
    getNote,
    getCategoryNotes,
    deleteNote,
    setCurrentNote,
    clearCurrentNote
  }
})

export default useNotesStore
