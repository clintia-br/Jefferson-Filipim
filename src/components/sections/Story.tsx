'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'
import { gsap, EASE, START, reveal, revealHeading, reduceMotion, whenFontsReady } from '@/lib/motion'
import styles from './Story.module.css'

export default function Story({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const s = SITE.story
  const p = SITE.philosophy

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      // Portrait settles in from slightly small — the teal ring scales with it
      // so the two never separate.
      gsap.from(q('[data-anim-avatar]'), {
        autoAlpha: 0,
        scale: 0.82,
        duration: 1,
        ease: EASE,
        scrollTrigger: { trigger: root.current, start: START, once: true },
      })

      reveal(q('[data-anim-identity]'), { trigger: root.current, y: 18, duration: 0.8, delay: 0.15 })
      reveal(q('[data-anim-para]'), { trigger: q('[data-anim-para]')[0], y: 20, duration: 0.8, stagger: 0.09 })

      // The question card wipes open horizontally, then its text fades up —
      // reading order is preserved rather than everything arriving at once.
      gsap
        .timeline({ scrollTrigger: { trigger: q('[data-anim-question]')[0], start: START, once: true } })
        .fromTo(
          q('[data-anim-question]'),
          { clipPath: 'inset(0% 100% 0% 0%)', autoAlpha: 1 },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: 'power4.out' },
        )
        .from(q('[data-anim-question-text]'), { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.1, ease: EASE }, 0.35)

      reveal(q('[data-anim-cta]'), { trigger: q('[data-anim-cta]')[0], y: 18, scale: 0.96, duration: 0.7 })

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <section id="sobre" ref={root} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <div className={styles.avatarRing} data-anim-avatar>
            <div className={styles.avatar}>
              <Image src="/images/about.png" alt={SITE.brand} width={512} height={512} sizes="132px" />
            </div>
          </div>

          <div data-anim data-anim-identity>
            <h3 className={styles.name}>{SITE.brand}</h3>
            <p className={styles.role}>{s.role}</p>
            <div className={styles.badges}>
              <Badge tone="teal" variant="soft">
                Geriatria
              </Badge>
              <Badge tone="neutral" variant="outline">
                {s.crefito}
              </Badge>
            </div>
          </div>
        </div>

        <span className="jf-eyebrow" data-anim data-anim-para>
          {s.eyebrow}
        </span>

        <h2 ref={titleRef} className={styles.title} data-anim>
          {s.title}
        </h2>

        {[...s.body, ...p.body].map((t) => (
          <p key={t} className={styles.body} data-anim data-anim-para>
            {t}
          </p>
        ))}

        <div className={styles.question} data-anim-question>
          <p className={styles.questionText} data-anim-question-text>
            &ldquo;{p.question}&rdquo;
          </p>
          <p className={styles.questionNote} data-anim-question-text>
            {p.questionNote}
          </p>
        </div>

        <div data-anim data-anim-cta>
          <Button variant="primary" size="lg" pill onClick={onBook}>
            {SITE.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
