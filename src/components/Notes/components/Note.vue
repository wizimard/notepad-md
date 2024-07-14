<script setup lang="ts">
import Note from '@/types/model/note'
import { ref } from 'vue'

defineProps<{
  note: Note
}>()

const isShowActions = ref(false)

const onClickActionsButton = () => {
  isShowActions.value = !isShowActions.value
}
</script>

<template>
  <li class="note">
    <RouterLink :to="'/notes/' + note.id">
      <span class="note__name">{{ note.name }}</span>
      <p class="note__content">{{ note.content }}</p>
    </RouterLink>
    <div class="note__bottom">
      <button @click="onClickActionsButton()">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </li>
  <div class="actions__container" v-if="isShowActions">
    <ul class="actions">
      <li>
        <button>
          <img src="/public/icon-update.svg" alt="update" />
          <span>update</span>
        </button>
      </li>
      <li>
        <button>
          <img src="/public/icon-delete.svg" alt="delete" />
          <span>delete</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.note {
  width: 100%;
  padding: 11px 11px 8px 12px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;

  background-color: #1f1f1f;

  border-radius: 5px;

  & a {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 6px;
  }

  &__name {
    width: 100%;

    overflow: hidden;
    text-overflow: ellipsis;

    text-wrap: nowrap;
  }

  &__content {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__bottom {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    & button {
      height: 26px;
      width: 26px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5px;

      border: 1px solid #232938;
      border-radius: 50%;

      & span {
        width: 4px;
        height: 4px;

        background-color: #3471ff;

        border-radius: 50%;
      }

      &:hover,
      &:focus {
        background-color: #232938;
      }
    }
  }
}
.actions {
  width: 97px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0;

  background-color: #1f1f1f;

  border-radius: 3px 0 3px 3px;

  & li {
    width: 100%;
    border-bottom: 1px solid #393939;

    &:first-child {
      border-radius: 3px 0 0 0;
      & button {
        border-radius: 3px 0 0 0;
      }
    }
    &:last-child {
      border-bottom: none;
      border-radius: 0 0 3px 3px;
      & button {
        border-radius: 0 0 3px 3px;
      }
    }
  }

  & button {
    width: 100%;
    padding: 5px 0 6px 12px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 9px;

    &:hover,
    &:focus {
      background-color: #232938;
    }
  }

  &__container {
    width: 100%;

    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
}
</style>
