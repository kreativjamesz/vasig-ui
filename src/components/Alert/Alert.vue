<template>
  <div
    :class="cn(
      'flex items-start gap-2.5 p-3 rounded-md border relative',
      {
        'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200': type === 'info',
        'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-200': type === 'success',
        'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-200': type === 'warning',
        'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200': type === 'error'
      }
    )"
    role="alert"
  >
    <div v-if="showIcon" class="flex-shrink-0 w-4 h-4 flex items-center justify-center font-bold text-xs">
      <slot name="icon">
        <span>{{ iconText }}</span>
      </slot>
    </div>
    <div class="flex-1 min-w-0">
      <div v-if="title || $slots.title" class="mb-1 text-sm font-semibold">
        <slot name="title">
          <strong v-if="title">{{ title }}</strong>
        </slot>
      </div>
      <div class="text-sm leading-relaxed">
        <slot />
      </div>
    </div>
    <button
      v-if="closable"
      @click="handleClose"
      class="flex-shrink-0 w-4 h-4 flex items-center justify-center text-current opacity-70 hover:opacity-100 transition-opacity text-lg leading-none"
      aria-label="Close alert"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import type { AlertProps } from './types'

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  title: undefined,
  closable: false,
  showIcon: true
})

const emit = defineEmits<{
  close: []
}>()

const iconText = computed(() => {
  const icons: Record<string, string> = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ'
  }
  return icons[props.type] || 'ℹ'
})

const handleClose = () => {
  emit('close')
}
</script>
