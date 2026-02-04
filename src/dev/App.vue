<template>
  <div :class="['min-h-screen transition-colors', isDark ? 'dark bg-gray-900' : 'bg-gray-50']">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Vasig UI Vue</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">A clean, modern UI kit for Vue 3</p>
        </div>
        <button
          @click="toggleDark"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          <svg
            v-if="isDark"
            class="w-6 h-6 text-gray-900 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6 text-gray-900 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <!-- Button Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Button</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Variants</h3>
            <div class="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">States</h3>
            <div class="flex flex-wrap gap-4">
              <Button :loading="true">Loading</Button>
              <Button disabled>Disabled</Button>
              <Button block class="max-w-xs">Block Button</Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Modal</h2>
        <div class="flex gap-4">
          <Button @click="showModal = true">Open Modal</Button>
          <Button @click="showSmallModal = true">Small Modal</Button>
          <Button @click="showLargeModal = true">Large Modal</Button>
        </div>

        <Modal v-model="showModal" title="Default Modal" @close="handleModalClose">
          <p class="text-gray-700 dark:text-gray-300">This is a default medium-sized modal with some content.</p>
          <p class="text-gray-700 dark:text-gray-300 mt-2">You can add any content here using slots.</p>
          <template #footer>
            <Button variant="outline" @click="showModal = false">Cancel</Button>
            <Button @click="showModal = false">Confirm</Button>
          </template>
        </Modal>

        <Modal v-model="showSmallModal" title="Small Modal" size="small">
          <p class="text-gray-700 dark:text-gray-300">This is a small modal.</p>
        </Modal>

        <Modal v-model="showLargeModal" title="Large Modal" size="large">
          <p class="text-gray-700 dark:text-gray-300">This is a large modal with more space for content.</p>
          <p class="text-gray-700 dark:text-gray-300 mt-2">Perfect for forms, detailed information, or complex layouts.</p>
        </Modal>
      </section>

      <!-- Card Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Card</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Basic Card">
            <p class="text-gray-700 dark:text-gray-300">This is a basic card with a title and content.</p>
          </Card>

          <Card title="Card with Footer">
            <p class="text-gray-700 dark:text-gray-300">This card has a footer section.</p>
            <template #footer>
              <Button size="small">Action</Button>
            </template>
          </Card>

          <Card title="Hoverable Card" hoverable>
            <p class="text-gray-700 dark:text-gray-300">Hover over this card to see the effect.</p>
          </Card>
        </div>
      </section>

      <!-- Alert Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Alert</h2>
        <div class="space-y-4">
          <Alert type="success" title="Success!" closable @close="showAlert = false">
            Operation completed successfully.
          </Alert>
          <Alert type="info" title="Information">
            Here's some important information for you.
          </Alert>
          <Alert type="warning" title="Warning">
            Please be careful with this action.
          </Alert>
          <Alert type="error" title="Error" closable>
            Something went wrong. Please try again.
          </Alert>
        </div>
      </section>

      <!-- Input Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Input</h2>
        <div class="max-w-md space-y-4">
          <Input
            v-model="inputValue"
            label="Name"
            placeholder="Enter your name"
            @blur="handleInputBlur"
          />
          <Input
            v-model="inputValue"
            label="Email"
            type="email"
            placeholder="example@email.com"
            hint="We'll never share your email with anyone else."
          />
          <Input
            v-model="inputValue"
            label="Required Field"
            placeholder="This field is required"
            :error-message="inputError"
            required
            @blur="handleInputBlur"
          />
        </div>
      </section>

      <!-- Toast Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Toast</h2>
        <div class="flex flex-wrap gap-4">
          <Button @click="showToastMessage('success')">Success Toast</Button>
          <Button @click="showToastMessage('info')">Info Toast</Button>
          <Button @click="showToastMessage('warning')">Warning Toast</Button>
          <Button @click="showToastMessage('error')">Error Toast</Button>
        </div>

        <Toast
          v-model="showToast"
          :type="toastType"
          :title="toastType.charAt(0).toUpperCase() + toastType.slice(1) + '!'"
          :message="`This is a ${toastType} toast message.`"
          position="top-right"
          :duration="3000"
        />
      </section>

      <!-- Container Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Container</h2>
        <Container>
          <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
            <p class="text-gray-900 dark:text-white">This container automatically adjusts its max-width based on screen size.</p>
            <p class="text-gray-700 dark:text-gray-300 mt-2">Try resizing your browser window to see it in action.</p>
          </div>
        </Container>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '../components/Button/Button.vue'
import Modal from '../components/Modal/Modal.vue'
import Card from '../components/Card/Card.vue'
import Alert from '../components/Alert/Alert.vue'
import Container from '../components/Container/Container.vue'
import Toast from '../components/Toast/Toast.vue'
import Input from '../components/Input/Input.vue'

const isDark = ref(false)
const showModal = ref(false)
const showSmallModal = ref(false)
const showLargeModal = ref(false)
const showAlert = ref(true)
const showToast = ref(false)
const toastType = ref<'success' | 'warning' | 'error' | 'info'>('info')
const inputValue = ref('')
const inputError = ref('')

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const handleModalClose = () => {
  console.log('Modal closed')
}

const showToastMessage = (type: 'success' | 'warning' | 'error' | 'info') => {
  toastType.value = type
  showToast.value = true
}

const handleInputBlur = () => {
  if (!inputValue.value) {
    inputError.value = 'This field is required'
  } else {
    inputError.value = ''
  }
}
</script>
