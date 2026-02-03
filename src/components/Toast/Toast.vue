<template>
  <Teleport to="body">
    <Transition name="vasig-toast">
      <div
        v-if="modelValue"
        class="vasig-toast-container"
        :class="`vasig-toast-container--${position}`"
      >
        <div
          :class="[
            'vasig-toast',
            `vasig-toast--${type}`,
            {
              'vasig-toast--closable': closable
            }
          ]"
          role="alert"
        >
          <div class="vasig-toast__icon" v-if="showIcon">
            <slot name="icon">
              <span class="vasig-toast__icon-default">{{ iconText }}</span>
            </slot>
          </div>
          <div class="vasig-toast__content">
            <div v-if="title" class="vasig-toast__title">{{ title }}</div>
            <div class="vasig-toast__message">
              <slot>{{ message }}</slot>
            </div>
          </div>
          <button
            v-if="closable"
            class="vasig-toast__close"
            @click="handleClose"
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

<style scoped>
.vasig-toast-container {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
}

.vasig-toast-container--top-left {
  top: 1rem;
  left: 1rem;
}

.vasig-toast-container--top-center {
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.vasig-toast-container--top-right {
  top: 1rem;
  right: 1rem;
}

.vasig-toast-container--bottom-left {
  bottom: 1rem;
  left: 1rem;
}

.vasig-toast-container--bottom-center {
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.vasig-toast-container--bottom-right {
  bottom: 1rem;
  right: 1rem;
}

.vasig-toast {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  min-width: 300px;
  max-width: 500px;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background: white;
  border: 1px solid;
  pointer-events: auto;
}

.vasig-toast__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1rem;
  font-weight: bold;
}

.vasig-toast__icon-default {
  line-height: 1;
}

.vasig-toast__content {
  flex: 1;
  min-width: 0;
}

.vasig-toast__title {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.vasig-toast__message {
  font-size: 0.875rem;
  line-height: 1.5;
}

.vasig-toast__close {
  flex-shrink: 0;
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: opacity 0.2s;
  color: inherit;
}

.vasig-toast__close:hover {
  opacity: 1;
}

/* Info variant */
.vasig-toast--info {
  border-color: #bfdbfe;
  color: #1e40af;
}

.vasig-toast--info .vasig-toast__icon {
  color: #3b82f6;
}

/* Success variant */
.vasig-toast--success {
  border-color: #bbf7d0;
  color: #166534;
}

.vasig-toast--success .vasig-toast__icon {
  color: #22c55e;
}

/* Warning variant */
.vasig-toast--warning {
  border-color: #fde68a;
  color: #92400e;
}

.vasig-toast--warning .vasig-toast__icon {
  color: #f59e0b;
}

/* Error variant */
.vasig-toast--error {
  border-color: #fecaca;
  color: #991b1b;
}

.vasig-toast--error .vasig-toast__icon {
  color: #ef4444;
}

/* Transitions */
.vasig-toast-enter-active,
.vasig-toast-leave-active {
  transition: all 0.3s ease;
}

.vasig-toast-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.vasig-toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
