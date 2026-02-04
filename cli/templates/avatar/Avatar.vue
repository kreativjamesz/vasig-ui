<template>
  <div
    :class="cn(
      'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
      {
        'h-8 w-8': size === 'small',
        'h-10 w-10': size === 'medium',
        'h-12 w-12': size === 'large',
        'h-16 w-16': size === 'xlarge'
      },
      className
    )"
  >
    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover"
      @error="handleError"
    />
    <span
      v-else
      :class="cn(
        'text-gray-600 dark:text-gray-300 font-medium',
        {
          'text-xs': size === 'small',
          'text-sm': size === 'medium',
          'text-base': size === 'large',
          'text-lg': size === 'xlarge'
        }
      )"
    >
      {{ initials }}
    </span>
    <span
      v-if="showBadge"
      :class="cn(
        'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-900',
        {
          'h-2.5 w-2.5': size === 'small' || size === 'medium',
          'h-3 w-3': size === 'large' || size === 'xlarge',
          'bg-green-500': badgeVariant === 'online',
          'bg-gray-400': badgeVariant === 'offline',
          'bg-yellow-500': badgeVariant === 'away',
          'bg-red-500': badgeVariant === 'busy'
        }
      )"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/utils/cn'
import type { AvatarProps } from './types'

const props = withDefaults(defineProps<AvatarProps>(), {
  src: undefined,
  alt: '',
  size: 'medium',
  showBadge: false,
  badgeVariant: 'online',
  className: undefined
})

const hasError = ref(false)

const initials = computed(() => {
  if (props.alt) {
    const parts = props.alt.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return parts[0][0].toUpperCase()
  }
  return '?'
})

const handleError = () => {
  hasError.value = true
}
</script>
