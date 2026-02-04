export type ProgressVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

export interface ProgressProps {
  value?: number
  variant?: ProgressVariant
  showLabel?: boolean
  className?: string
}
