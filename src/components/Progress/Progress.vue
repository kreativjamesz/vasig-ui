<template>
  <div class="w-full">
    <div
      :class="cn(
        'h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
        className
      )"
    >
      <div
        :class="cn(
          'h-full transition-all duration-300 ease-in-out rounded-full',
          {
            'bg-primary': variant === 'default',
            'bg-blue-500': variant === 'info',
            'bg-green-500': variant === 'success',
            'bg-yellow-500': variant === 'warning',
            'bg-red-500': variant === 'error'
          }
        )"
        :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"
      />
    </div>
    <div v-if="showLabel" class="mt-1.5 text-xs text-gray-600 dark:text-gray-400 text-right">
      {{ value }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { ProgressProps } from './types'

withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  variant: 'default',
  showLabel: false,
  className: undefined
})
</script>
