# Vasig UI

A clean, modern UI kit for Vue 3 + TypeScript projects.

## 🚀 Features

- **Vue 3 Composition API** - Built with `<script setup>` and TypeScript
- **Tree-shakeable** - Import only what you need
- **TypeScript-first** - Full type safety and IntelliSense support
- **Customizable** - CSS variables for easy theming
- **Accessible** - Built with accessibility in mind

## 📦 Installation

```bash
npm install @vasig/ui
```

## 🎯 Quick Start

### Full Installation

```typescript
import { createApp } from 'vue'
import VasigUI from '@vasig/ui'
import '@vasig/ui/style.css'

const app = createApp(App)
app.use(VasigUI)
app.mount('#app')
```

### Individual Components

```typescript
import { Button, Modal } from '@vasig/ui'
import '@vasig/ui/style.css'

// Register components individually
app.component('Button', Button)
app.component('Modal', Modal)
```

## 📚 Components

### Button

```vue
<template>
  <Button variant="primary" size="medium" @click="handleClick">
    Click Me
  </Button>
</template>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'`
- `size`: `'small' | 'medium' | 'large'`
- `disabled`: `boolean`
- `loading`: `boolean`
- `block`: `boolean`

### Modal

```vue
<template>
  <Modal v-model="isOpen" title="My Modal" size="medium">
    <p>Modal content goes here</p>
    <template #footer>
      <Button @click="isOpen = false">Close</Button>
    </template>
  </Modal>
</template>
```

**Props:**
- `modelValue`: `boolean` (v-model)
- `title`: `string`
- `size`: `'small' | 'medium' | 'large'`
- `centered`: `boolean`
- `closable`: `boolean`
- `closeOnOverlay`: `boolean`

**Slots:**
- `default` - Modal body content
- `header` - Custom header
- `footer` - Footer content

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build:lib

# Build documentation
npm run docs:build
```

## 📖 Documentation

Full documentation is available at [docs/](./docs/) (coming soon).

## 🎨 Theming

Customize the look and feel using CSS variables:

```css
:root {
  --vasig-primary: #3b82f6;
  --vasig-primary-hover: #2563eb;
  --vasig-secondary: #6b7280;
  /* ... more variables */
}
```

## 📝 License

MIT
