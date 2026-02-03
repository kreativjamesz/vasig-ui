<template>
  <div
    :class="[
      'vasig-container',
      {
        'vasig-container--fluid': fluid,
        [`vasig-container--${size}`]: size
      }
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ContainerProps } from './types'

withDefaults(defineProps<ContainerProps>(), {
  fluid: false,
  size: undefined
})
</script>

<style scoped>
.vasig-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .vasig-container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .vasig-container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .vasig-container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .vasig-container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .vasig-container {
    max-width: 1536px;
  }
}

.vasig-container--fluid {
  max-width: 100%;
}

.vasig-container--sm {
  max-width: 640px;
}

.vasig-container--md {
  max-width: 768px;
}

.vasig-container--lg {
  max-width: 1024px;
}

.vasig-container--xl {
  max-width: 1280px;
}

.vasig-container--2xl {
  max-width: 1536px;
}
</style>
