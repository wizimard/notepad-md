<script setup lang="ts">
import { Note } from '.'
import { default as NoteType } from '@/types/model/note'

defineProps({
  notes: {
    type: Array<NoteType>,
    default: () => []
  }
})
</script>

<template>
  <ul>
    <Note v-for="note in notes" :key="note.id" :note="note" />
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
</style>
