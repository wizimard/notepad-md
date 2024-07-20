interface Note {
  id: number
  name: string
  category_id: number
  content: string
  tags: string[]
  created_at: number
  updated_at: number
}

export default Note
