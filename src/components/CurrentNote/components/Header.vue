<script setup lang="ts">
import { formatEditedTime } from '@/helpers/date'
import { ref } from 'vue'
import { computed } from 'vue'

const { name, category, date, tags } = defineProps<{
  name: string
  category: string
  date: Date
  tags: string[]
}>()

const isShowFullDate = ref(false)

const updatedTime = computed(() => {
  return formatEditedTime(date)
})

const handleChangeViewDate = () => {
  isShowFullDate.value = !isShowFullDate.value
}
</script>

<template>
  <div class="header">
    <h2 class="header__title">{{ name }}</h2>
    <div class="header__info">
      <div class="header__info--item">
        <img src="/icon-folder.svg" alt="folder" />
        <span>{{ category }}</span>
      </div>
      <button class="header__info--item" @click="handleChangeViewDate">
        <img src="/icon-clock.svg" alt="clock" />
        <span>Edited {{ isShowFullDate ? updatedTime.fullDate : updatedTime.compressDate }}</span>
      </button>
    </div>
    <div class="header__tags">
      <span v-for="tag in tags" :key="tag" class="font-poppins-semibold">#{{ tag }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;

  flex-shrink: 0;

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
