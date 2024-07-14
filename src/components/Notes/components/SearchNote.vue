<script setup lang="ts">
import { ref } from 'vue'

const { filterNotesBySearch } = defineProps({
  filterNotesBySearch: {
    type: Function,
    required: true
  }
})

const searchText = ref('')

function onSubmit() {
  filterNotesBySearch(searchText.value)

  if (searchText.value.indexOf('#') === 0) searchText.value = ''
}
</script>

<template>
  <form class="container" @submit.prevent="onSubmit">
    <input type="text" placeholder="Search" v-model="searchText" />
    <button type="submit">
      <img src="/icon-search.svg" alt="search" />
    </button>
  </form>
</template>

<style scoped>
.container {
  width: 100%;
  height: 40px;
  padding-right: 15px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
input {
  width: 100%;
  height: 100%;
  padding: 0 12px;

  flex-shrink: 1;
  background-color: #333333;

  border-radius: 7px;
}
input,
input::placeholder {
  color: #ffffff;
}
button {
  width: 42px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background-color: #3471ff;

  border-radius: 7px;
}
button:focus,
button:hover {
  opacity: 0.8;
}
</style>
