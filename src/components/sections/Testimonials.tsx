'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Star } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/site'
import { gsap, EASE, START, reveal, revealHeading, reduceMotion, whenFontsReady } from '@/lib/motion'
import styles from './Testimonials.module.css'

const TONES = ['var(--teal-500)', 'var(--brand-primary)', 'var(--blue-700)', 'var(--teal-700)']

export default function Testimonials() {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const t = SITE.testimonials

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      reveal(q('[data-anim-head]'), { trigger: root.current, y: 16, duration: 0.7 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: q('[data-anim-grid]')[0], start: START, once: true },
      })

      tl.from(q('[data-anim-card]'), {
        autoAlpha: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.1,
        ease: EASE,
      })
        // Stars fill in left-to-right across all four cards. The stagger is tight
        // enough (30ms) to read as a single sweep rather than twenty events.
        .from(
          q('[data-anim-star]'),
          { autoAlpha: 0, scale: 0.4, duration: 0.4, stagger: 0.03, ease: 'back.out(2)' },
          0.3,
        )
        .from(q('[data-anim-note]'), { autoAlpha: 0, y: 12, duration: 0.6, ease: EASE }, '>-0.2')

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <section id="depoimentos" ref={root} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          className={styles.head}
          align="center"
          size="lg"
          eyebrow={t.eyebrow}
          title={t.title}
          titleRef={titleRef}
        />

        <div className={styles.grid} data-anim-grid>
          {t.items.map((it, i) => (
            <figure key={it.quote} className={styles.card} data-anim data-anim-card>
              <div className={styles.cardTop}>
                <span className={styles.initial} style={{ background: TONES[i % TONES.length] }} aria-hidden="true">
                  {it.who.charAt(0)}
                </span>
                <div className={styles.stars} aria-label="5 de 5 estrelas">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <span key={k} data-anim-star>
                      <Star size={16} strokeWidth={2} fill="currentColor" />
                    </span>
                  ))}
                </div>
              </div>
              <blockquote className={styles.quote}>&ldquo;{it.quote}&rdquo;</blockquote>
              <figcaption className={styles.who}>{it.who}</figcaption>
            </figure>
          ))}
        </div>

        <p className={styles.note} data-anim-note>
          {t.note}
        </p>
      </div>
    </section>
  )
}
