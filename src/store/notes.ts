import noteService from '@/services/NoteService'
import Category from '@/types/model/category'
import Note from '@/types/model/note'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

interface categoryNote {
  [key: number]: any[]
}

const useNotesStore = defineStore('notes', () => {
  const notes = reactive<Note[]>([])
  const currentNote = ref<Note | null>(null)
  const categories = reactive<Category[]>([])

  const getData = async () => {
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
  }

  return { notes, currentNote, categories, getData }
})

export default useNotesStore
