'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'
import { gsap, ScrollTrigger, reduceMotion } from '@/lib/motion'
import styles from './Header.module.css'

export default function Header({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string>('#hero')

  const rootRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // The drawer is portalled to <body>. The header carries `backdrop-filter`,
  // which makes it the containing block for any `position: fixed` descendant —
  // a drawer left inside it would size against the 68px header, not the
  // viewport. `mounted` gates the portal so SSR and first paint agree.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useGSAP(
    () => {
      // Reading progress: one scrub tween across the whole document.
      if (progressRef.current && !reduceMotion()) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        })
      }

      // Compact state once the hero starts leaving.
      ScrollTrigger.create({
        start: 'top -24',
        end: 99999,
        onUpdate: (self) => setScrolled(self.progress > 0 || self.scroll() > 24),
        onToggle: (self) => setScrolled(self.isActive),
      })

      // Nav highlighting — each linked section reports when it owns the viewport.
      SITE.nav.forEach(({ href }) => {
        const section = document.querySelector(href)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActive(href),
        })
      })
    },
    { scope: rootRef },
  )

  // Drawer open/close, animated rather than snapped.
  useGSAP(
    () => {
      if (!drawerRef.current || !panelRef.current || !scrimRef.current) return

      if (menuOpen) {
        gsap.set(drawerRef.current, { display: 'block' })
        gsap
          .timeline()
          .to(scrimRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
          .to(panelRef.current, { x: 0, duration: 0.45, ease: 'power3.out' }, 0.05)
      } else {
        gsap
          .timeline({ onComplete: () => gsap.set(drawerRef.current, { display: 'none' }) })
          .to(panelRef.current, { x: '100%', duration: 0.35, ease: 'power3.in' })
          .to(scrimRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' }, 0.05)
      }
    },
    { dependencies: [menuOpen], scope: rootRef },
  )

  // Close on Escape, and keep the page from scrolling behind the drawer.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header ref={rootRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} aria-label={SITE.brand}>
          <Image src="/images/logo.png" alt={SITE.brand} width={515} height={235} priority />
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          {SITE.nav.map((n) => (
            <a key={n.href} href={n.href} className={styles.navLink} data-active={active === n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className={styles.desktopCta}>
          <Button variant="primary" size="sm" pill onClick={onBook}>
            Agende agora
          </Button>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <Menu size={22} strokeWidth={2} />
        </button>
      </div>

      <div ref={progressRef} className={styles.progress} aria-hidden="true" />

      {mounted &&
        createPortal(
          <div ref={drawerRef} className={styles.drawer} role="dialog" aria-modal="true" aria-label="Menu">
            <div ref={scrimRef} className={styles.scrim} onClick={() => setMenuOpen(false)} />
            <div ref={panelRef} className={styles.panel}>
              <div className={styles.panelHead}>
                <button className={styles.close} onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
                  <X size={20} />
                </button>
              </div>
              {SITE.nav.map((n) => (
                <a key={n.href} href={n.href} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
                  {n.label}
                </a>
              ))}
              <div className={styles.drawerCta}>
                <Button
                  variant="primary"
                  size="lg"
                  pill
                  block
                  onClick={() => {
                    setMenuOpen(false)
                    onBook()
                  }}
                >
                  Agende agora
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  )
}
