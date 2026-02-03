<template>
  <div
    :class="[
      'vasig-alert',
      `vasig-alert--${type}`,
      {
        'vasig-alert--closable': closable
      }
    ]"
    role="alert"
  >
    <div class="vasig-alert__icon" v-if="showIcon">
      <slot name="icon">
        <span class="vasig-alert__icon-default">{{ iconText }}</span>
      </slot>
    </div>
    <div class="vasig-alert__content">
      <div v-if="title || $slots.title" class="vasig-alert__title">
        <slot name="title">
          <strong v-if="title">{{ title }}</strong>
        </slot>
      </div>
      <div class="vasig-alert__message">
        <slot />
      </div>
    </div>
    <button
      v-if="closable"
      class="vasig-alert__close"
      @click="handleClose"
      aria-label="Close alert"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

<style scoped>
.vasig-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 0.375rem;
  border: 1px solid;
  position: relative;
}

.vasig-alert__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1rem;
  font-weight: bold;
}

.vasig-alert__icon-default {
  line-height: 1;
}

.vasig-alert__content {
  flex: 1;
  min-width: 0;
}

.vasig-alert__title {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.vasig-alert__message {
  font-size: 0.875rem;
  line-height: 1.5;
}

.vasig-alert__close {
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
  opacity: 0.7;
  transition: opacity 0.2s;
}

.vasig-alert__close:hover {
  opacity: 1;
}

/* Info variant */
.vasig-alert--info {
  background-color: #eff6ff;
  border-color: #bfdbfe;
  color: #1e40af;
}

.vasig-alert--info .vasig-alert__icon {
  color: #3b82f6;
}

/* Success variant */
.vasig-alert--success {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.vasig-alert--success .vasig-alert__icon {
  color: #22c55e;
}

/* Warning variant */
.vasig-alert--warning {
  background-color: #fffbeb;
  border-color: #fde68a;
  color: #92400e;
}

.vasig-alert--warning .vasig-alert__icon {
  color: #f59e0b;
}

/* Error variant */
.vasig-alert--error {
  background-color: #fef2f2;
  border-color: #fecaca;
  color: #991b1b;
}

.vasig-alert--error .vasig-alert__icon {
  color: #ef4444;
}
</style>
