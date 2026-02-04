export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge'
export type AvatarBadgeVariant = 'online' | 'offline' | 'away' | 'busy'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  showBadge?: boolean
  badgeVariant?: AvatarBadgeVariant
  className?: string
}
