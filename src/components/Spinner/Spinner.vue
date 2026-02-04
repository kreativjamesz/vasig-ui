<template>
  <div
    :class="cn(
      'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
      {
        'h-4 w-4': size === 'small',
        'h-5 w-5': size === 'medium',
        'h-6 w-6': size === 'large',
        'h-8 w-8': size === 'xlarge'
      },
      className
    )"
    role="status"
    :aria-label="ariaLabel"
  >
    <span class="sr-only">{{ ariaLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { SpinnerProps } from './types'

withDefaults(defineProps<SpinnerProps>(), {
  size: 'medium',
  ariaLabel: 'Loading...',
  className: undefined
})
</script>
