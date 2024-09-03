<script setup lang="ts">
const { changeContentHandler } = defineProps<{
  content: string
  changeContentHandler: Function
}>()

const handleKeyDown = (ev: KeyboardEvent) => {
  if (ev.key == 'Enter' || ev.key == 'Escape') {
    ev.preventDefault()
    ev.stopPropagation()
    const target = ev.currentTarget as HTMLDivElement
    target.blur()
  }
}

const handleBlur = (ev: FocusEvent) => {
  const textContent = (ev.currentTarget as HTMLDivElement).textContent ?? ''
  changeContentHandler(textContent)
}
</script>

<template>
  <div class="content-container">
    <span>Content</span>
    <div class="content" contenteditable="true" @keydown="handleKeyDown" @blur="handleBlur">
      {{ content }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-container {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
}
span {
  color: var(--light100);
}
.content {
  width: 100%;
  min-height: 100px;
  padding: 8px;

  white-space: pre-wrap;

  background-color: var(--dark400);

  border: 1px solid var(--dark400);
  border-radius: 8px;

  outline: none;

  &:focus,
  &:active {
    border: 1px solid var(--blue);
  }
}
</style>
