<template>
  <div class="flex items-center gap-2">
    <input
      :id="radioId"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :required="required"
      :class="cn(
        'h-4 w-4 border-gray-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-gray-600 dark:bg-gray-800',
        'checked:bg-[#55aa00] checked:border-[#55aa00]',
        className
      )"
      style="accent-color: #55aa00;"
      @change="handleChange"
    />
    <label
      v-if="label"
      :for="radioId"
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
import type { RadioProps } from './types'

const props = withDefaults(defineProps<RadioProps>(), {
  name: undefined,
  value: undefined,
  checked: false,
  disabled: false,
  required: false,
  label: undefined,
  className: undefined
})

const emit = defineEmits<{
  change: [value: string | number | boolean | undefined]
}>()

const radioId = useId()

const handleChange = () => {
  if (props.disabled) return
  emit('change', props.value as string | number | boolean)
}
</script>
