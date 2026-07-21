'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { ChevronRight } from 'lucide-react'
import { SITE } from '@/lib/site'
import { gsap, EASE, START, reveal, revealHeading, revealImage, reduceMotion, whenFontsReady } from '@/lib/motion'
import styles from './Decline.module.css'

export default function Decline() {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const figureRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const d = SITE.decline

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      reveal(q('[data-anim-eyebrow]'), { trigger: root.current, y: 16, duration: 0.7 })

      // The list is the narrative spine of this section: each step arrives from
      // the left in sequence, mirroring the slow accumulation it describes.
      reveal(q('[data-anim-step]'), {
        trigger: q('[data-anim-steps]')[0],
        x: -20,
        y: 0,
        duration: 0.7,
        stagger: 0.07,
      })

      reveal(q('[data-anim-lead]'), { trigger: q('[data-anim-lead]')[0], y: 14, duration: 0.6 })

      // Quotes land slightly scaled-up — the only place in the page that pops,
      // and it stays under 6% so it reads as emphasis, not novelty.
      gsap.from(q('[data-anim-quote]'), {
        autoAlpha: 0,
        scale: 0.94,
        y: 10,
        duration: 0.6,
        stagger: 0.09,
        ease: EASE,
        scrollTrigger: { trigger: q('[data-anim-quotes]')[0], start: START, once: true },
      })

      reveal(q('[data-anim-close]'), { trigger: q('[data-anim-close]')[0], y: 20, duration: 0.8 })

      revealImage(figureRef.current, { inner: photoRef.current })

      // Slow counter-drift keeps the tall photo alive next to the long list.
      gsap.fromTo(
        photoRef.current,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: figureRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.section}>
      <div className={styles.grid}>
        <div>
          <span className="jf-eyebrow" data-anim data-anim-eyebrow>
            {d.eyebrow}
          </span>

          <h2 ref={titleRef} className={styles.title} data-anim>
            {d.title}
          </h2>

          <ul className={styles.steps} data-anim-steps>
            {d.steps.map((s) => (
              <li key={s} className={styles.step} data-anim data-anim-step>
                <span className={styles.stepIcon}>
                  <ChevronRight size={18} />
                </span>
                {s}
              </li>
            ))}
          </ul>

          <p className={styles.quotesLead} data-anim data-anim-lead>
            {d.quotesLead}
          </p>

          <div className={styles.quotes} data-anim-quotes>
            {d.quotes.map((quote) => (
              <span key={quote} className={styles.quote} data-anim data-anim-quote>
                {quote}
              </span>
            ))}
          </div>

          <p className={styles.close} data-anim data-anim-close>
            {d.close}
          </p>
        </div>

        <div ref={figureRef} className={styles.figure}>
          <Image
            ref={photoRef}
            src="/images/decline.jpg"
            alt={d.photo}
            width={1600}
            height={1066}
            sizes="(max-width: 900px) 90vw, 45vw"
          />
        </div>
      </div>
    </section>
  )
}
