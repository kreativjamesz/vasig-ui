# Vasig UI CLI

CLI tool for adding Vasig UI components to your Vue 3 project, similar to shadcn/ui.

## Installation

```bash
npm install -g vasig-ui-vue
# or
npx vasig-ui-vue
```

## Usage

### Initialize Vasig UI in your project

```bash
npx vasig-ui-vue init
```

This will:
- Create a `vasig.json` config file
- Create a components directory (default: `src/components/vasig`)
- Create a `utils/cn.ts` utility file for class merging
- Configure `@` path alias in `tsconfig.json` and `vite.config.ts`
- Add CSS variables to your CSS file

**Note:** The default directory is `src/components/vasig` to avoid conflicts with other UI libraries. You can customize it:
```bash
npx vasig-ui-vue init --dir src/components/my-custom-dir
```

### Add a component

```bash
npx vasig-ui-vue add button
npx vasig-ui-vue add modal
npx vasig-ui-vue add card
```

### List available components

```bash
npx vasig-ui-vue list
```

### Overwrite existing component

```bash
npx vasig-ui-vue add button --overwrite
```

## Configuration

After running `init`, a `vasig.json` file will be created:

```json
{
  "componentsDir": "src/components/vasig",
  "cssFile": "src/style.css",
  "version": "0.1.0"
}
```

You can customize these paths when initializing:

```bash
# Custom components directory
npx vasig-ui-vue init --dir src/components/my-ui

# Custom CSS file
npx vasig-ui-vue init --css src/styles/custom.css

# Both custom
npx vasig-ui-vue init --dir src/components/my-ui --css src/styles/custom.css
```

## Path Alias Configuration

Vasig UI components use the `@/utils/cn` import path. The `init` command automatically configures this alias in:
- `tsconfig.json` - Adds `"@/*": ["src/*"]` to `compilerOptions.paths`
- `vite.config.ts` - Adds `'@': resolve(__dirname, 'src')` to `resolve.alias`

**If you see import errors like `Cannot find module '@/utils/cn'`:**

1. **Check `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

2. **Check `vite.config.ts`:**
```typescript
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

3. **If using a custom directory structure**, adjust the paths accordingly.

## How it works

Unlike traditional UI libraries that install as npm packages, Vasig UI CLI copies component files directly into your project. This means:

- ✅ **Full customization** - Edit components directly in your codebase
- ✅ **No dependencies** - Components are yours to modify
- ✅ **Tree-shakeable** - Only import what you use
- ✅ **Type-safe** - Full TypeScript support

## Development

```bash
cd cli
npm install
npm run build
```

## Available Components

- `button` - Versatile button component
- `modal` - Flexible modal dialog
- `card` - Card container component
- `alert` - Alert/notification component
- `container` - Responsive container
- `toast` - Toast notification
- `input` - Form input component
