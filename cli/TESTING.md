# Testing Vasig UI CLI Locally

Since the CLI isn't published to NPM yet, here's how to test it locally:

## Option 1: Use npm link (Recommended)

```bash
cd cli
npm install
npm run build
npm link
```

Then in any project:
```bash
vasig init
vasig add button
vasig list
```

## Option 2: Run directly with node

```bash
cd cli
npm install
npm run build

# Then run commands:
node dist/index.js init
node dist/index.js add button
node dist/index.js list
```

## Option 3: Use npx with local path

```bash
cd cli
npm install
npm run build

# From project root:
npx ./cli/dist/index.js init
npx ./cli/dist/index.js add button
```

## Option 4: Test in a separate project

1. Build the CLI:
```bash
cd cli
npm install
npm run build
npm link
```

2. Create a test Vue project:
```bash
cd ..
npm create vue@latest test-project
cd test-project
```

3. Use the CLI:
```bash
vasig init
vasig add button
vasig add modal
```

## Publishing to NPM (when ready)

1. Make sure you're logged in:
```bash
npm login
```

2. Publish:
```bash
cd cli
npm publish --access public
```

Then users can use:
```bash
npx vasig-ui-vue init
```
