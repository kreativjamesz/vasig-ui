import type { App } from 'vue'
import Button from './components/Button/Button.vue'
import Modal from './components/Modal/Modal.vue'
import Card from './components/Card/Card.vue'
import Alert from './components/Alert/Alert.vue'
import Container from './components/Container/Container.vue'
import Toast from './components/Toast/Toast.vue'
import Input from './components/Input/Input.vue'
import Badge from './components/Badge/Badge.vue'
import Separator from './components/Separator/Separator.vue'
import Skeleton from './components/Skeleton/Skeleton.vue'
import Textarea from './components/Textarea/Textarea.vue'
import Label from './components/Label/Label.vue'
import Switch from './components/Switch/Switch.vue'
import Checkbox from './components/Checkbox/Checkbox.vue'
import Radio from './components/Radio/Radio.vue'
import Progress from './components/Progress/Progress.vue'
import Spinner from './components/Spinner/Spinner.vue'
import Avatar from './components/Avatar/Avatar.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'

// Export components
export { Button, Modal, Card, Alert, Container, Toast, Input, Badge, Separator, Skeleton, Textarea, Label, Switch, Checkbox, Radio, Progress, Spinner, Avatar, Tooltip }

// Export types
export type { ButtonProps } from './components/Button/types'
export type { ModalProps } from './components/Modal/types'
export type { CardProps } from './components/Card/types'
export type { AlertProps } from './components/Alert/types'
export type { ContainerProps } from './components/Container/types'
export type { ToastProps } from './components/Toast/types'
export type { InputProps } from './components/Input/types'
export type { BadgeProps } from './components/Badge/types'
export type { SeparatorProps } from './components/Separator/types'
export type { SkeletonProps } from './components/Skeleton/types'
export type { TextareaProps } from './components/Textarea/types'
export type { LabelProps } from './components/Label/types'
export type { SwitchProps } from './components/Switch/types'
export type { CheckboxProps } from './components/Checkbox/types'
export type { RadioProps } from './components/Radio/types'
export type { ProgressProps, ProgressVariant } from './components/Progress/types'
export type { SpinnerProps, SpinnerSize } from './components/Spinner/types'
export type { AvatarProps, AvatarSize, AvatarBadgeVariant } from './components/Avatar/types'
export type { TooltipProps, TooltipPosition } from './components/Tooltip/types'

// Plugin installation
const components = {
  Button,
  Modal,
  Card,
  Alert,
  Container,
  Toast,
  Input,
  Badge,
  Separator,
  Skeleton,
  Textarea,
  Label,
  Switch,
  Checkbox,
  Radio,
  Progress,
  Spinner,
  Avatar,
  Tooltip
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
