<script setup lang="ts">
import { Notes, Categories, CurrentNote, Modal } from '@/components'
import useNotesStore from '@/store/notes'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { getCategories, getNotes, clearCurrentNote, setCurrentNote } = useNotesStore()

await getCategories()
await getNotes()

watchEffect(() => {
  if (route.params?.id && typeof route.params.id === 'string') {
    setCurrentNote(parseInt(route.params.id))
  }
  clearCurrentNote()
}, {})
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
