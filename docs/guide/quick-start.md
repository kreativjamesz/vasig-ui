# Quick Start

## Full Installation

Register all components globally:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import VasigUI from '@vasig/ui'
import '@vasig/ui/style.css'

const app = createApp(App)
app.use(VasigUI)
app.mount('#app')
```

Now you can use all components in your templates:

```vue
<template>
  <Button variant="primary">Click Me</Button>
  <Modal v-model="isOpen" title="Hello">Content</Modal>
</template>
```

## Individual Components

Import only what you need:

```typescript
import { Button, Modal } from '@vasig/ui'
import '@vasig/ui/style.css'

// Register individually
app.component('Button', Button)
app.component('Modal', Modal)
```

Or use them directly in Single File Components:

```vue
<script setup>
import { Button, Modal } from '@vasig/ui'
import '@vasig/ui/style.css'
</script>

<template>
  <Button>Click</Button>
</template>
```
