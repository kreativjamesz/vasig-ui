<template>
  <div
    :class="[
      'vasig-card',
      {
        'vasig-card--hoverable': hoverable,
        'vasig-card--bordered': bordered,
        'vasig-card--shadow': shadow
      }
    ]"
  >
    <div v-if="$slots.header || title" class="vasig-card__header">
      <slot name="header">
        <h3 v-if="title" class="vasig-card__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="vasig-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="vasig-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from './types'

withDefaults(defineProps<CardProps>(), {
  title: undefined,
  hoverable: false,
  bordered: true,
  shadow: true
})
</script>

<style scoped>
.vasig-card {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.vasig-card--bordered {
  border: 1px solid var(--vasig-gray-200, #e5e7eb);
}

.vasig-card--shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.vasig-card--hoverable {
  cursor: pointer;
}

.vasig-card--hoverable:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.vasig-card__header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--vasig-gray-200, #e5e7eb);
}

.vasig-card__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vasig-gray-900, #111827);
}

.vasig-card__body {
  padding: 1.5rem;
}

.vasig-card__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--vasig-gray-200, #e5e7eb);
  background-color: var(--vasig-gray-50, #f9fafb);
}
</style>
