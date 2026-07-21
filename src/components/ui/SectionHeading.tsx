import type { HTMLAttributes, Ref } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  tone?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  /** Exposed so section timelines can drive the title through SplitText. */
  titleRef?: Ref<HTMLHeadingElement>
}

/** Section heading block: optional eyebrow kicker, large display title, optional lede. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
  size = 'lg',
  titleRef,
  className,
  ...rest
}: SectionHeadingProps) {
  const classes = [styles.heading, styles[align], styles[tone], className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {eyebrow && (
        <span className={`jf-eyebrow ${styles.eyebrow}`} data-anim data-anim-head>
          {eyebrow}
        </span>
      )}
      <h2 ref={titleRef} className={`${styles.title} ${styles[size]}`} data-anim>
        {title}
      </h2>
      {subtitle && (
        <p className={styles.subtitle} data-anim data-anim-head>
          {subtitle}
        </p>
      )}
    </div>
  )
}
