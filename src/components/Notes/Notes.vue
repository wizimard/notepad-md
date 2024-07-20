<script setup lang="ts">
import { reactive } from 'vue'
import { SearchNote, Filter, ListNotes } from './components'
import useNotesStore from '@/store/notes'
import { storeToRefs } from 'pinia'
import AddNote from './components/AddNote.vue'

type TagType = {
  tag: string
  isActive: boolean
}

type FilterType = {
  search: string
  tags: TagType[]
}

const filter = reactive<FilterType>({
  search: '',
  tags: []
})

function filterNotesBySearch(search: string) {
  if (search.indexOf('#') === 0) {
    filter.tags.push({
      tag: search.substring(1),
      isActive: true
    })
    return
  }
  filter.search = search
}
function onClickTag(tag) {
  filter.tags.every((filterTag) => {
    if (filterTag.tag === tag) {
      filterTag.isActive = !filterTag.isActive
      return false
    }
    return true
  })
}

function onDeleteTag(tag) {
  filter.tags = filter.tags.filter((item) => item.tag !== tag)
}

const { notes } = storeToRefs(useNotesStore())
</script>

<template>
  <div class="notes">
    <SearchNote :filterNotesBySearch="filterNotesBySearch" />
    <Filter :tags="filter.tags" :onClickTag="onClickTag" :onDeleteTag="onDeleteTag" />
    <ListNotes :notes="notes" />
    <AddNote />
  </div>
</template>

<style scoped>
.notes {
  height: 100%;
  width: 22.62%;
  padding: 32px 0 0 15px;

  position: relative;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
