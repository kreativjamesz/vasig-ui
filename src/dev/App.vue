<template>
  <div class="dev-container">
    <header class="dev-header">
      <h1>Vasig UI - Component Playground</h1>
      <p>A clean, modern UI kit for Vue 3 + TypeScript</p>
    </header>

    <main class="dev-main">
      <section class="dev-section">
        <h2>Button Component</h2>
        <div class="dev-showcase">
          <div class="dev-group">
            <h3>Variants</h3>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <div class="dev-group">
            <h3>Sizes</h3>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>

          <div class="dev-group">
            <h3>States</h3>
            <Button :loading="true">Loading</Button>
            <Button disabled>Disabled</Button>
            <Button block>Block Button</Button>
          </div>

          <div class="dev-group">
            <h3>Click Handler</h3>
            <Button @click="handleButtonClick">Click Me</Button>
            <p v-if="clickMessage" class="dev-message">{{ clickMessage }}</p>
          </div>
        </div>
      </section>

      <section class="dev-section">
        <h2>Modal Component</h2>
        <div class="dev-showcase">
          <div class="dev-group">
            <Button @click="showModal = true">Open Modal</Button>
            <Button @click="showSmallModal = true">Open Small Modal</Button>
            <Button @click="showLargeModal = true">Open Large Modal</Button>
          </div>
        </div>

        <Modal v-model="showModal" title="Default Modal" @close="handleModalClose">
          <p>This is a default medium-sized modal with some content.</p>
          <p>You can add any content here using slots.</p>
          <template #footer>
            <Button variant="outline" @click="showModal = false">Cancel</Button>
            <Button @click="showModal = false">Confirm</Button>
          </template>
        </Modal>

        <Modal v-model="showSmallModal" title="Small Modal" size="small">
          <p>This is a small modal.</p>
        </Modal>

        <Modal v-model="showLargeModal" title="Large Modal" size="large">
          <p>This is a large modal with more space for content.</p>
          <p>Perfect for forms, detailed information, or complex layouts.</p>
        </Modal>
      </section>

      <section class="dev-section">
        <h2>Card Component</h2>
        <div class="dev-showcase">
          <div class="dev-group">
            <h3>Basic Card</h3>
            <Card title="Card Title">
              <p>This is a basic card with a title and content.</p>
            </Card>
          </div>

          <div class="dev-group">
            <h3>Card with Footer</h3>
            <Card title="Card with Footer">
              <p>This card has a footer section.</p>
              <template #footer>
                <Button size="small">Action</Button>
              </template>
            </Card>
          </div>

          <div class="dev-group">
            <h3>Hoverable Card</h3>
            <Card title="Hoverable Card" hoverable>
              <p>Hover over this card to see the effect.</p>
            </Card>
          </div>

          <div class="dev-group">
            <h3>Card Variants</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
              <Card :bordered="true" :shadow="false">No Shadow</Card>
              <Card :bordered="false" :shadow="true">No Border</Card>
              <Card :bordered="false" :shadow="false">Plain Card</Card>
            </div>
          </div>
        </div>
      </section>

      <section class="dev-section">
        <h2>Alert Component</h2>
        <div class="dev-showcase">
          <div class="dev-group">
            <h3>Alert Types</h3>
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

          <div class="dev-group">
            <h3>Without Title</h3>
            <Alert type="success">Simple success message without title.</Alert>
            <Alert type="info">Simple info message.</Alert>
          </div>
        </div>
      </section>

      <section class="dev-section">
        <h2>Container Component</h2>
        <div class="dev-showcase">
          <div class="dev-group">
            <h3>Responsive Container</h3>
            <Container>
              <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">
                <p>This container automatically adjusts its max-width based on screen size.</p>
                <p>Try resizing your browser window to see it in action.</p>
              </div>
            </Container>
          </div>

          <div class="dev-group">
            <h3>Fixed Size Containers</h3>
            <Container size="sm">
              <div style="background: #dbeafe; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                Small container (max-width: 640px)
              </div>
            </Container>
            <Container size="md">
              <div style="background: #dbeafe; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                Medium container (max-width: 768px)
              </div>
            </Container>
            <Container size="lg">
              <div style="background: #dbeafe; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                Large container (max-width: 1024px)
              </div>
            </Container>
          </div>

          <div class="dev-group">
            <h3>Fluid Container</h3>
            <Container fluid>
              <div style="background: #fef3c7; padding: 1rem; border-radius: 0.5rem;">
                Fluid container takes full width with padding.
              </div>
            </Container>
          </div>
        </div>
      </section>

      <section class="dev-section">
        <h2>Toast Component</h2>
        <div class="dev-showcase">
          <div class="dev-group">
            <h3>Toast Types</h3>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <Button @click="showToastMessage('success')">Success Toast</Button>
              <Button @click="showToastMessage('info')">Info Toast</Button>
              <Button @click="showToastMessage('warning')">Warning Toast</Button>
              <Button @click="showToastMessage('error')">Error Toast</Button>
            </div>
          </div>
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

      <section class="dev-section">
        <h2>Input Component</h2>
        <div class="dev-showcase">
          <div class="dev-group">
            <h3>Basic Input</h3>
            <Input
              v-model="inputValue"
              label="Name"
              placeholder="Enter your name"
              @blur="handleInputBlur"
            />
          </div>

          <div class="dev-group">
            <h3>Input with Hint</h3>
            <Input
              v-model="inputValue"
              label="Email"
              type="email"
              placeholder="example@email.com"
              hint="We'll never share your email with anyone else."
            />
          </div>

          <div class="dev-group">
            <h3>Input with Error</h3>
            <Input
              v-model="inputValue"
              label="Required Field"
              placeholder="This field is required"
              :error-message="inputError"
              required
              @blur="handleInputBlur"
            />
          </div>

          <div class="dev-group">
            <h3>Input States</h3>
            <Input
              v-model="inputValue"
              label="Disabled Input"
              placeholder="This is disabled"
              disabled
            />
            <Input
              v-model="inputValue"
              label="Readonly Input"
              placeholder="This is readonly"
              readonly
            />
          </div>

          <div class="dev-group">
            <h3>Input with Prefix/Suffix</h3>
            <Input
              v-model="inputValue"
              label="Price"
              type="number"
              placeholder="0.00"
            >
              <template #prefix>$</template>
            </Input>
            <Input
              v-model="inputValue"
              label="Website"
              type="url"
              placeholder="example"
            >
              <template #suffix>.com</template>
            </Input>
          </div>

          <div class="dev-group">
            <h3>Different Input Types</h3>
            <Input
              v-model="inputValue"
              label="Password"
              type="password"
              placeholder="Enter password"
            />
            <Input
              v-model="inputValue"
              label="Search"
              type="search"
              placeholder="Search..."
            />
            <Input
              v-model="inputValue"
              label="Date"
              type="date"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Modal from '../components/Modal/Modal.vue'
