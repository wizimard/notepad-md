<script setup lang="ts"></script>

<template>
  <RouterLink to="/notes?action=create" class="add">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  </RouterLink>
</template>

<style scoped lang="scss">
.add {
  width: 50px;
  height: 50px;

  position: absolute;
  left: 15px;
  bottom: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--blue);

  border: 1px solid var(--blue);
  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: transparent;

    & svg {
      fill: var(--blue);
    }
  }

  & svg {
    fill: var(--white);
  }
}
</style>
