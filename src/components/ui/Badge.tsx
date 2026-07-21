import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeTone = 'blue' | 'teal' | 'neutral' | 'success'
export type BadgeVariant = 'solid' | 'soft' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  tone?: BadgeTone
  variant?: BadgeVariant
}

/** Small pill label — credentials, specialties, tags ("Geriatria", "CREFITO-3"). */
export default function Badge({
  children,
  tone = 'blue',
  variant = 'soft',
  className,
  ...rest
}: BadgeProps) {
  const classes = [styles.badge, styles[tone], styles[variant], className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}
