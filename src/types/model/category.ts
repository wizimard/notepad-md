import { GeneralEntity } from './general'

type Category = GeneralEntity & {
  notes: GeneralEntity[]
}

export default Category
