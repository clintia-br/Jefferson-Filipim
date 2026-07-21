'use client'

import { useId, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/site'
import { gsap, EASE, START, reveal, revealHeading, reduceMotion, whenFontsReady, ScrollTrigger } from '@/lib/motion'
import styles from './Faq.module.css'

export default function Faq() {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const panels = useRef<(HTMLDivElement | null)[]>([])
  const [open, setOpen] = useState(0)
  const baseId = useId()
  const f = SITE.faq

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: root.current })
      })

      reveal(q('[data-anim-head]'), { trigger: root.current, y: 16, duration: 0.7 })
      reveal(q('[data-anim-item]'), {
        trigger: q('[data-anim-list]')[0],
        y: 24,
        duration: 0.75,
        stagger: 0.08,
      })

      return () => cleanupHeading()
    },
    { scope: root },
  )

  // Accordion open/close. Animating to "auto" lets the answer keep its natural
  // height afterwards, so a resize or font swap can't leave it clipped.
  useGSAP(
    () => {
      panels.current.forEach((panel, i) => {
        if (!panel) return
        const isOpen = i === open

        if (reduceMotion()) {
          gsap.set(panel, { height: isOpen ? 'auto' : 0 })
          return
        }

        gsap.to(panel, {
          height: isOpen ? 'auto' : 0,
          duration: 0.45,
          ease: isOpen ? EASE : 'power2.in',
          overwrite: true,
          // Opening an answer changes the page height, which every trigger
          // below this section is measured against.
          onComplete: () => ScrollTrigger.refresh(),
        })
      })
    },
    { dependencies: [open], scope: root },
  )

  return (
    <section id="faq" ref={root} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          className={styles.head}
          align="center"
          size="lg"
          eyebrow={f.eyebrow}
          title={f.title}
          titleRef={titleRef}
        />

        <div className={styles.list} data-anim-list>
          {f.items.map((it, i) => {
            const isOpen = open === i
            const panelId = `${baseId}-panel-${i}`
            const triggerId = `${baseId}-trigger-${i}`

            return (
              <div key={it.q} className={styles.item} data-open={isOpen} data-anim data-anim-item>
                <h3>
                  <button
                    id={triggerId}
                    className={styles.trigger}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    {it.q}
                    <span
                      className={styles.chevron}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform var(--dur) var(--ease)',
                      }}
                    >
                      <ChevronDown size={20} />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={styles.panel}
                  ref={(el) => {
                    panels.current[i] = el
                  }}
                >
                  <p className={styles.answer}>{it.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
