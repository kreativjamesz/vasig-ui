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
├── templates/            # Component templates (19 components)
│   ├── alert/
│   ├── avatar/
│   ├── badge/
│   ├── button/
│   ├── card/
│   ├── checkbox/
│   ├── container/
│   ├── input/
│   ├── label/
│   ├── modal/
│   ├── progress/
│   ├── radio/
│   ├── separator/
│   ├── skeleton/
│   ├── spinner/
│   ├── switch/
│   ├── textarea/
│   ├── toast/
│   └── tooltip/
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
cd cli
npm link

# Then in any test project:
vasig-ui-vue init
vasig-ui-vue list
vasig-ui-vue add button
```

### 3. Publish to NPM (with OTP)

**IMPORTANT: Always use OTP when publishing!**

```bash
cd cli
npm run build

# Publish with OTP (get code from your authenticator app)
npm publish --otp=<your-otp-code> --access public
```

**How to get OTP:**
1. Open your authenticator app (Google Authenticator, Authy, etc.)
2. Find the code for your NPM account
3. Use that 6-digit code in the `--otp` flag

## 📝 Usage Examples

### Initialize in a project:

```bash
npx vasig-ui-vue init
```

The CLI will:
- Detect if you're using Laravel (auto-suggests `resources/js/components/vasig`)
- Ask if you want to install Tailwind CSS configuration
- Configure import aliases automatically
- Set up dark mode and custom gray colors (if Tailwind is installed)

### Add components:

```bash
npx vasig-ui-vue add button
npx vasig-ui-vue add badge
npx vasig-ui-vue add avatar
npx vasig-ui-vue add card --overwrite
```

### List components:

```bash
npx vasig-ui-vue list
```

Shows all 19 available components.

## 🔧 How It Works

1. **Init Command:**
   - Creates `vasig.json` config file
   - Creates components directory
   - Optionally installs Tailwind CSS configuration
   - Configures import aliases in `tsconfig.json` and `vite.config.ts`
   - Sets up dark mode and custom gray colors (if enabled)
   - Detects Laravel projects and uses appropriate defaults

2. **Add Command:**
   - Copies component files from `templates/` to your project
   - Components are copied directly (not installed as package)
   - Fully customizable - edit them in your codebase!
   - Supports `--overwrite` flag to update existing components

3. **List Command:**
   - Shows all 19 available components from templates directory

## 🎨 Benefits (like shadcn)

- ✅ **Full Control** - Components are in your codebase
- ✅ **No Dependencies** - Just copy files
- ✅ **Customizable** - Edit components directly
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Tree-shakeable** - Only import what you use

## 📦 Next Steps

1. Install dependencies: `cd cli && npm install`
2. Build: `npm run build`
3. Test locally: `npm link` then `vasig-ui-vue init` in a test project
4. Publish: `npm publish --otp=<otp-code> --access public` (when ready)

## 🔐 Publishing with OTP

**ALWAYS use OTP when publishing to NPM:**

1. Build the CLI: `cd cli && npm run build`
2. Get OTP code from your authenticator app
3. Publish: `npm publish --otp=<6-digit-code> --access public`

Example:
```bash
npm publish --otp=123456 --access public
```

## 🔄 Updating Templates

Kapag may bagong component, i-copy mo lang sa `cli/templates/`:

```bash
cp -r src/components/NewComponent cli/templates/newcomponent
```

Or use the script:
```bash
node cli/scripts/copy-templates.js
```
