<template>
  <div
    :class="cn(
      'w-full mx-auto px-4',
      {
        'max-w-full': fluid,
        'max-w-sm': size === 'sm',
        'max-w-md': size === 'md',
        'max-w-lg': size === 'lg',
        'max-w-xl': size === 'xl',
        'max-w-2xl': size === '2xl',
        'sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl': !fluid && !size
      }
    )"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { ContainerProps } from './types'

withDefaults(defineProps<ContainerProps>(), {
  fluid: false,
  size: undefined
})
</script>
