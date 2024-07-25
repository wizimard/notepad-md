<script setup lang="ts">
import { LoaderSpinner } from '@/ui'
import { Note } from '.'
</script>
<template>
  <Suspense>
    <Note />
    <template #fallback>
      <LoaderSpinner />
    </template>
  </Suspense>
</template>
