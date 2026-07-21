'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { SITE } from '@/lib/site'
import { ICONS } from '@/lib/icons'
import { gsap, EASE, START, reveal, revealHeading, reduceMotion, whenFontsReady } from '@/lib/motion'
import styles from './Plan.module.css'

export default function Plan() {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const p = SITE.plan

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      reveal(q('[data-anim-eyebrow]'), { trigger: root.current, y: 16, duration: 0.7 })
      reveal(q('[data-anim-body]'), { trigger: root.current, y: 20, duration: 0.8, delay: 0.2 })

      // Cards rise in a 2×2 wave, then each icon scales the last few percent —
      // a beat behind its card, so the eye lands on the card first.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: q('[data-anim-grid]')[0], start: START, once: true },
      })

      tl.from(q('[data-anim-goal]'), {
        autoAlpha: 0,
        y: 34,
        scale: 0.97,
        duration: 0.8,
        stagger: 0.1,
        ease: EASE,
      }).from(
        q('[data-anim-goal-icon]'),
        { scale: 0.5, autoAlpha: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)' },
        0.2,
      )

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className="jf-eyebrow" data-anim data-anim-eyebrow>
            {p.eyebrow}
          </span>
          <h2 ref={titleRef} className={styles.title} data-anim>
            {p.title}
          </h2>
          <p className={styles.body} data-anim data-anim-body>
            {p.body}
          </p>
        </div>

        <div className={styles.grid} data-anim-grid>
          {p.goals.map((g) => {
            const Icon = ICONS[g.icon]
            return (
              <div key={g.text} className={styles.goal} data-anim data-anim-goal>
                <span className={styles.goalIcon} data-anim-goal-icon>
                  {Icon && <Icon size={24} strokeWidth={2} />}
                </span>
                <span className={styles.goalText}>{g.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
