<script setup lang="ts">
import { reactive } from 'vue'
import { SearchNote, Filter, ListNotes } from './components'
import AddNote from './components/AddNote.vue'
import noteService from '@/services/NoteService'
import { SHORT_NOTE } from '@/types/model/note'

const NOTES_PER_PAGE = 10

type TagType = {
  tag: string
  isActive: boolean
}

type FilterType = {
  search: string
  tags: TagType[]
}

const searchNotes = reactive<SHORT_NOTE[]>([])
const filter = reactive<FilterType>({
  search: '',
  tags: []
})

async function getSearchedNotes() {
  const params = {
    name: filter.search,
    tags: filter.tags.map((tag) => tag.tag)
  }
  const page = Math.floor(searchNotes.length / NOTES_PER_PAGE) + 1
  const newNotes = await noteService.searchNotes(params, page)

  const filteredNotes = newNotes
    .filter((newNote) => !searchNotes.find((note) => note.id === newNote.id))
    .map((note) => ({
      id: note.id,
      name: note.name,
      content: note.content
    }))

  searchNotes.push(...filteredNotes)
}

async function filterNotesBySearch(search: string) {
  if (search.indexOf('#') === 0) {
    filter.tags.push({
      tag: search.substring(1),
      isActive: true
    })
    return
  }
  filter.search = search

  const params = {
    name: search,
    tags: filter.tags.map((tag) => tag.tag)
  }

  const notes = await noteService.searchNotes(params)

  console.log(notes)
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
</script>

<template>
  <div class="notes">
    <SearchNote :filterNotesBySearch="filterNotesBySearch" />
    <Filter :tags="filter.tags" :onClickTag="onClickTag" :onDeleteTag="onDeleteTag" />
    <ListNotes />
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
