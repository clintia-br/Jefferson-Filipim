'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { SITE } from '@/lib/site'
import { ICONS } from '@/lib/icons'
import { gsap, EASE, START, reveal, revealHeading, reduceMotion, whenFontsReady } from '@/lib/motion'
import styles from './Expect.module.css'

export default function Expect() {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const e = SITE.expect

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      reveal(q('[data-anim-eyebrow]'), { trigger: root.current, y: 16, duration: 0.7 })

      // The band's glow expands as the section enters — slow enough to be felt
      // rather than seen.
      gsap.from(q('[data-anim-glow]'), {
        autoAlpha: 0,
        scale: 0.6,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
      })

      // Cards climb out of the dark band. They overlap it by 6rem in layout, so
      // the extra travel here sells the idea that they emerged from behind it.
      gsap.from(q('[data-anim-card]'), {
        autoAlpha: 0,
        y: 56,
        scale: 0.96,
        duration: 0.95,
        stagger: 0.12,
        ease: EASE,
        scrollTrigger: { trigger: q('[data-anim-cards]')[0], start: START, once: true },
      })

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <section id="atendimento" ref={root} className={styles.section}>
      <div className={styles.band}>
        <div className={styles.bandGlow} data-anim-glow aria-hidden="true" />
        <div className={styles.bandInner}>
          <span className={`jf-eyebrow ${styles.bandEyebrow}`} data-anim data-anim-eyebrow>
            {e.eyebrow}
          </span>
          <h2 ref={titleRef} className={styles.bandTitle} data-anim>
            {e.title}
          </h2>
        </div>
      </div>

      <div className={styles.cards} data-anim-cards>
        <div className={styles.grid}>
          {e.cards.map((c) => {
            const Icon = ICONS[c.icon]
            return (
              <article key={c.title} className={styles.card} data-anim data-anim-card>
                <span className={styles.cardIcon}>{Icon && <Icon size={26} strokeWidth={1.9} />}</span>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.desc}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
