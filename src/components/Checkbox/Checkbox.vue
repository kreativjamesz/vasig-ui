<template>
  <div class="flex items-center gap-2">
    <input
      :id="checkboxId"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :required="required"
      :class="cn(
        'h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-gray-600 dark:bg-gray-800',
        'checked:bg-[#55aa00] checked:border-[#55aa00]',
        className
      )"
      style="accent-color: #55aa00;"
      @change="handleChange"
    />
    <label
      v-if="label"
      :for="checkboxId"
      :class="cn(
        'text-sm font-medium text-gray-700 dark:text-gray-300',
        {
          'cursor-pointer': !disabled,
          'cursor-not-allowed opacity-50': disabled
        }
      )"
    >
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { cn } from '@/utils/cn'
import type { CheckboxProps } from './types'

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: false,
  disabled: false,
  required: false,
  label: undefined,
  className: undefined
})

const emit = defineEmits<{
  'update:checked': [checked: boolean]
  change: [checked: boolean]
}>()

const checkboxId = useId()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:checked', target.checked)
  emit('change', target.checked)
}
</script>
