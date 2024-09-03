<script setup lang="ts">
import useNotesStore from '@/store/notes'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  category: string
  changeCategoryHandler: Function
}>()

const { categories } = useNotesStore()

const noteCategory = ref(props.category)
const suitableCategorySelectIndex = ref(-1)

const suitableCategories = computed(() => {
  const value = noteCategory.value.toLocaleLowerCase()
  if (!value) return []
  return categories.filter(
    (category) =>
      category.name.toLocaleLowerCase().startsWith(value) &&
      category.name.toLocaleLowerCase() != value
  )
})

const changeCategory = () => {
  if (props.category == noteCategory.value || !noteCategory.value) return
  const findCategory = categories.find((category) => category.name == noteCategory.value)
  props.changeCategoryHandler(findCategory ? findCategory.id : 'new', noteCategory.value)
}

const handleKeyDown = (ev: KeyboardEvent) => {
  if (
    ev.key == 'ArrowDown' &&
    suitableCategories.value.length > suitableCategorySelectIndex.value + 1
  ) {
    ev.preventDefault()
    ++suitableCategorySelectIndex.value
  }
  if (ev.key == 'ArrowUp' && suitableCategorySelectIndex.value > 0) {
    ev.preventDefault()
    --suitableCategorySelectIndex.value
  }
  if (ev.key == 'Enter') {
    ev.preventDefault()
    ev.stopPropagation()
    if (suitableCategorySelectIndex.value >= 0) {
      noteCategory.value = suitableCategories.value[suitableCategorySelectIndex.value].name
      suitableCategorySelectIndex.value = -1
    }
    ;(ev.currentTarget as HTMLInputElement).blur()
  }
  if (ev.key == 'Escape') {
    ev.preventDefault()
    ev.stopPropagation()
    noteCategory.value = props.category
    ;(ev.currentTarget as HTMLInputElement).blur()
  }
}

const handlerBlur = () => {
  suitableCategorySelectIndex.value = -1
  changeCategory()
}

watch(noteCategory, () => {
  suitableCategorySelectIndex.value = -1
})
</script>

<template>
  <div class="note-category">
    <div class="title">
      <img src="/icon-folder.svg" alt="folder" />
      <span>Category</span>
    </div>
    <div class="categories-container">
      <input
        type="text"
        v-model="noteCategory"
        placeholder="Enter category"
        @keydown="handleKeyDown"
        @blur="handlerBlur"
      />
      <ul class="categories" v-if="suitableCategories.length">
        <li
          v-for="(category, index) in suitableCategories"
          :key="category.id"
          :class="['category', index == suitableCategorySelectIndex ? 'category_focus' : '']"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.note-category {
  width: 100%;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;

  & span {
    text-align: start;

    color: var(--light100);
  }
}
.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}
.categories-container {
  width: 300px;
  height: 2.5em;

  position: relative;
}
input {
  width: 100%;
  height: 100%;

  border-bottom: 2px solid var(--white);

  &:placeholder-shown {
    border-color: var(--light);
  }
  &:focus,
  &:active {
    border-color: var(--blue);
    & ~ .categories {
      display: block;
    }
  }
  & ~ .categories {
    display: none;
  }
}
.categories {
  width: 100%;
  max-height: 200px;

  position: absolute;
  top: 100%;
  left: 0;

  background-color: var(--blue-transparent);
}
.category {
  width: 100%;
  height: 2em;
  padding: 0 5px;

  text-align: start;

  &_focus,
  &:hover {
    background-color: var(--blue);
  }
}
</style>
