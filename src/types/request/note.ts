interface Note {
  id: string
  name: string
  category_id: string
  content: string
  tags: string[]
  created_at: number
  updated_at: number
}

export type GET_NOTES_RESPONSE_TYPE = {
  data: Note[]
  first: number
  items: number
  last: number
  next: string | null
  pages: number
  prev: string | null
}

export type SEARCH_NOTES_REQUEST_PARAMS_TYPE = {
  name: string
  tags: string[]
  category_id?: number
}

export default Note
