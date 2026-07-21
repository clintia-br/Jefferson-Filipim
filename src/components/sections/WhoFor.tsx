'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Check } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/site'
import { gsap, EASE, START, reveal, revealHeading, reduceMotion, whenFontsReady } from '@/lib/motion'
import styles from './WhoFor.module.css'

export default function WhoFor() {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const w = SITE.whoFor

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      reveal(q('[data-anim-head]'), { trigger: root.current, y: 16, duration: 0.7 })

      // Pills slide in from the left, matching the direction the checkmarks read.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: q('[data-anim-grid]')[0], start: START, once: true },
      })

      tl.from(q('[data-anim-item]'), {
        autoAlpha: 0,
        x: -24,
        duration: 0.75,
        stagger: 0.09,
        ease: EASE,
      }).from(
        q('[data-anim-check]'),
        { scale: 0, duration: 0.45, stagger: 0.09, ease: 'back.out(2)' },
        0.15,
      )

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          className={styles.head}
          align="center"
          size="lg"
          eyebrow={w.eyebrow}
          title={w.title}
          titleRef={titleRef}
        />

        <div className={styles.grid} data-anim-grid>
          {w.items.map((it) => (
            <div key={it} className={styles.item} data-anim data-anim-item>
              <span className={styles.check} data-anim-check>
                <Check size={18} strokeWidth={2.6} />
              </span>
              <span className={styles.label}>{it}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
