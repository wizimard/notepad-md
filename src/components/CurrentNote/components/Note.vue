<script setup lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'

const { content } = defineProps<{
  content: string
}>()

const html = computed(() => {
  return marked.parse(content)
})
</script>

<template>
  <div class="note__content" v-html="html"></div>
</template>

<style scoped lang="scss">
.note__content {
  width: 100%;

  flex-shrink: 1;

  &:deep(h1) {
    padding-bottom: 20px;
    font-size: 2em;
  }
  &:deep(h2) {
    padding-bottom: 10px;
    font-size: 1.7em;
  }
  &:deep(h3) {
    padding-bottom: 10px;
    font-size: 1.5em;
  }
  &:deep(h4),
  &:deep(h5),
  &:deep(h6) {
    padding-bottom: 10px;
    font-size: 1.3em;
  }
  &:deep(strong) {
    font-weight: bold;
  }
  &:deep(p) {
    padding-bottom: 10px;
  }

  &:deep(ol),
  &:deep(ul) {
    padding: 0 0 10px 2em;

    & ol,
    & ul {
      padding-bottom: 0;
    }
  }
  &:deep(ol) {
    list-style: decimal;
  }
  &:deep(ul) {
    list-style: disc;
  }
  &:deep(li) {
    list-style: inherit;
  }

  &:deep(p:has(code)),
  &:deep(pre:has(code)) {
    padding: 20px;

    background-color: var(--dark200);

    border-radius: 8px;
  }

  &:deep(hr) {
    margin: 10px 0;
  }

  &:deep(a) {
    color: var(--blue);

    &:focus,
    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
  &:deep(img) {
    max-width: 100%;
  }

  &:deep(table) {
    width: 100%;

    border: 1px solid #fff;
    border-spacing: 0;

    & thead tr {
      & th {
        border-bottom: 1px solid var(--white);
      }
    }

    & tbody tr {
      &:last-child td {
        border-bottom: none;
      }
      & td {
        border-bottom: 1px solid var(--white);
      }
    }

    & th,
    & td {
      height: 2em;
      padding-left: 1em;

      border-right: 1px solid var(--white);

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
