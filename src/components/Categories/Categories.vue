<script setup>
import useNotesStore from '@/store/notes'
import { Category } from './components'
import { storeToRefs } from 'pinia'

const { categories } = storeToRefs(useNotesStore())
</script>

<template>
  <div class="categories">
    <h4 class="text-primary">Categories</h4>
    <ul>
      <Category v-for="category of categories" :key="category.id" v-bind="category" />
    </ul>
  </div>
</template>

<style scoped>
.categories {
  width: 20.9%;
  height: 100%;
  padding-top: 70px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  flex-shrink: 0;
}
h4 {
  width: 100%;
  padding: 0 15px 8px 15px;
  margin: 0;

  border-bottom: 1px solid #353535;
}

ul {
  width: 100%;
  height: 100%;
  padding: 32px 16px 16px 16px;
  margin: 0;

  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;

  list-style: none;
}
</style>
