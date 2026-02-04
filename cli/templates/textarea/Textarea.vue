<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="textareaId"
      class="block mb-1.5 text-xs font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      :class="cn(
        'w-full px-2.5 py-1.5 text-sm border rounded-md transition-all duration-200 font-inherit outline-none resize-none',
        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
        'focus:ring-2 focus:ring-offset-2',
        {
          'border-red-500 focus:border-red-500 focus:ring-red-500/20': hasError,
          'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20': !hasError,
          'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:ring-0': disabled,
          'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white': !disabled
        }
      )"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <div v-if="hasError && errorMessage" class="mt-1.5 text-xs text-red-500">
      {{ errorMessage }}
    </div>
    <div v-else-if="hint" class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { cn } from '@/utils/cn'
import type { TextareaProps } from './types'

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  placeholder: undefined,
  label: undefined,
  hint: undefined,
  errorMessage: undefined,
  maxlength: undefined,
  minlength: undefined,
  rows: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const textareaId = useId()
const hasError = computed(() => !!props.errorMessage)

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>
