import ModalType from '@/types/components/modal'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

type ModalStoreType = ModalType & {
  id: string
}

export const modalActions = ['edit', 'delete', 'create']

const useModalStore = defineStore('modal', () => {
  const router = useRouter()

  const modals = reactive<Array<ModalStoreType>>([])

  const addModal = (modal: ModalType) => {
    modals.push({
      ...modal,
      id: Math.random().toString(16).slice(2)
    })
  }

  const deleteModal = (id?: string) => {
    router.replace({ query: undefined })
    if (!id) {
      modals.pop()
      return
    }
    const index = modals.map((modal) => modal.id).indexOf(id)

    modals.splice(index, 1)
  }

  return { modals, addModal, deleteModal }
})

export default useModalStore
