<script setup lang="ts">
import useModalStore from '@/store/modal'
import useNotesStore from '@/store/notes'
import { LoaderSpinner } from '@/ui'
import { ref } from 'vue'

const {
  id: modalId,
  data: { id: noteId }
} = defineProps<{
  data: {
    id: number
  }
  id: string
}>()

const isLoading = ref(false)

const { getNote, deleteNote } = useNotesStore()
const { deleteModal } = useModalStore()

const closeModal = () => {
  deleteModal(modalId)
}

const deleteHandler = () => {
  isLoading.value = true
  deleteNote(noteId).finally(() => {
    isLoading.value = false
    closeModal()
  })
}

const handleClickModal = (ev) => {
  ev.stopPropagation()
}

const note = await getNote(noteId)

if (!note) closeModal()
</script>

<template>
  <div v-if="!!note" class="container" @click="closeModal">
    <div class="modal" @click="handleClickModal">
      <p>Are you sure you want to delete note "{{ note.name }}"?</p>
      <div class="btn-group">
        <button class="delete" @click="deleteHandler()">
          <LoaderSpinner v-if="isLoading" size="small" />
          <span v-else>DELETE</span>
        </button>
        <button class="cancel" @click="closeModal()">
          <span>CANCEL</span>
        </button>
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
.modal {
  width: 500px;

  background-color: var(--dark200);

  border-radius: 10px;
}
p {
  padding: 20px 20px 40px 20px;

  text-align: center;
}

.btn-group {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  & button {
    width: 50%;
    padding: 10px;

    &:first-child {
      border-bottom-left-radius: 10px;
    }
    &:last-child {
      border-bottom-right-radius: 10px;
    }
  }

  & .delete {
    background-color: var(--red);
    border: 1px solid var(--red);

    &:hover,
    &:focus {
      color: var(--red);
      background-color: transparent;
      border-color: var(--red);
    }
  }
  & .cancel {
    background-color: var(--blue);
    border: 1px solid var(--blue);

    &:hover,
    &:focus {
      color: var(--blue);
      background-color: transparent;
      border-color: var(--blue);
    }
  }
}
</style>
