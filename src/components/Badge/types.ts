export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
export type BadgeSize = 'small' | 'medium'

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  closable?: boolean
}
