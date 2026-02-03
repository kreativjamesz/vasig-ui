<template>
  <button
    :class="[
      'vasig-button',
      `vasig-button--${variant}`,
      `vasig-button--${size}`,
      {
        'vasig-button--disabled': disabled,
        'vasig-button--loading': loading,
        'vasig-button--block': block
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="vasig-button__spinner"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
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

<style scoped>
.vasig-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  outline: none;
}

.vasig-button:focus-visible {
  outline: 2px solid var(--vasig-primary, #3b82f6);
  outline-offset: 2px;
}

.vasig-button--small {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}

.vasig-button--medium {
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
}

.vasig-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.vasig-button--primary {
  background-color: var(--vasig-primary, #3b82f6);
  color: white;
}

.vasig-button--primary:hover:not(:disabled) {
  background-color: var(--vasig-primary-hover, #2563eb);
}

.vasig-button--secondary {
  background-color: var(--vasig-secondary, #6b7280);
  color: white;
}

.vasig-button--secondary:hover:not(:disabled) {
  background-color: var(--vasig-secondary-hover, #4b5563);
}

.vasig-button--outline {
  background-color: transparent;
  border-color: var(--vasig-primary, #3b82f6);
  color: var(--vasig-primary, #3b82f6);
}

.vasig-button--outline:hover:not(:disabled) {
  background-color: var(--vasig-primary, #3b82f6);
  color: white;
}

.vasig-button--ghost {
  background-color: transparent;
  color: var(--vasig-primary, #3b82f6);
}

.vasig-button--ghost:hover:not(:disabled) {
  background-color: var(--vasig-gray-100, #f3f4f6);
}

.vasig-button--disabled,
.vasig-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.vasig-button--block {
  width: 100%;
}

.vasig-button--loading {
  pointer-events: none;
}

.vasig-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
