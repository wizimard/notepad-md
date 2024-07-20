<script setup lang="ts">
type TagType = {
  tag: string
  isActive: boolean
}

const { tags, onClickTag } = defineProps({
  onClickTag: {
    type: Function,
    required: true
  },
  onDeleteTag: {
    type: Function,
    required: true
  },
  tags: {
    type: Array<TagType>,
    default: []
  }
})
</script>

<template>
  <div class="container">
    <div class="header">
      <img src="/icon-filter.svg" alt="filter" />
      <span class="header__text font-poppins-semibold">Filter</span>
      <span class="header__line"></span>
    </div>
    <div v-if="tags.length" class="tags">
      <div
        v-for="tag in tags"
        :key="tag.tag"
        :class="['tag', 'font-poppins-semibold', tag.isActive ? 'tag_active' : '']"
      >
        <button class="tag__name" @click="onClickTag(tag.tag)">#{{ tag.tag }}</button>
        <button class="tag__delete" @click="onDeleteTag(tag.tag)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 16px 15px 29px 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
}
.header {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;

  color: var(--dark300);

  & img,
  &__text {
    flex-shrink: 0;
  }
  &__text {
    padding-right: 4px;
  }
  &__line {
    width: 100%;

    flex-shrink: 1;

    border-bottom: 2px solid var(--dark300);
  }
}
.tags {
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 7px;
}
.tag {
  color: var(--blue);

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;

  border-radius: 10px;
  border: 1px solid var(--blue);

  &:hover {
    .tag__name {
      padding-right: 0;
    }
    .tag__delete {
      display: flex;
    }
  }

  &_active {
    color: #1b1b1b;
    background: var(--blue);
  }

  &__name {
    padding: 2px 7px;

    border-radius: 10px;

    &:hover,
    &:focus {
      padding-right: 0;

      opacity: 0.7;

      & ~ .tag__delete {
        display: flex;
      }
    }
  }

  &__delete {
    height: 100%;

    border-radius: 10px;

    display: none;
    align-items: center;
    justify-content: center;

    &:hover,
    &:focus {
      display: flex;

      opacity: 0.7;
    }

    & svg {
      width: 18px;
      height: 18px;

      fill: var(--red);
    }
  }
}
</style>
