export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface ContainerProps {
  fluid?: boolean
  size?: ContainerSize
}
