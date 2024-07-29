<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useNotesStore from '@/store/notes'
import { Header, Note } from './components'

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
      <Note :content="currentNote.content" />
    </template>
    <div v-else>NOTE NOT FOUND</div>
  </div>
</template>

<style scoped lang="scss">
.note {
  height: 100%;
  width: 100%;
  padding: 87px 50px 20px 50px;

  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 22px;

  flex-shrink: 1;

  background-color: var(--dark);

  scrollbar-color: var(--blue) var(--dark);
}
</style>
