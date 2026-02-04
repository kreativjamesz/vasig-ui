# Vasig UI CLI Setup Guide

## Overview

Nakagawa na tayo ng CLI tool para sa Vasig UI, similar sa shadcn/ui approach! Eto ang ginawa:

## 🎯 Features

1. **`vasig init`** - Initialize Vasig UI sa project mo
2. **`vasig add <component>`** - Add components directly sa codebase mo
3. **`vasig list`** - List all available components

## 📁 Structure

```
cli/
├── src/
│   ├── index.ts          # Main CLI entry point
│   ├── commands/
│   │   ├── init.ts       # Initialize command
│   │   ├── add.ts        # Add component command
│   │   └── list.ts       # List components command
│   └── utils/
│       ├── paths.ts      # Path utilities
│       └── components.ts # Component utilities
├── templates/            # Component templates
│   ├── button/
│   ├── modal/
│   ├── card/
│   ├── alert/
│   ├── container/
│   ├── toast/
│   └── input/
└── package.json
```

## 🚀 How to Use

### 1. Build the CLI

```bash
cd cli
npm install
npm run build
```

### 2. Test Locally

```bash
# Link globally for testing
npm link

# Or use npx
npx @vasig/ui-cli init
```

### 3. Publish to NPM

```bash
cd cli
npm publish
```

## 📝 Usage Examples

### Initialize in a project:

```bash
npx @vasig/ui-cli init
# or with custom paths
npx @vasig/ui-cli init --dir src/components/vasig --css src/styles/vasig.css
```

### Add components:

```bash
npx @vasig/ui-cli add button
npx @vasig/ui-cli add modal
npx @vasig/ui-cli add card --overwrite
```

### List components:

```bash
npx @vasig/ui-cli list
```

## 🔧 How It Works

1. **Init Command:**
   - Creates `vasig.json` config file
   - Creates components directory
   - Adds CSS variables to your CSS file

2. **Add Command:**
   - Copies component files from `templates/` to your project
   - Components are copied directly (not installed as package)
   - Fully customizable - edit them in your codebase!

3. **List Command:**
   - Shows all available components from templates directory

## 🎨 Benefits (like shadcn)

- ✅ **Full Control** - Components are in your codebase
- ✅ **No Dependencies** - Just copy files
- ✅ **Customizable** - Edit components directly
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Tree-shakeable** - Only import what you use

## 📦 Next Steps

1. Install dependencies: `cd cli && npm install`
2. Build: `npm run build`
3. Test locally: `npm link` then `vasig init` in a test project
4. Publish: `npm publish` (when ready)

## 🔄 Updating Templates

Kapag may bagong component, i-copy mo lang sa `cli/templates/`:

```bash
cp -r src/components/NewComponent cli/templates/newcomponent
```

Or use the script:
```bash
node cli/scripts/copy-templates.js
```
