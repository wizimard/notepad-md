export type ModalEditType = {
  type: 'edit'
  data: {
    id: number
  }
}
export type ModalCreateType = {
  type: 'create'
  data: undefined
}
export type ModalDeleteType = {
  type: 'delete'
  data: {
    id: number
  }
}

type GeneralModalType = {
  type: string
  data: any
}

type ModalType = GeneralModalType | ModalEditType | ModalCreateType | ModalDeleteType

export default ModalType
