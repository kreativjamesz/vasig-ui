<template>
  <label
    :for="htmlFor"
    :class="cn(
      'block text-xs font-medium text-gray-700 dark:text-gray-300',
      {
        'cursor-pointer': !disabled,
        'cursor-not-allowed opacity-50': disabled,
        'text-red-500 dark:text-red-400': hasError
      },
      className
    )"
  >
    <slot />
    <span v-if="required" class="text-red-500 ml-1">*</span>
  </label>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { LabelProps } from './types'

const props = withDefaults(defineProps<LabelProps>(), {
  htmlFor: undefined,
  required: false,
  disabled: false,
  hasError: false,
  className: undefined
})
</script>
