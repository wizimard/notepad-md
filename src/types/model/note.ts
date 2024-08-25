import { GeneralEntity } from './general'

export type SHORT_NOTE = GeneralEntity & {
  content: string
}

type Note = GeneralEntity & {
  category: GeneralEntity
  content: string
  tags: string[]
  created_at: Date
  updated_at: Date
}

export default Note
