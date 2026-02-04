<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-[-10px] scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-[-10px] scale-95"
    >
      <div
        v-if="modelValue"
        :class="cn(
          'fixed z-[9999] pointer-events-none',
          {
            'top-4 left-4': position === 'top-left',
            'top-4 left-1/2 -translate-x-1/2': position === 'top-center',
            'top-4 right-4': position === 'top-right',
            'bottom-4 left-4': position === 'bottom-left',
            'bottom-4 left-1/2 -translate-x-1/2': position === 'bottom-center',
            'bottom-4 right-4': position === 'bottom-right'
          }
        )"
      >
        <div
          :class="cn(
            'flex items-start gap-3 min-w-[300px] max-w-[500px] p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 border pointer-events-auto',
            {
              'border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200': type === 'info',
              'border-green-200 dark:border-green-800 text-green-900 dark:text-green-200': type === 'success',
              'border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-200': type === 'warning',
              'border-red-200 dark:border-red-800 text-red-900 dark:text-red-200': type === 'error'
            }
          )"
          role="alert"
        >
          <div v-if="showIcon" class="flex-shrink-0 w-5 h-5 flex items-center justify-center font-bold">
            <slot name="icon">
              <span>{{ iconText }}</span>
            </slot>
          </div>
          <div class="flex-1 min-w-0">
            <div v-if="title" class="mb-1 text-sm font-semibold">{{ title }}</div>
            <div class="text-sm leading-relaxed">
              <slot>{{ message }}</slot>
            </div>
          </div>
          <button
            v-if="closable"
            @click="handleClose"
            class="flex-shrink-0 w-5 h-5 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity text-xl leading-none text-current"
            aria-label="Close toast"
          >
            ×
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { cn } from '@/utils/cn'
import type { ToastProps } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'info',
  position: 'top-right',
  closable: true,
  showIcon: true,
  duration: 3000,
  message: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
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

let timeoutId: number | null = null

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.duration > 0) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      handleClose()
    }, props.duration)
  } else if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
})

onMounted(() => {
  if (props.modelValue && props.duration > 0) {
    timeoutId = window.setTimeout(() => {
      handleClose()
    }, props.duration)
  }
})
</script>
