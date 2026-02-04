import type { App } from 'vue'
import Button from './components/Button/Button.vue'
import Modal from './components/Modal/Modal.vue'
import Card from './components/Card/Card.vue'
import Alert from './components/Alert/Alert.vue'
import Container from './components/Container/Container.vue'
import Toast from './components/Toast/Toast.vue'
import Input from './components/Input/Input.vue'
import Badge from './components/Badge/Badge.vue'

// Export components
export { Button, Modal, Card, Alert, Container, Toast, Input, Badge }

// Export types
export type { ButtonProps } from './components/Button/types'
export type { ModalProps } from './components/Modal/types'
export type { CardProps } from './components/Card/types'
export type { AlertProps } from './components/Alert/types'
export type { ContainerProps } from './components/Container/types'
export type { ToastProps } from './components/Toast/types'
export type { InputProps } from './components/Input/types'
export type { BadgeProps } from './components/Badge/types'

// Plugin installation
const components = {
  Button,
  Modal,
  Card,
  Alert,
  Container,
  Toast,
  Input,
  Badge
}

export default {
  install(app: App) {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key as keyof typeof components])
    })
  }
}

// Individual component installation
export const installComponent = (app: App, componentName: string) => {
  const component = components[componentName as keyof typeof components]
  if (component) {
    app.component(componentName, component)
  }
}
