<script setup lang="ts">
defineProps<{
  id: string
  data?: {
    id: number
  }
}>()
</script>
<template>
  <div class="container">
    <div class="modal"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  width: 100%;
  height: 100%;

  background-color: var(--dark200);

  border: 1px solid var(--blue);
  border-radius: 20px;
}
</style>
