import noteService from '@/services/NoteService'
import Category from '@/types/model/category'
import Note from '@/types/model/note'
import { default as NoteRequest } from '@/types/request/note'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import useNotificationStore from './notification'

interface categoryNote {
  [key: number]: any[]
}

const NOTES_PER_PAGE = 10

const useNotesStore = defineStore('notes', () => {
  const { addNotification } = useNotificationStore()

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

      gettedCategories.forEach((category) => {
        categories.push({
          ...category,
          notes: []
        })
      })
    } catch (err) {
      console.error('Error get categories', err)
      addNotification('error', 'Something wrong when getting notes!')
    }
  }

  const getNotes = async () => {
    try {
      const page = Math.floor(notes.length / NOTES_PER_PAGE) + 1
      const getNotesResponse = (await noteService.getNotes(page)).data
      const newNotes: Note[] = []

      getNotesResponse.forEach((noteResponse) => {
        const note = formatNote(noteResponse)
        if (note) newNotes.push(note)
      })

      notes.push(...newNotes)
    } catch (err) {
      console.error('Error get notes', err)
      addNotification('error', 'Something wrong when getting notes!')
    }
  }

  const getData = async () => {
    try {
      const gettedCategories = (await noteService.getCategories()).data
      const categoriesNotes: categoryNote = {}

      const getNotesResponse = await noteService.getNotes()

      getNotesResponse.data.forEach((note) => {
        const category = gettedCategories.filter((category) => {
          if (category.id == note.category_id) {
            const addNote = {
              id: note.id,
              name: note.name
            }
            if (categoriesNotes[note.category_id]) categoriesNotes[note.category_id].push(addNote)
            else categoriesNotes[note.category_id] = [addNote]
            return true
          }
          return false
        })[0]

        notes.push({
          ...note,
          category,
          created_at: new Date(note.created_at),
          updated_at: new Date(note.updated_at)
        })
      })

      gettedCategories.forEach((category) => {
        categories.push({
          ...category,
          notes: categoriesNotes[category.id]
        })
      })
    } catch (err) {
      console.error('Error get notes', err)
      addNotification('error', 'Something wrong when getting notes!')
    }
  }

  const getNote = async (id: number) => {
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

  const deleteNote = async (id: number) => {
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

  const setCurrentNote = async (id: number) => {
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

  return {
    notes,
    currentNote,
    categories,
    getCategories,
    getData,
    getNote,
    deleteNote,
    setCurrentNote
  }
})

export default useNotesStore
