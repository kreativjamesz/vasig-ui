<template>
  <Teleport to="body">
    <Transition name="vasig-modal">
      <div
        v-if="modelValue"
        class="vasig-modal-overlay"
        @click.self="handleOverlayClick"
      >
        <div
          :class="[
            'vasig-modal',
            `vasig-modal--${size}`,
            {
              'vasig-modal--centered': centered
            }
          ]"
        >
          <div class="vasig-modal__header" v-if="title || $slots.header">
            <slot name="header">
              <h3 class="vasig-modal__title">{{ title }}</h3>
            </slot>
            <button
              v-if="closable"
              class="vasig-modal__close"
              @click="handleClose"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          <div class="vasig-modal__body">
            <slot />
          </div>
          <div class="vasig-modal__footer" v-if="$slots.footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ModalProps } from './types'

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'medium',
  centered: true,
  closable: true,
  closeOnOverlay: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    handleClose()
  }
}
</script>

<style scoped>
.vasig-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.vasig-modal {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  max-width: 100%;
  overflow: hidden;
}

.vasig-modal--small {
  width: 100%;
  max-width: 24rem;
}

.vasig-modal--medium {
  width: 100%;
  max-width: 32rem;
}

.vasig-modal--large {
  width: 100%;
  max-width: 48rem;
}

.vasig-modal--centered {
  margin: auto;
}

.vasig-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--vasig-gray-200, #e5e7eb);
}

.vasig-modal__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vasig-gray-900, #111827);
}

.vasig-modal__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--vasig-gray-500, #6b7280);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.vasig-modal__close:hover {
  color: var(--vasig-gray-900, #111827);
}

.vasig-modal__body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.vasig-modal__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--vasig-gray-200, #e5e7eb);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Transition animations */
.vasig-modal-enter-active,
.vasig-modal-leave-active {
  transition: opacity 0.3s ease;
}

.vasig-modal-enter-active .vasig-modal,
.vasig-modal-leave-active .vasig-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.vasig-modal-enter-from,
.vasig-modal-leave-to {
  opacity: 0;
}

.vasig-modal-enter-from .vasig-modal,
.vasig-modal-leave-to .vasig-modal {
  transform: scale(0.95);
  opacity: 0;
}
</style>
