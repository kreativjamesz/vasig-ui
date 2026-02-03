# Modal

A flexible modal dialog component with customizable sizes and slots.

## Basic Usage

```vue
<template>
  <Button @click="isOpen = true">Open Modal</Button>
  
  <Modal v-model="isOpen" title="My Modal">
    <p>Modal content goes here</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>
```

## Sizes

```vue
<template>
  <Modal v-model="isOpen" title="Small Modal" size="small">
    Small modal content
  </Modal>
  
  <Modal v-model="isOpen" title="Medium Modal" size="medium">
    Medium modal content
  </Modal>
  
  <Modal v-model="isOpen" title="Large Modal" size="large">
    Large modal content
  </Modal>
</template>
```

## With Footer

```vue
<template>
  <Modal v-model="isOpen" title="Confirm Action">
    <p>Are you sure you want to proceed?</p>
    <template #footer>
      <Button variant="outline" @click="isOpen = false">Cancel</Button>
      <Button @click="handleConfirm">Confirm</Button>
    </template>
  </Modal>
</template>
```

## Custom Header

```vue
<template>
  <Modal v-model="isOpen">
    <template #header>
      <h2>Custom Header</h2>
    </template>
    <p>Content with custom header</p>
  </Modal>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | - | Controls modal visibility (v-model) |
| title | `string` | - | Modal title |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Modal size |
| centered | `boolean` | `true` | Center modal vertically |
| closable | `boolean` | `true` | Show close button |
| closeOnOverlay | `boolean` | `true` | Close when clicking overlay |

### Events

| Event | Description |
|-------|-------------|
| update:modelValue | Emitted when visibility changes |
| close | Emitted when modal is closed |

### Slots

| Slot | Description |
|------|-------------|
| default | Modal body content |
| header | Custom header content |
| footer | Footer content |
