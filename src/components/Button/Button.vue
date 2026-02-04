<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      {
        // Sizes
        'px-2 py-0.5 text-xs': size === 'small',
        'px-3 py-1.5 text-sm': size === 'medium',
        'px-4 py-2 text-sm': size === 'large',
        // Variants
        'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary': variant === 'primary',
        'bg-secondary text-white hover:bg-secondary-hover focus-visible:ring-secondary': variant === 'secondary',
        'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary': variant === 'outline',
        'bg-transparent text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-primary': variant === 'ghost',
        // States
        'opacity-50 cursor-not-allowed': disabled || loading,
        'pointer-events-none': loading,
        'w-full': block
      }
    )"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin h-3.5 w-3.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { ButtonProps } from './types'

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>
