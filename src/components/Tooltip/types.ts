export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content?: string
  position?: TooltipPosition
  showArrow?: boolean
  delay?: number
  className?: string
  style?: string | Record<string, string>
}
