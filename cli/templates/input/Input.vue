<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <div class="relative flex items-center w-full">
      <span
        v-if="$slots.prefix"
        class="absolute left-3 flex items-center justify-center text-gray-500 dark:text-gray-400 pointer-events-none"
      >
        <slot name="prefix" />
      </span>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        :class="cn(
          'w-full px-3 py-2.5 text-sm border rounded-md transition-all duration-200 font-inherit outline-none',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:ring-2 focus:ring-offset-2',
          {
            'pl-10': $slots.prefix,
            'pr-10': $slots.suffix,
            'border-red-500 focus:border-red-500 focus:ring-red-500/20': hasError,
            'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20': !hasError,
            'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:ring-0': disabled,
            'bg-white dark:bg-gray-900 text-gray-900 dark:text-white': !disabled
          }
        )"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <span
        v-if="$slots.suffix"
        class="absolute right-3 flex items-center justify-center text-gray-500 dark:text-gray-400 pointer-events-none"
      >
        <slot name="suffix" />
      </span>
    </div>
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
import type { InputProps } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  placeholder: undefined,
  label: undefined,
  hint: undefined,
  errorMessage: undefined,
  maxlength: undefined,
  minlength: undefined,
  autocomplete: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = useId()
const hasError = computed(() => !!props.errorMessage)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>
