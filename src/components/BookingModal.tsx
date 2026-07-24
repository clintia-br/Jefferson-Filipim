'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useGSAP } from '@gsap/react'
import { Check, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { SITE, WHATSAPP_NUMBER } from '@/lib/site'
import { gsap, reduceMotion } from '@/lib/motion'
import styles from './BookingModal.module.css'

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [sent, setSent] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)

  // Kept mounted for one extra beat after `open` flips false so the closing
  // animation has something to animate.
  useEffect(() => {
    if (open) {
      setMounted(true)
      setSent(false)
    }
  }, [open])

  useGSAP(
    () => {
      if (!mounted || !overlayRef.current || !dialogRef.current) return

      if (reduceMotion()) {
        gsap.set(overlayRef.current, { autoAlpha: open ? 1 : 0 })
        if (!open) setMounted(false)
        return
      }

      if (open) {
        gsap
          .timeline()
          .to(overlayRef.current, { autoAlpha: 1, duration: 0.28, ease: 'power2.out' })
          .from(
            dialogRef.current,
            { y: 28, scale: 0.96, autoAlpha: 0, duration: 0.45, ease: 'power3.out' },
            0.05,
          )
      } else {
        gsap
          .timeline({ onComplete: () => setMounted(false) })
          .to(dialogRef.current, { y: 16, scale: 0.97, autoAlpha: 0, duration: 0.25, ease: 'power2.in' })
          .to(overlayRef.current, { autoAlpha: 0, duration: 0.22, ease: 'power2.in' }, 0.05)
      }
    },
    { dependencies: [open, mounted] },
  )

  // Lock the page, close on Escape, and move focus into the dialog.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 120)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(focusTimer)
    }
  }, [open, onClose])

  /**
   * There is no backend: the form hands the visitor off to WhatsApp with the
   * message already written. Opening the tab from inside the submit handler
   * keeps it a user-initiated navigation, which is what popup blockers allow.
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('nome') ?? '').trim()
    const phone = String(data.get('whatsapp') ?? '').trim()
    const notes = String(data.get('caso') ?? '').trim()

    const message = [
      `Olá, ${SITE.brand}! Gostaria de agendar uma avaliação domiciliar.`,
      '',
      `Nome: ${name}`,
      `WhatsApp: ${phone}`,
      notes && `Sobre o caso: ${notes}`,
    ]
      .filter(Boolean)
      .join('\n')

    // Registro do lead na planilha (via AppSheet) — melhor esforço, nunca
    // deve atrasar ou bloquear o handoff pro WhatsApp abaixo.
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: name, whatsapp: phone, caso: notes }),
    }).catch(() => {})

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )

    // GTM — evento de lead. O envio deste formulário é o próprio handoff
    // para o WhatsApp, então este é o único evento de conversão disparado.
    window.dataLayer?.push({ event: 'lead_form_submit' })

    setSent(true)
  }

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Agendar avaliação"
    >
      <div ref={dialogRef} className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>

        {sent ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <Check size={34} strokeWidth={2.4} />
            </div>
            <h3 className={styles.successTitle}>Tudo certo!</h3>
            <p className={styles.successBody}>
              Abrimos o WhatsApp com sua mensagem pronta. Se a janela não abriu, verifique o bloqueador de
              pop-ups do navegador.
            </p>
            <Button variant="primary" pill block onClick={onClose}>
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <span className="jf-eyebrow">{SITE.tagline}</span>
            <h3 className={styles.title}>Agende sua avaliação</h3>
            <p className={styles.lede}>Preencha os dados e entramos em contato pelo WhatsApp.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                ref={firstFieldRef}
                name="nome"
                label="Seu nome"
                placeholder="Como podemos te chamar?"
                autoComplete="name"
                required
              />
              <Input
                name="whatsapp"
                label="WhatsApp"
                type="tel"
                placeholder="(11) 90000-0000"
                hint="Retornamos em até 24h"
                autoComplete="tel"
                required
              />
              <Textarea
                name="caso"
                label="Conte um pouco sobre o caso"
                rows={3}
                placeholder="Ex.: dores no joelho, dificuldade para caminhar…"
              />
              <Button variant="primary" size="lg" pill block type="submit">
                Agendar minha avaliação
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
