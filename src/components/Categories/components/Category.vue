<script setup lang="ts">
import useNotesStore from '@/store/notes'
import { LoaderSpinner } from '@/ui'
import { reactive } from 'vue'
import { ref } from 'vue'

type Note = {
  id: string
  name: string
}

const { id, name } = defineProps<{
  id: string
  name: string
}>()

const { getCategoryNotes } = useNotesStore()

const isOpen = ref(false)
const isLoading = ref(false)
let isGettedNotes = false
const notes = reactive<Note[]>([])

const loadNotes = async () => {
  if (isGettedNotes) return
  isLoading.value = true
  const categoryNotes = await getCategoryNotes(id)
  if (categoryNotes) notes.push(...categoryNotes)
  isLoading.value = false
  isGettedNotes = true
}

const onClickCategory = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) await loadNotes()
}
</script>

<template>
  <li>
    <div class="title">
      <button @click="onClickCategory()">
        <img :src="isOpen ? '/icon-folder-open.svg' : '/icon-folder.svg'" alt="folder" />
        <span>{{ name }}</span>
      </button>
      <ul v-if="isOpen" class="notes">
        <li v-for="note in notes" :key="note.id" class="note">
          <RouterLink :to="'/notes/' + note.id">
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.92857 0.75H1.07143C0.479688 0.75 0 1.25367 0 1.875V10.125C0 10.7461 0.479688 11.25 1.07143 11.25H6.55134C6.93013 11.25 7.29353 11.0919 7.56161 10.8105L9.58192 8.68922C9.85045 8.40703 10 8.02734 10 7.62891V1.875C10 1.25367 9.52009 0.75 8.92857 0.75ZM1.42857 2.25H8.57143L8.57141 7.5H7.14286C6.74844 7.5 6.42857 7.83586 6.42857 8.25V9.75H1.42857V2.25Z"
                fill="#AFAFAF"
              />
            </svg>
            <span>{{ note.name }}</span>
          </RouterLink>
        </li>
        <div v-if="isLoading" class="spinner-container">
          <LoaderSpinner size="small" />
        </div>
      </ul>
    </div>
  </li>
</template>

<style scoped>
li {
  width: 100%;
}
button {
  padding: 3px 0 5px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  color: inherit;
  background: none;
  border: none;
  outline: none;

  cursor: pointer;
}
button:hover,
button:focus {
  color: #3471ff;
}
.notes {
  width: 100%;
  padding: 1px 6.5px 1px 0;
  margin: 0 0 0 6.5px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 3px;

  border-left: 1px solid #3471ff;

  list-style: none;
}
.note {
  width: 100%;
  padding: 0 0 0 15.5px;
  margin: 0;

  color: #afafaf;
}
.note a:hover,
.note a:focus {
  color: #3471ff;
}
.note a:hover path,
.note a:focus path {
  fill: #3471ff;
}
.note a {
  width: 100%;
  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  color: inherit;
  text-decoration: none;

  & svg {
    flex-shrink: 0;
  }

  & span {
    width: 100%;

    overflow: hidden;

    text-wrap: nowrap;
    text-overflow: ellipsis;
  }
}
path {
  fill: #afafaf;
}
.spinner-container {
  width: 100%;
  padding-left: 10px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
