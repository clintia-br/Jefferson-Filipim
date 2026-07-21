import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'dark' | 'teal' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  pill?: boolean
  block?: boolean
  icon?: ReactNode
  iconRight?: ReactNode
}

/** Jefferson Filipim primary action button. Rounded, confident, Poppins-bold. */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  icon,
  iconRight,
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    pill ? styles.pill : '',
    block ? styles.block : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
      {iconRight && <span className={`${styles.icon} ${styles.iconRight}`}>{iconRight}</span>}
    </button>
  )
}
