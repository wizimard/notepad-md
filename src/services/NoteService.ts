import Note, { SEARCH_NOTES_REQUEST_PARAMS_TYPE } from '@/types/request/note'
import Category from '@/types/request/category'
import axios, { AxiosInstance } from 'axios'

const NOTES_PER_PAGE = 10

class NoteService {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3000/'
    })
  }

  async getNotes(page: number = 0) {
    return await this.axios.get<Note[]>(
      `/notes?_page=${page}&_per_page=${NOTES_PER_PAGE}&_sort=-updated_at`
    )
  }

  async getCategoryNotes(categoryId: string) {
    return await this.axios.get<Note[]>(`/notes?category_id=${categoryId}`)
  }

  async getNote(id: string) {
    return await this.axios.get<Note>(`/notes/${id}`)
  }
  async searchNotes(params: SEARCH_NOTES_REQUEST_PARAMS_TYPE, page: number = 1) {
    const response = await this.axios.get<Note[]>(
      `/notes?_page=${page}&_per_page=${NOTES_PER_PAGE}&_sort=-updated_at${params.name ? `&name_like=${params.name}` : ''}${params.category_id ? `&category_id=${params.category_id}` : ''}`
    )
    return response.data.filter((note) => {
      let isPass = true

      for (const tag of params.tags) {
        if (!note.tags.includes(tag)) {
          isPass = false
          break
        }
      }

      return isPass
    })
  }
  async deleteNote(id: string) {
    return await this.axios.delete<Note>(`/notes/${id}`)
  }

  async getCategories() {
    return await this.axios.get<Category[]>('/categories')
  }
}

const noteService = new NoteService()

export default noteService
