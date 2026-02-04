<template>
  <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot />
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isVisible"
        :class="cn(
          'absolute z-50 px-2 py-1 text-xs font-medium text-white rounded shadow-lg pointer-events-none whitespace-nowrap',
          'bg-gray-900 dark:bg-gray-800',
          {
            'bottom-full left-1/2 -translate-x-1/2 mb-2': position === 'top',
            'top-full left-1/2 -translate-x-1/2 mt-2': position === 'bottom',
            'right-full top-1/2 -translate-y-1/2 mr-2': position === 'left',
            'left-full top-1/2 -translate-y-1/2 ml-2': position === 'right'
          },
          className
        )"
        :style="style"
      >
        {{ content }}
        <div
          v-if="showArrow"
          :class="cn(
            'absolute w-0 h-0 border-4 border-transparent',
            {
              'top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-800': position === 'top',
              'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-800': position === 'bottom',
              'left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-800': position === 'left',
              'right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-800': position === 'right'
            }
          )"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/utils/cn'
import type { TooltipProps } from './types'

const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  position: 'top',
  showArrow: true,
  delay: 0,
  className: undefined,
  style: undefined
})

const isVisible = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const showTooltip = () => {
  if (props.delay > 0) {
    timeoutId = setTimeout(() => {
      isVisible.value = true
    }, props.delay)
  } else {
    isVisible.value = true
  }
}

const hideTooltip = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  isVisible.value = false
}
</script>
