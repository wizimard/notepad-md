<script setup lang="ts">
import { Notes, Categories, CurrentNote } from '@/components'
import useNotesStore from '@/store/notes'
import { onUpdated } from 'vue'
import { useRoute } from 'vue-router'

const state = useNotesStore()
const route = useRoute()

state.getData()

onUpdated(() => {
  console.log(route.params)
  console.log(route.query.action)
})
</script>

<template>
  <main>
    <Notes />
    <CurrentNote />
    <Categories />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
