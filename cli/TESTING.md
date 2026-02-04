# Testing Vasig UI CLI Locally

Here's how to test the CLI before deploying to NPM:

## Option 1: Use npm link (Recommended for Testing)

This is the best way to test the CLI locally:

```bash
# 1. Build the CLI
cd cli
npm install
npm run build

# 2. Link it globally
npm link
```

Then in any test project:
```bash
# Create a test Vue project
npm create vue@latest test-vasig-ui
cd test-vasig-ui
npm install

# Test the CLI
vasig-ui-vue init
vasig-ui-vue add button
vasig-ui-vue add badge
vasig-ui-vue list
```

**To unlink after testing:**
```bash
cd cli
npm unlink -g vasig-ui-vue
```

## Option 2: Run directly with node

```bash
cd cli
npm install
npm run build

# Then run commands in a test project:
cd ../test-project
node ../cli/dist/index.js init
node ../cli/dist/index.js add button
node ../cli/dist/index.js list
```

## Option 3: Use npx with local path

```bash
cd cli
npm install
npm run build

# From a test project:
cd ../test-project
npx ../vasig-ui/cli/dist/index.js init
npx ../vasig-ui/cli/dist/index.js add button
```

## Testing Checklist

Before publishing, test these scenarios:

### 1. Test Interactive Init
```bash
vasig-ui-vue init
# Test all questions:
# - Components directory
# - CSS file (with auto-detection)
# - Import aliases
# - Dark mode
# - Custom gray colors
```

### 2. Test CSS File Detection
- Create a test project with `src/style.css` or `src/index.css`
- Run `vasig-ui-vue init`
- Verify it detects existing CSS files
- Test confirmation prompt when selecting existing file

### 3. Test with Flags
```bash
vasig-ui-vue init --dir src/components/my-ui --css src/styles/custom.css
```

### 4. Test Component Addition
```bash
vasig-ui-vue add button
vasig-ui-vue add badge
vasig-ui-vue add separator
vasig-ui-vue list
```

### 5. Test Overwrite
```bash
vasig-ui-vue add button
vasig-ui-vue add button --overwrite
```

## Publishing to NPM

**IMPORTANT: Always use OTP when publishing!**

### Step-by-Step Publishing Process:

1. **Make sure you're logged in:**
```bash
npm login
```

2. **Build the CLI:**
```bash
cd cli
npm run build
```

3. **Get OTP code:**
   - Open your authenticator app (Google Authenticator, Authy, etc.)
   - Find the 6-digit code for your NPM account
   - The code refreshes every 30 seconds

4. **Publish with OTP:**
```bash
# For CLI package (vasig-ui-vue) - NOT scoped, public by default
npm publish --otp=<your-6-digit-code>

# For main library (@vasig/ui) - scoped, requires --access public
npm publish --otp=<your-6-digit-code> --access public
```

**Example:**
```bash
# CLI package (vasig-ui-vue) - no --access needed
npm publish --otp=123456

# Main library (@vasig/ui) - --access public required
npm publish --otp=123456 --access public
```

**Note:** 
- Scoped packages (`@vasig/ui`) default to private, so `--access public` is REQUIRED
- Non-scoped packages (`vasig-ui-vue`) are public by default, so `--access public` is optional

5. **Verify publication:**
```bash
npm view vasig-ui-vue
```

### After Publishing:

Users can now use:
```bash
npx vasig-ui-vue init
npx vasig-ui-vue add button
npx vasig-ui-vue list
```


### Troubleshooting OTP:

- **"Invalid OTP"**: Make sure you're using the current code (they expire every 30 seconds)
- **"OTP required"**: Your NPM account has 2FA enabled, which is required
- **Can't find OTP**: Check your authenticator app or NPM account settings
