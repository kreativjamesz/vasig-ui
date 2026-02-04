<template>
  <div
    v-if="label && orientation === 'horizontal'"
    :class="cn(
      'flex items-center gap-3 my-4',
      {
        'my-4': !decorative
      }
    )"
    :role="decorative ? 'none' : 'separator'"
  >
    <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
    <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
      {{ label }}
    </span>
    <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
  </div>
  <div
    v-else
    :class="cn(
      'shrink-0 bg-gray-200 dark:bg-gray-700',
      {
        'w-full h-px': orientation === 'horizontal',
        'h-full w-px': orientation === 'vertical',
        'my-4': orientation === 'horizontal' && !decorative,
        'mx-4': orientation === 'vertical' && !decorative
      }
    )"
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
  />
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { SeparatorProps } from './types'

withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: false,
  label: undefined
})
</script>
