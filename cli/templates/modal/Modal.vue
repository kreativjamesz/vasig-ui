<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="handleOverlayClick"
      >
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            :class="cn(
              'bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col max-h-[90vh] max-w-full overflow-hidden',
              {
                'max-w-sm': size === 'small',
                'max-w-md': size === 'medium',
                'max-w-2xl': size === 'large'
              }
            )"
          >
            <div v-if="title || $slots.header" class="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <slot name="header">
                <h3 v-if="title" class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
              </slot>
              <button
                v-if="closable"
                @click="handleClose"
                class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-2xl leading-none p-1 transition-colors"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div class="p-6 overflow-y-auto flex-1">
              <slot />
            </div>
            <div v-if="$slots.footer" class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
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
