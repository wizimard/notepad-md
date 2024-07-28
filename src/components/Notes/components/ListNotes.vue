<script setup lang="ts">
import useNotesStore from '@/store/notes'
import { Note } from '.'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { LoaderSpinner } from '@/ui'

const isLoading = ref(false)

const { getNotes, ...notesStore } = useNotesStore()
const { notes } = storeToRefs(notesStore)

const getNotesHandler = async () => {
  isLoading.value = true
  await getNotes()
  isLoading.value = false
}
</script>

<template>
  <ul @scrollend="getNotesHandler()">
    <Note v-for="note in notes" :key="note.id" :note="note" />
    <div v-if="isLoading" class="spinner">
      <LoaderSpinner />
    </div>
  </ul>
</template>

<style scoped lang="scss">
ul {
  height: 100%;
  width: 100%;
  padding: 0 15px 30px 0;

  overflow: auto;

  flex-shrink: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
}
.spinner {
  width: 100%;
  padding-top: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
