<template>
  <span
    :class="cn(
      'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors',
      {
        // Variants
        'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700': variant === 'default',
        'bg-primary text-white border border-primary': variant === 'primary',
        'bg-secondary text-white border border-secondary': variant === 'secondary',
        'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-200 border border-green-200 dark:border-green-800': variant === 'success',
        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800': variant === 'warning',
        'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-800': variant === 'error',
        // Sizes
        'px-2 py-0.5 text-xs': size === 'small',
        'px-2.5 py-1 text-xs': size === 'medium',
        // Closable
        'pr-1': closable && size === 'small',
        'pr-1.5': closable && size === 'medium'
      }
    )"
  >
    <slot />
    <button
      v-if="closable"
      @click="handleClose"
      class="ml-0.5 flex items-center justify-center text-current opacity-70 hover:opacity-100 transition-opacity rounded-full hover:bg-black/10 dark:hover:bg-white/10"
      aria-label="Remove badge"
      type="button"
    >
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { BadgeProps } from './types'

withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'medium',
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>