import Card from '../components/Card/Card.vue'
import Alert from '../components/Alert/Alert.vue'
import Container from '../components/Container/Container.vue'
import Toast from '../components/Toast/Toast.vue'
import Input from '../components/Input/Input.vue'

const showModal = ref(false)
const showSmallModal = ref(false)
const showLargeModal = ref(false)
const clickMessage = ref('')
const showAlert = ref(true)
const showToast = ref(false)
const toastType = ref<'success' | 'warning' | 'error' | 'info'>('info')
const inputValue = ref('')
const inputError = ref('')

const handleButtonClick = () => {
  clickMessage.value = 'Button clicked! 🎉'
  setTimeout(() => {
    clickMessage.value = ''
  }, 2000)
}

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

<style scoped>
.dev-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.dev-header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.dev-header h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.dev-header p {
  font-size: 1.25rem;
  margin: 0;
  opacity: 0.9;
}

.dev-main {
  max-width: 1200px;
  margin: 0 auto;
}

.dev-section {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.dev-section h2 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
  font-size: 1.75rem;
}

.dev-showcase {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dev-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dev-group h3 {
  margin: 0;
  color: #4b5563;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dev-group :deep(.vasig-button) {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.dev-message {
  color: #10b981;
  font-weight: 500;
  margin-top: 0.5rem;
}

.dev-group :deep(.vasig-card) {
  margin-bottom: 1rem;
}

.dev-group :deep(.vasig-alert) {
  margin-bottom: 1rem;
}

.dev-group :deep(.vasig-input-wrapper) {
  margin-bottom: 1rem;
}
</style>
