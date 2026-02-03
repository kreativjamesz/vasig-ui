export type ToastType = 'success' | 'warning' | 'error' | 'info'
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface ToastProps {
  modelValue: boolean
  type?: ToastType
  position?: ToastPosition
  title?: string
  message?: string
  closable?: boolean
  showIcon?: boolean
  duration?: number
}
