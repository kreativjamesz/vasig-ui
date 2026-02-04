<template>
  <div
    :class="cn(
      'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
      {
        'h-4 w-full': variant === 'text' && !width,
        'h-12 w-12 rounded-full': variant === 'circle' && !width && !height,
        'h-20 w-full': variant === 'rectangle' && !width && !height,
        'rounded-full': variant === 'circle'
      },
      className
    )"
    :style="{
      width: width,
      height: height
    }"
  />
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { SkeletonProps } from './types'

withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  width: undefined,
  height: undefined,
  className: undefined
})
</script>
