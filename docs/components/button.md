# Button

A versatile button component with multiple variants and sizes.

## Basic Usage

```vue
<template>
  <Button>Default Button</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
</template>
```

## Variants

```vue
<template>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
</template>
```

## Sizes

```vue
<template>
  <Button size="small">Small</Button>
  <Button size="medium">Medium</Button>
  <Button size="large">Large</Button>
</template>
```

## States

```vue
<template>
  <Button :loading="true">Loading</Button>
  <Button disabled>Disabled</Button>
  <Button block>Block Button</Button>
</template>
```

## Events

```vue
<template>
  <Button @click="handleClick">Click Me</Button>
</template>

<script setup>
const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Button style variant |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| disabled | `boolean` | `false` | Disable the button |
| loading | `boolean` | `false` | Show loading spinner |
| block | `boolean` | `false` | Make button full width |

### Events

| Event | Description |
|-------|-------------|
| click | Emitted when button is clicked |
