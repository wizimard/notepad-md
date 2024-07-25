<script setup lang="ts">
import { Notes, Categories, CurrentNote, Modal } from '@/components'
import useModalStore from '@/store/modal'
import useNotesStore from '@/store/notes'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { getData, setCurrentNote } = useNotesStore()
const { addModal } = useModalStore()

await getData()

watch(
  () => route.params,
  () => {
    if (route.params?.id && typeof route.params.id === 'string') {
      if (route.params.id === 'new') {
        addModal({
          type: 'create'
        })
        return
      }
      setCurrentNote(parseInt(route.params.id))
    }
  },
  {
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
