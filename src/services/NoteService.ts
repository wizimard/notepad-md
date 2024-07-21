import Note from '@/types/request/note'
import Category from '@/types/request/category'
import axios, { AxiosInstance } from 'axios'

class NoteService {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3000/'
    })
  }

  async getNotes() {
    return await this.axios.get<Note[]>('/notes')
  }

  async getNote(id: number) {
    return await this.axios.get<Note>(`/notes/${id}`)
  }
  async deleteNote(id: number) {
    return await this.axios.delete<Note>(`/notes/${id}`)
  }

  async getCategories() {
    return await this.axios.get<Category[]>('/categories')
  }
}

const noteService = new NoteService()

export default noteService
