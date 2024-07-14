<script setup lang="ts">
import { Notes, Categories, CurrentNote } from '@/components'
import useNotesStore from '@/store/notes'

const state = useNotesStore()

state.getData()
</script>

<template>
  <main>
    <Notes />
    <CurrentNote />
    <Categories />
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
