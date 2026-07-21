'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'
import { gsap, START, reveal, revealHeading, reduceMotion, whenFontsReady } from '@/lib/motion'
import styles from './FinalCta.module.css'

export default function FinalCta({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const c = SITE.finalCta

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      reveal(q('[data-anim-copy]'), { trigger: root.current, y: 22, duration: 0.85, delay: 0.25, stagger: 0.12 })

      gsap.from(q('[data-anim-wash]'), {
        autoAlpha: 0,
        scale: 0.7,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
      })

      gsap.to(q('[data-anim-wash]'), {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })

      // A single unhurried pulse on the closing button, once, when the section
      // settles — the last nudge before the visitor decides.
      gsap.fromTo(
        q('[data-anim-cta] button'),
        { boxShadow: '0 12px 28px rgba(15,115,229,0)' },
        {
          boxShadow: '0 0 0 12px rgba(255,255,255,0.10)',
          duration: 0.9,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
          scrollTrigger: { trigger: root.current, start: START, once: true },
          delay: 0.9,
        },
      )

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <>
      <section id="contato" ref={root} className={styles.section}>
        <div className={styles.wash} data-anim-wash aria-hidden="true" />

        <div className={styles.inner}>
          <h2 ref={titleRef} className={styles.title} data-anim>
            {c.title}
          </h2>

          <p className={styles.subtitle} data-anim data-anim-copy>
            {c.subtitle}
          </p>

          <div data-anim data-anim-copy data-anim-cta>
            <Button variant="dark" size="lg" pill onClick={onBook}>
              {c.cta}
            </Button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>{SITE.footer}</p>
      </footer>
    </>
  )
}
