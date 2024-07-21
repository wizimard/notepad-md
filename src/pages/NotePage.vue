<script setup lang="ts">
import { Notes, Categories, CurrentNote, Modal } from '@/components'
import useModalStore, { modalActions } from '@/store/modal'
import useNotesStore from '@/store/notes'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const state = useNotesStore()
const { addModal } = useModalStore()
const route = useRoute()

state.getData()

watch(
  () => {
    route.params.id, route.query.action
  },
  () => {
    if (typeof route.params.id !== 'string' && typeof route.query.action !== 'string') return

    const action = route.query.action as string
    const id = parseInt(route.params.id as string)

    if (modalActions.includes(action)) {
      const newModal = {
        type: action,
        data: id ? { id: id } : undefined
      }

      addModal(newModal)
    }
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <main>
    <Notes />
    <CurrentNote />
    <Categories />
    <Modal />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
