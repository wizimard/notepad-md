<script setup lang="ts">
defineProps<{
  size?: 'small' | 'normal'
}>()
</script>
<template>
  <span class="loader" :class="{ small: size === 'small', normal: size === 'normal' }"></span>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.small {
  width: 1em;
  height: 1em;
  border-width: 2px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
