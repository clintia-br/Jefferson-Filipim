import { useId, type ComponentPropsWithRef } from 'react'
import styles from './Field.module.css'

interface FieldChrome {
  label?: string
  hint?: string
  error?: string
}

/** Labeled text input for the appointment flow. Blue focus ring, 10px radius. */
export function Input({
  label,
  hint,
  error,
  id,
  className,
  ...rest
}: FieldChrome & ComponentPropsWithRef<'input'>) {
  const generated = useId()
  const inputId = id ?? generated

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[styles.control, error ? styles.error : '', className ?? ''].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${inputId}-hint` : undefined}
        {...rest}
      />
      {(error || hint) && (
        <span id={`${inputId}-hint`} className={`${styles.hint} ${error ? styles.hintError : ''}`}>
          {error || hint}
        </span>
      )}
    </div>
  )
}

/** Labeled multi-line textarea for the appointment flow. */
export function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  className,
  ...rest
}: FieldChrome & ComponentPropsWithRef<'textarea'>) {
  const generated = useId()
  const inputId = id ?? generated

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={[styles.control, error ? styles.error : '', className ?? ''].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${inputId}-hint` : undefined}
        {...rest}
      />
      {(error || hint) && (
        <span id={`${inputId}-hint`} className={`${styles.hint} ${error ? styles.hintError : ''}`}>
          {error || hint}
        </span>
      )}
    </div>
  )
}
