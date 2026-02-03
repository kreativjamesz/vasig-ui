export type AlertType = 'success' | 'warning' | 'error' | 'info'

export interface AlertProps {
  type?: AlertType
  title?: string
  closable?: boolean
  showIcon?: boolean
}
