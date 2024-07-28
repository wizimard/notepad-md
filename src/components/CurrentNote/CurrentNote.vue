<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useNotesStore from '@/store/notes'
import { Header } from './components'

const { currentNote } = storeToRefs(useNotesStore())
</script>

<template>
  <div class="note">
    <template v-if="currentNote">
      <Header
        :name="currentNote.name"
        :category="currentNote.category.name"
        :date="currentNote.updated_at"
        :tags="currentNote.tags"
      />
    </template>
    <div v-else>NOTE NOT FOUND</div>
  </div>
</template>

<style scoped lang="scss">
.note {
  height: 100%;
  width: 100%;
  padding: 87px 50px 20px 50px;

  flex-shrink: 1;

  background-color: #1b1b1b;
}
</style>
