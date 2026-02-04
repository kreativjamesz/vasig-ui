<template>
  <div
    :class="cn(
      'bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-200',
      {
        'border border-gray-200 dark:border-gray-700': bordered,
        'shadow-sm': shadow,
        'shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer': hoverable,
        'border border-gray-200 dark:border-gray-700 shadow-sm': bordered && shadow
      }
    )"
  >
    <div v-if="$slots.header || title" class="p-3 border-b border-gray-200 dark:border-gray-700">
      <slot name="header">
        <h3 v-if="title" class="text-base font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
      </slot>
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { CardProps } from './types'

withDefaults(defineProps<CardProps>(), {
  title: undefined,
  hoverable: false,
  bordered: true,
  shadow: true
})
</script>
