<template>
  <div :class="['min-h-screen transition-colors', isDark ? 'dark' : '']">
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
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Style Variants</h3>
            <div class="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Semantic Color Variants</h3>
            <div class="flex flex-wrap gap-4">
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="info">Info</Button>
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

      <!-- Textarea Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Textarea</h2>
        <div class="max-w-md space-y-4">
          <Textarea
            v-model="textareaValue"
            label="Message"
            placeholder="Enter your message"
            :rows="4"
          />
          <Textarea
            v-model="textareaValue"
            label="Description"
            placeholder="Enter a description"
            hint="This is a helpful hint for the user."
            :rows="5"
          />
          <Textarea
            v-model="textareaValue"
            label="Required Textarea"
            placeholder="This field is required"
            :error-message="textareaError"
            required
            :rows="4"
            @blur="handleTextareaBlur"
          />
          <Textarea
            v-model="textareaValue"
            label="Disabled"
            placeholder="This textarea is disabled"
            disabled
            :rows="3"
          />
        </div>
      </section>

      <!-- Label Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Label</h2>
        <div class="max-w-md space-y-4">
          <div>
            <Label html-for="basic-input">Basic Label</Label>
            <Input id="basic-input" placeholder="Enter text" class="mt-1.5" model-value="" />
          </div>
          <div>
            <Label html-for="required-input" required>Required Label</Label>
            <Input id="required-input" placeholder="This field is required" class="mt-1.5" model-value="" />
          </div>
          <div>
            <Label html-for="error-input" has-error>Label with Error</Label>
            <Input id="error-input" placeholder="This field has an error" :error-message="'This field is required'" class="mt-1.5" model-value="" />
          </div>
          <div>
            <Label html-for="disabled-input" disabled>Disabled Label</Label>
            <Input id="disabled-input" placeholder="This field is disabled" disabled class="mt-1.5" model-value="" />
          </div>
        </div>
      </section>

      <!-- Badge Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Badge</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Variants</h3>
            <div class="flex flex-wrap items-center gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Sizes</h3>
            <div class="flex flex-wrap items-center gap-3">
              <Badge size="small">Small</Badge>
              <Badge size="medium">Medium</Badge>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Closable</h3>
            <div class="flex flex-wrap items-center gap-3">
              <Badge variant="default" closable @close="() => {}">Closable</Badge>
              <Badge variant="primary" closable @close="() => {}">Primary</Badge>
              <Badge variant="success" closable @close="() => {}">Success</Badge>
            </div>
          </div>
        </div>
      </section>

      <!-- Separator Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Separator</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Horizontal</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Basic horizontal separator:</p>
                <Separator />
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">With label:</p>
                <Separator label="OR" />
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">With custom label:</p>
                <Separator label="Continue with" />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Vertical</h3>
            <div class="flex items-center h-20">
              <span class="text-sm text-gray-600 dark:text-gray-400">Left</span>
              <Separator orientation="vertical" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Middle</span>
              <Separator orientation="vertical" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Right</span>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">In Context</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-900 dark:text-white">Section 1</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">Some content here</p>
              </div>
              <Separator />
              <div>
                <p class="text-sm text-gray-900 dark:text-white">Section 2</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">More content here</p>
              </div>
              <Separator label="OR" />
              <div>
                <p class="text-sm text-gray-900 dark:text-white">Section 3</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">Even more content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skeleton Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Skeleton</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Variants</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Text skeleton:</p>
                <div class="space-y-2">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Circle skeleton (for avatars):</p>
                <div class="flex items-center gap-4">
                  <Skeleton variant="circle" />
                  <div class="flex-1 space-y-2">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Rectangle skeleton:</p>
                <Skeleton variant="rectangle" width="100%" height="120px" />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">In Context</h3>
            <div class="space-y-4">
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex items-center gap-3 mb-3">
                  <Skeleton variant="circle" width="40px" height="40px" />
                  <div class="flex-1 space-y-2">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="60%" />
                  </div>
                </div>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="80%" />
              </div>
            </div>
          </div>
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

      <!-- Switch Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Switch</h2>
        <div class="max-w-md space-y-4">
          <div class="flex items-center gap-3">
            <Switch v-model:checked="switchValue" />
            <Label>Toggle Switch</Label>
          </div>
          <div class="flex items-center gap-3">
            <Switch v-model:checked="switchValue2" />
            <Label>Another Switch</Label>
          </div>
          <div class="flex items-center gap-3">
            <Switch :checked="true" disabled />
            <Label disabled>Disabled (Checked)</Label>
          </div>
          <div class="flex items-center gap-3">
            <Switch :checked="false" disabled />
            <Label disabled>Disabled (Unchecked)</Label>
          </div>
        </div>
      </section>

      <!-- Checkbox Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Checkbox</h2>
        <div class="max-w-md space-y-4">
          <Checkbox v-model:checked="checkboxValue" label="Accept terms and conditions" />
          <Checkbox v-model:checked="checkboxValue2" label="Subscribe to newsletter" />
          <Checkbox :checked="true" label="Checked by default" />
          <Checkbox :checked="false" label="Unchecked by default" />
          <Checkbox :checked="true" disabled label="Disabled (Checked)" />
          <Checkbox :checked="false" disabled label="Disabled (Unchecked)" />
          <Checkbox v-model:checked="checkboxRequired" required label="Required checkbox" />
        </div>
      </section>

      <!-- Radio Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Radio</h2>
        <div class="max-w-md space-y-3">
          <Radio
            name="option"
            value="option1"
            :checked="radioValue === 'option1'"
            label="Option 1"
            @change="radioValue = 'option1'"
          />
          <Radio
            name="option"
            value="option2"
            :checked="radioValue === 'option2'"
            label="Option 2"
            @change="radioValue = 'option2'"
          />
          <Radio
            name="option"
            value="option3"
            :checked="radioValue === 'option3'"
            label="Option 3"
            @change="radioValue = 'option3'"
          />
          <Radio
            name="option"
            value="option4"
            :checked="radioValue === 'option4'"
            label="Disabled Option"
            disabled
            @change="radioValue = 'option4'"
          />
        </div>
      </section>

      <!-- Progress Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Progress</h2>
        <div class="max-w-md space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Default</h3>
            <Progress :value="progressValue" show-label />
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Variants</h3>
            <div class="space-y-4">
              <Progress :value="75" variant="default" show-label />
              <Progress :value="60" variant="info" show-label />
              <Progress :value="90" variant="success" show-label />
              <Progress :value="45" variant="warning" show-label />
              <Progress :value="30" variant="error" show-label />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Without Label</h3>
            <Progress :value="50" />
          </div>
        </div>
      </section>

      <!-- Spinner Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Spinner</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Sizes</h3>
            <div class="flex items-center gap-6">
              <div class="flex flex-col items-center gap-2">
                <Spinner size="small" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Small</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Spinner size="medium" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Medium</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Spinner size="large" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Large</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Spinner size="xlarge" />
                <span class="text-xs text-gray-600 dark:text-gray-400">XLarge</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">In Context</h3>
            <div class="flex items-center gap-4">
              <Button :loading="true">Loading Button</Button>
              <div class="flex items-center gap-2">
                <Spinner size="small" />
                <span class="text-sm text-gray-600 dark:text-gray-400">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Avatar Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Avatar</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Sizes</h3>
            <div class="flex items-center gap-6">
              <div class="flex flex-col items-center gap-2">
                <Avatar size="small" alt="John Doe" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Small</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Avatar size="medium" alt="Jane Smith" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Medium</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Avatar size="large" alt="Bob Johnson" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Large</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Avatar size="xlarge" alt="Alice Brown" />
                <span class="text-xs text-gray-600 dark:text-gray-400">XLarge</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">With Image</h3>
            <div class="flex items-center gap-4">
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="John Doe"
                size="medium"
              />
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                alt="Jane Smith"
                size="large"
              />
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
                alt="Bob Johnson"
                size="xlarge"
              />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">With Badge</h3>
            <div class="flex items-center gap-4">
              <Avatar alt="John Doe" size="medium" :show-badge="true" badge-variant="online" />
              <Avatar alt="Jane Smith" size="medium" :show-badge="true" badge-variant="away" />
              <Avatar alt="Bob Johnson" size="medium" :show-badge="true" badge-variant="busy" />
              <Avatar alt="Alice Brown" size="medium" :show-badge="true" badge-variant="offline" />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">In Context</h3>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-w-md">
              <div class="flex items-center gap-3">
                <Avatar
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                  alt="User Name"
                  size="medium"
                  :show-badge="true"
                  badge-variant="online"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tooltip Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Tooltip</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Positions</h3>
            <div class="flex flex-wrap items-center gap-8 justify-start pt-2 pb-12">
              <Tooltip content="Tooltip on top" position="top">
                <Button variant="outline">Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" position="bottom">
                <Button variant="outline">Bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip on left" position="left">
                <Button variant="outline">Left</Button>
              </Tooltip>
              <Tooltip content="Tooltip on right" position="right">
                <Button variant="outline">Right</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">With Arrow</h3>
            <div class="flex items-center gap-4">
              <Tooltip content="This tooltip has an arrow" position="top" :show-arrow="true">
                <Button variant="primary">With Arrow</Button>
              </Tooltip>
              <Tooltip content="This tooltip has no arrow" position="top" :show-arrow="false">
                <Button variant="secondary">Without Arrow</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">With Delay</h3>
            <div class="flex items-center gap-4">
              <Tooltip content="This tooltip appears after 500ms" position="top" :delay="500">
                <Button variant="outline">Hover me (500ms delay)</Button>
              </Tooltip>
              <Tooltip content="This tooltip appears immediately" position="top" :delay="0">
                <Button variant="outline">Hover me (no delay)</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">In Context</h3>
            <div class="flex items-center gap-4">
              <Tooltip content="Click to save your changes" position="top">
                <Button variant="primary">
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </Button>
              </Tooltip>
              <Tooltip content="Delete this item permanently" position="top">
                <Button variant="outline" class="text-red-600 hover:text-red-700">
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
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
import Badge from '../components/Badge/Badge.vue'
import Separator from '../components/Separator/Separator.vue'
import Skeleton from '../components/Skeleton/Skeleton.vue'
import Textarea from '../components/Textarea/Textarea.vue'
import Label from '../components/Label/Label.vue'
import Switch from '../components/Switch/Switch.vue'
import Checkbox from '../components/Checkbox/Checkbox.vue'
import Radio from '../components/Radio/Radio.vue'
import Progress from '../components/Progress/Progress.vue'
import Spinner from '../components/Spinner/Spinner.vue'
import Avatar from '../components/Avatar/Avatar.vue'
import Tooltip from '../components/Tooltip/Tooltip.vue'

const isDark = ref(false)
const showModal = ref(false)
const showSmallModal = ref(false)
const showLargeModal = ref(false)
const showAlert = ref(true)
const showToast = ref(false)
const toastType = ref<'success' | 'warning' | 'error' | 'info'>('info')
const inputValue = ref('')
const inputError = ref('')
const textareaValue = ref('')
const textareaError = ref('')
const switchValue = ref(false)
const switchValue2 = ref(true)
const checkboxValue = ref(false)
const checkboxValue2 = ref(true)
const checkboxRequired = ref(false)
const radioValue = ref('option1')
const progressValue = ref(65)

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

const handleTextareaBlur = () => {
  if (!textareaValue.value) {
    textareaError.value = 'This field is required'
  } else {
    textareaError.value = ''
  }
}
</script>
