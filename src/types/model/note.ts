import { GeneralEntity } from './general'

type Note = GeneralEntity & {
  category: GeneralEntity
  content: string
  tags: string[]
  created_at: Date
  updated_at: Date
}

export default Note
