export type SpinnerSize = 'small' | 'medium' | 'large' | 'xlarge'

export interface SpinnerProps {
  size?: SpinnerSize
  ariaLabel?: string
  className?: string
}
