export type SkeletonVariant = 'text' | 'circle' | 'rectangle'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string
  height?: string
  className?: string
}
