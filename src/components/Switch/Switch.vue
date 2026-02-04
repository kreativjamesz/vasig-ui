<template>
  <button
    :id="switchId"
    type="button"
    role="switch"
    :aria-checked="checked"
    :aria-labelledby="labelId"
    :disabled="disabled"
    :class="cn(
      'relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      {
        'bg-primary': checked && !disabled,
        'bg-gray-300 dark:bg-gray-600': !checked && !disabled,
        'bg-gray-200 dark:bg-gray-700': disabled
      }
    )"
    @click="handleToggle"
  >
    <span
      :class="cn(
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        {
          'translate-x-5': checked,
          'translate-x-0.5': !checked
        }
      )"
    />
  </button>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { cn } from '@/utils/cn'
import type { SwitchProps } from './types'

const props = withDefaults(defineProps<SwitchProps>(), {
  checked: false,
  disabled: false
})

const emit = defineEmits<{
  'update:checked': [checked: boolean]
  change: [checked: boolean]
}>()

const switchId = useId()
const labelId = `${switchId}-label`

const handleToggle = () => {
  if (props.disabled) return
  const newValue = !props.checked
  emit('update:checked', newValue)
  emit('change', newValue)
}
</script>
