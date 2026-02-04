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

Vasig UI includes 19+ components:

**Form Components:**
- `Button` - With style and semantic color variants
- `Input` - Text input with validation
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox with label
- `Radio` - Radio button with label
- `Switch` - Toggle switch
- `Label` - Form label component

**Layout Components:**
- `Card` - Card container with header/footer
- `Container` - Responsive container
- `Separator` - Horizontal/vertical divider
- `Badge` - Badge/pill component

**Feedback Components:**
- `Alert` - Alert/notification
- `Toast` - Toast notification
- `Modal` - Modal dialog
- `Tooltip` - Hover tooltip
- `Progress` - Progress bar
- `Spinner` - Loading spinner
- `Skeleton` - Loading skeleton

**Display Components:**
- `Avatar` - User avatar with badge support

### Example Usage

```vue
<template>
  <Button variant="primary" size="medium" @click="handleClick">
    Click Me
  </Button>
  <Button variant="destructive">Delete</Button>
  <Button variant="success">Save</Button>
</template>
```

**Button Variants:**
- Style: `primary`, `secondary`, `outline`, `ghost`
- Semantic: `success`, `warning`, `destructive`, `info`

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

Customize the look and feel using CSS variables in your global CSS file:

```css
@import "tailwindcss";

@theme {
  --color-primary: #55aa00;
  --color-primary-hover: #448800;
  --color-secondary: #6b7280;
  /* ... more variables */
}
```

## 🛠️ CLI Installation

Install components directly into your project using the CLI:

```bash
# Initialize Vasig UI
npx vasig-ui-vue init

# Add components
npx vasig-ui-vue add button
npx vasig-ui-vue add badge
npx vasig-ui-vue list
```

The CLI supports both standard Vue projects and Laravel projects with automatic detection.

## 📝 License

MIT
