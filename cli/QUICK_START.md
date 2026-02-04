# Quick Start - Testing Vasig UI CLI Locally

## ✅ CLI is Built and Ready!

The CLI has been built successfully. Here's how to test it:

## Method 1: Use npm link (Best for Testing)

```bash
cd cli
npm link
```

Then in any project directory:
```bash
vasig init
vasig list
vasig add button
```

## Method 2: Run Directly

```bash
cd cli
node dist/index.js init
node dist/index.js list
node dist/index.js add button
```

## Method 3: Create a Test Project

1. **Build and link the CLI:**
```bash
cd cli
npm link
```

2. **Create a test Vue project:**
```bash
cd ..
npm create vue@latest test-vasig
cd test-vasig
npm install
```

3. **Initialize Vasig UI:**
```bash
vasig init
```

4. **Add components:**
```bash
vasig add button
vasig add modal
vasig add card
```

5. **Use the components:**
```vue
<script setup>
import Button from './components/ui/button/Button.vue'
</script>

<template>
  <Button>Click Me</Button>
</template>
```

## Available Components (19 total)

- `alert`, `avatar`, `badge`, `button`, `card`, `checkbox`, `container`
- `input`, `label`, `modal`, `progress`, `radio`, `separator`
- `skeleton`, `spinner`, `switch`, `textarea`, `toast`, `tooltip`

Use `vasig-ui-vue list` to see all available components.

## Publishing to NPM (When Ready)

**IMPORTANT: Always use OTP when publishing!**

1. **Login to NPM:**
```bash
npm login
```

2. **Build the CLI:**
```bash
cd cli
npm run build
```

3. **Get OTP code from your authenticator app** (Google Authenticator, Authy, etc.)

4. **Publish with OTP:**
```bash
# CLI package (vasig-ui-vue) - NOT scoped, public by default
npm publish --otp=<your-6-digit-code>

# Main library (@vasig/ui) - scoped, requires --access public  
npm publish --otp=<your-6-digit-code> --access public
```

**Note:** 
- `vasig-ui-vue` is NOT scoped → public by default → `--access public` is optional
- `@vasig/ui` IS scoped → defaults to private → `--access public` is REQUIRED

5. **Then users can use:**
```bash
npx vasig-ui-vue init
npx vasig-ui-vue add button
```

## Troubleshooting

If `vasig` command not found after `npm link`:
- Make sure you're in a directory with a `package.json`
- Try `npx vasig-ui-vue` instead
- Check that npm link worked: `npm list -g --depth=0`
