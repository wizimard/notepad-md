<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onUpdated } from 'vue'
import useNotesStore from '@/store/notes'
import { formatEditedTime } from '@/helpers/date'

const { currentNote } = storeToRefs(useNotesStore())

onUpdated(() => {
  console.log(currentNote)
})
</script>

<template>
  <div v-if="currentNote" class="note">
    <h2 class="note__title">{{ currentNote.name }}</h2>
    <div class="note__info">
      <div class="note__info--item">
        <img src="/icon-folder.svg" alt="folder" />
        <span>{{ currentNote.category.name }}</span>
      </div>
      <div class="note__info--item">
        <img src="/icon-clock.svg" alt="clock" />
        <span>Edited at {{ formatEditedTime(currentNote.updated_at) }}</span>
      </div>
    </div>
    <div class="note__tags">
      <span v-for="tag in currentNote.tags" :key="tag" class="font-poppins-semibold"
        >#{{ tag }}</span
      >
    </div>
  </div>
  <div v-else>NOTE NOT FOUND</div>
</template>

<style scoped lang="scss">
.note {
  height: 100%;
  width: 100%;
  padding: 87px 50px 20px 50px;

  flex-shrink: 1;

  background-color: #1b1b1b;

  &__title {
    padding-bottom: 0.5em;

    font-size: 3.5em;
    line-height: 1.1em;

    color: var(--light200);
  }

  &__info {
    width: 100%;
    padding-bottom: 11px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 25px;

    border-bottom: 1px solid var(--dark400);

    &--item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
    }
  }

  &__tags {
    width: 100%;
    padding-top: 10px;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5.5px;

    & span {
      color: var(--light400);
    }
  }
}
</style>
