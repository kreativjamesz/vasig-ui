export type ModalSize = 'small' | 'medium' | 'large'

export interface ModalProps {
  modelValue: boolean
  title?: string
  size?: ModalSize
  centered?: boolean
  closable?: boolean
  closeOnOverlay?: boolean
}
