export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'outline' | 'ghost'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  block?: boolean
}
