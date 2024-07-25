<script setup lang="ts">
import useModalStore from '@/store/modal'
import Note from '@/types/model/note'
import { ref } from 'vue'

const { note } = defineProps<{
  note: Note
}>()

const { addModal } = useModalStore()

const isShowActions = ref(false)

const onClickActionsButton = () => {
  isShowActions.value = !isShowActions.value
}

const modalHandler = (type: 'edit' | 'delete') => {
  addModal({
    type,
    data: {
      id: note.id
    }
  })
}
</script>

<template>
  <li class="note">
    <div class="note__container">
      <RouterLink :to="'/notes/' + note.id">
        <span class="note__name">{{ note.name }}</span>
        <p class="note__content text-primary">{{ note.content }}</p>
      </RouterLink>
      <div class="note__bottom">
        <button @click="onClickActionsButton()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <div class="actions__container" v-if="isShowActions">
      <ul class="actions">
        <li>
          <button class="actions__update" @click="modalHandler('edit')">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.449 1.02578C13.0051 1.58107 13.0051 2.48142 12.449 3.03672L11.6873 3.80097L9.19902 1.3132L9.96328 0.549959C10.5193 -0.00542262 11.4182 -0.00542262 11.9742 0.549959L12.449 1.02578ZM4.37734 6.13691L8.62519 1.88754L11.1135 4.3748L6.86309 8.62265C6.7082 8.78008 6.51777 8.89687 6.30703 8.96797L4.05234 9.71953C3.81113 9.79062 3.59277 9.73476 3.42773 9.54941C3.26523 9.40722 3.20937 9.16601 3.28047 8.94765L4.03203 6.69297C4.10312 6.48222 4.21992 6.29179 4.37734 6.13691ZM4.875 1.60215C5.32441 1.60215 5.6875 1.98885 5.6875 2.41465C5.6875 2.88691 5.32441 3.22715 4.875 3.22715H2.4375C1.98885 3.22715 1.625 3.61308 1.625 4.03965V10.5625C1.625 11.0119 1.98885 11.375 2.4375 11.375H8.9375C9.38691 11.375 9.75 11.0119 9.75 10.5625V8.10215C9.75 7.67558 10.1131 7.28965 10.5625 7.28965C11.0119 7.28965 11.375 7.67558 11.375 8.10215V10.5625C11.375 11.9082 10.2832 13 8.9375 13H2.4375C1.09129 13 0 11.9082 0 10.5625V4.03965C0 2.69394 1.09129 1.60215 2.4375 1.60215H4.875Z"
                fill="#fff"
              />
            </svg>

            <span>update</span>
          </button>
        </li>
        <li>
          <button class="actions__delete" @click="modalHandler('delete')">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1875 10.5625C12.6369 10.5625 13 10.9256 13 11.375C13 11.8244 12.6369 12.1875 12.1875 12.1875H3.82379C3.39469 12.1875 2.98082 12.0174 2.67613 11.7127L0.644123 9.68144C0.0095761 9.04668 0.0095761 8.01582 0.644123 7.38105L6.56852 1.45666C7.20328 0.822146 8.23414 0.822146 8.86891 1.45666L12.355 4.94355C12.9898 5.57832 12.9898 6.60918 12.355 7.24394L9.03648 10.5625H12.1875ZM6.73863 10.5625L8.44742 8.85371L4.95875 5.36504L1.7933 8.53125L3.82379 10.5625H6.73863Z"
                fill="#fff"
              />
            </svg>

            <span>delete</span>
          </button>
        </li>
      </ul>
    </div>
  </li>
</template>

<style scoped lang="scss">
.note {
  $note: &;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px;

  &__container {
    width: 100%;
    padding: 10px 10px 7px 11px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 7px;

    background-color: var(--dark100);

    border: 1px solid var(--dark100);
    border-radius: 5px;

    &:has(> a:hover),
    &:has(> a:focus) {
      border-color: var(--blue);
    }

    & a {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 6px;

      &:hover > *,
      &:focus > * {
        color: var(--blue);
      }
    }
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

        background-color: var(--blue);

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

  background-color: var(--dark100);

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

  &__update {
    &:hover,
    &:focus {
      color: var(--blue);

      & path {
        fill: var(--blue);
      }
    }
  }
  &__delete {
    &:hover,
    &:focus {
      color: #cb1919;

      & path {
        fill: #cb1919;
      }
    }
  }
}
</style>
