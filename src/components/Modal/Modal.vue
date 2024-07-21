<script setup lang="ts">
import useModalStore from '@/store/modal'
import { computed } from 'vue'
import { ModalUpdate, ModalDelete } from './components'
import { storeToRefs } from 'pinia'
import { LoaderSpinner } from '@/ui'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'

const components = {
  create: ModalUpdate,
  edit: ModalUpdate,
  delete: ModalDelete
}

const modalStore = useModalStore()

const { modals } = storeToRefs(modalStore)

const modalComponents = computed(() => {
  return modals.value.map(({ type, data, id }) => ({
    Component: components[type],
    data,
    id
  }))
})

const keyUpHadler = (ev) => {
  if (ev.key === 'Escape') modalStore.deleteModal()
}

onMounted(() => {
  window.addEventListener('keyup', keyUpHadler)
})
onUnmounted(() => {
  window.removeEventListener('keyup', keyUpHadler)
})
</script>

<template>
  <Teleport v-for="(modalComponent, index) in modalComponents" :key="modalComponent.id" to="#app">
    <div class="modal" :style="'z-index: ' + (100 + index)">
      <Suspense>
        <component
          :is="modalComponent.Component"
          :id="modalComponent.id"
          :data="modalComponent.data"
        ></component>
        <template #fallback>
          <LoaderSpinner />
        </template>
      </Suspense>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(27, 27, 27, 0.5);
}
</style>
