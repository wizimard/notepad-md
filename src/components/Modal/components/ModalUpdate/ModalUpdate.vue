<script setup lang="ts">
import useNotesStore from '@/store/notes'
import Note from '@/types/model/note'
import { reactive } from 'vue'
import { NoteCategory, NoteContent, NoteName, NoteTags } from './components'
import useModalStore from '@/store/modal'

const { id: modalId, data } = defineProps<{
  id: string
  data?: {
    id: string
  }
}>()

const { getNote, updateNote, createNote } = useNotesStore()
const { deleteModal } = useModalStore()

const noteChange = reactive<{ note: Note }>({
  note: {
    id: '',
    name: '',
    category: {
      id: '',
      name: ''
    },
    content: '',
    tags: [],
    created_at: new Date(),
    updated_at: new Date()
  }
})

if (data) {
  const note = await getNote(data.id)
  if (note) {
    noteChange.note = note
  }
}

const changeNameHanlder = (value: string) => {
  noteChange.note.name = value
}
const changeCategoryHandler = (id: string, value: string) => {
  noteChange.note.category = {
    id,
    name: value
  }
}
const changeTagsHandler = (tags: string[]) => {
  noteChange.note.tags = tags
}
const changeContentHandler = (content: string) => {
  noteChange.note.content = content
}

const handleClickSave = async () => {
  if (noteChange.note.id) {
    const isUpdated = await updateNote(noteChange.note)
    if (isUpdated) deleteModal(modalId)
    return
  }
}
</script>
<template>
  <div class="container">
    <div class="modal-container">
      <div class="modal">
        <NoteName :name="noteChange.note.name" :change-name-hanlder="changeNameHanlder" />
        <NoteCategory
          :category="noteChange.note.category.name"
          :change-category-handler="changeCategoryHandler"
        />
        <NoteTags :tags="noteChange.note.tags" :change-tags-handler="changeTagsHandler" />
        <NoteContent
          :content="noteChange.note.content"
          :change-content-handler="changeContentHandler"
        />
        <div class="btn-container">
          <button class="btn btn-save" @click="handleClickSave">Save</button>
          <button class="btn btn-cancel" @click="deleteModal(id)">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-container {
  width: 50%;
  height: 95%;
  padding: 20px 0 20px 20px;

  background-color: var(--dark200);

  border: 1px solid var(--blue);
  border-radius: 20px;
}
.modal {
  width: 100%;
  height: 100%;
  padding-right: 20px;

  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
}
.btn-container {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.btn {
  width: 200px;
  height: 2.5em;

  border-radius: 8px;

  &-save {
    border: 1px solid var(--blue);

    &:hover,
    &:focus {
      background-color: var(--blue);
      border-color: transparent;
    }
  }

  &-cancel {
    border: 1px solid var(--red);

    &:hover,
    &:focus {
      background-color: var(--red);
      border-color: transparent;
    }
  }
}
</style>
