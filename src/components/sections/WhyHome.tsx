'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { SITE } from '@/lib/site'
import { gsap, START, reveal, revealHeading, reduceMotion, whenFontsReady } from '@/lib/motion'
import styles from './WhyHome.module.css'

export default function WhyHome() {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const w = SITE.whyHome

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      reveal(q('[data-anim-eyebrow]'), { trigger: root.current, y: 16, duration: 0.7 })
      reveal(q('[data-anim-body]'), { trigger: root.current, y: 20, duration: 0.85, delay: 0.25 })

      gsap.from(q('[data-anim-rule]'), {
        scaleX: 0,
        duration: 0.9,
        delay: 0.45,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: root.current, start: START, once: true },
      })

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.section}>
      <div className={styles.inner}>
        <span className="jf-eyebrow" data-anim data-anim-eyebrow>
          {w.eyebrow}
        </span>
        <h2 ref={titleRef} className={styles.title} data-anim>
          {w.title}
        </h2>
        <p className={styles.body} data-anim data-anim-body>
          {w.body}
        </p>
        <div className={styles.rule} data-anim-rule aria-hidden="true" />
      </div>
    </section>
  )
}
