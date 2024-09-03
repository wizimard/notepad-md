<script setup lang="ts">

const { changeTagsHandler } = defineProps<{
  tags: string[]
  changeTagsHandler: Function
}>()

const handleSave = (tagsStr: string) => {
  if (!tagsStr) return
  const newTags = tagsStr
    .split(' ')
    .map((tag) => tag.slice(1))
    .filter((tag) => !!tag)
  changeTagsHandler(newTags)
}

const handleKeyDown = (ev: KeyboardEvent) => {
  if (ev.key == 'Enter' || ev.key == 'Escape') {
    ev.preventDefault()
    ev.stopPropagation()
    const target = ev.currentTarget as HTMLDivElement
    target.blur()
  }
}

const handleBlur = (ev: FocusEvent) => {
  const content = (ev.target as HTMLDivElement).textContent ?? ''
  handleSave(content)
}
</script>

<template>
  <div class="tags-container">
    <span>Tags</span>
    <div class="tags" contenteditable="true" @blur="handleBlur" @keydown="handleKeyDown">
      {{ tags.map((tag) => `#${tag}`).join(' ') }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags-container {
  width: 100%;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
}
span {
  color: var(--light100);
}
.tags {
  width: 100%;
  min-height: 100px;
  padding: 8px;

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
