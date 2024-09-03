<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  name: string
  changeNameHanlder: Function
}>()

const name = ref(props.name)

const blurHandler = () => {
  props.changeNameHanlder(name.value)
}

const keyUpHandler = (ev: KeyboardEvent) => {
  ev.stopPropagation()
  const currentTarget = <HTMLInputElement>ev.currentTarget
  if (ev.key == 'Enter') currentTarget.blur()
  if (ev.key == 'Escape') {
    name.value = props.name
    currentTarget.blur()
  }
}
</script>

<template>
  <input
    type="text"
    v-model="name"
    placeholder="Note name..."
    @blur="blurHandler"
    @keyup="keyUpHandler"
  />
</template>

<style lang="scss" scoped>
input {
  width: 100%;
  height: 2.5em;

  flex-shrink: 0;

  border-bottom: 2px solid var(--white);

  &:placeholder-shown {
    border-color: var(--light);
  }
  &:focus,
  &:active {
    border-color: var(--blue);
  }
}
</style>
