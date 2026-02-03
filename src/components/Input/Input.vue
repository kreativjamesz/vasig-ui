<template>
  <div class="vasig-input-wrapper">
    <label v-if="label" :for="inputId" class="vasig-input__label">
      {{ label }}
      <span v-if="required" class="vasig-input__required">*</span>
    </label>
    <div
      :class="[
        'vasig-input',
        {
          'vasig-input--error': hasError,
          'vasig-input--disabled': disabled,
          'vasig-input--with-prefix': $slots.prefix,
          'vasig-input--with-suffix': $slots.suffix
        }
      ]"
    >
      <span v-if="$slots.prefix" class="vasig-input__prefix">
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
        class="vasig-input__field"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <span v-if="$slots.suffix" class="vasig-input__suffix">
        <slot name="suffix" />
      </span>
    </div>
    <div v-if="hasError && errorMessage" class="vasig-input__error">
      {{ errorMessage }}
    </div>
    <div v-else-if="hint" class="vasig-input__hint">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
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

<style scoped>
.vasig-input-wrapper {
  width: 100%;
}

.vasig-input__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vasig-gray-700, #374151);
}

.vasig-input__required {
  color: var(--vasig-error, #ef4444);
  margin-left: 0.25rem;
}

.vasig-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.vasig-input__field {
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vasig-gray-900, #111827);
  background-color: white;
  border: 1px solid var(--vasig-gray-300, #d1d5db);
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  outline: none;
}

.vasig-input__field::placeholder {
  color: var(--vasig-gray-400, #9ca3af);
}

.vasig-input__field:focus {
  border-color: var(--vasig-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.vasig-input--with-prefix .vasig-input__field {
  padding-left: 2.5rem;
}

.vasig-input--with-suffix .vasig-input__field {
  padding-right: 2.5rem;
}

.vasig-input__prefix,
.vasig-input__suffix {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vasig-gray-500, #6b7280);
  pointer-events: none;
}

.vasig-input__prefix {
  left: 0.75rem;
}

.vasig-input__suffix {
  right: 0.75rem;
}

.vasig-input--error .vasig-input__field {
  border-color: var(--vasig-error, #ef4444);
}

.vasig-input--error .vasig-input__field:focus {
  border-color: var(--vasig-error, #ef4444);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.vasig-input--disabled .vasig-input__field {
  background-color: var(--vasig-gray-100, #f3f4f6);
  color: var(--vasig-gray-500, #6b7280);
  cursor: not-allowed;
}

.vasig-input--disabled .vasig-input__field:focus {
  border-color: var(--vasig-gray-300, #d1d5db);
  box-shadow: none;
}

.vasig-input__error {
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: var(--vasig-error, #ef4444);
}

.vasig-input__hint {
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: var(--vasig-gray-500, #6b7280);
}
</style>
