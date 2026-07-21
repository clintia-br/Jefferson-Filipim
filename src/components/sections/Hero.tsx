'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { ArrowRight, HeartHandshake, House, ShieldCheck } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'
import { gsap, EASE, reduceMotion, revealHeading, whenFontsReady } from '@/lib/motion'
import styles from './Hero.module.css'

const TRUST = [
  { icon: House, label: 'Atendimento 100% domiciliar' },
  { icon: ShieldCheck, label: 'CREFITO-3: 371949-F' },
  { icon: HeartHandshake, label: 'Especialista em Geriatria' },
]

export default function Hero({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (reduceMotion()) return

      const q = gsap.utils.selector(root)

      // The hero is above the fold, so it plays on load rather than on scroll.
      // Fonts have to settle first or SplitText measures the fallback metrics.
      let cleanupHeading = () => {}

      whenFontsReady().then(() => {
        cleanupHeading = revealHeading(titleRef.current, { trigger: null, delay: 0.15 })

        const tl = gsap.timeline({ defaults: { ease: EASE } })

        tl.from(q('[data-hero-copy]'), { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1 }, 0.45)
          // The slab swings the last few degrees into place as the frame opens,
          // so the two read as one object assembling instead of two entrances.
          .from(q('[data-hero-slab]'), { autoAlpha: 0, rotate: -9, scale: 0.9, duration: 1.1 }, 0.25)
          .fromTo(
            q('[data-hero-frame]'),
            { clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 1 },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.out' },
            0.3,
          )
          .from(q('[data-hero-photo]'), { scale: 1.2, duration: 1.5, ease: 'power3.out' }, 0.3)
          .from(q('[data-hero-chip]'), { autoAlpha: 0, y: 18, scale: 0.92, duration: 0.7 }, 1.05)
          .from(q('[data-hero-glow]'), { autoAlpha: 0, scale: 0.7, duration: 1.6, stagger: 0.15 }, 0)
      })

      // Depth on scroll: the portrait lags the page, the slab leads it, and the
      // glows drift furthest — a small parallax spread, no more than ~70px.
      gsap.to(q('[data-hero-figure]'), {
        y: 70,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.to(q('[data-hero-slab]'), {
        y: -30,
        rotate: -1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1.4 },
      })
      gsap.to(q('[data-hero-glow]'), {
        y: 110,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 2 },
      })

      return () => cleanupHeading()
    },
    { scope: root },
  )

  return (
    <section id="hero" ref={root} className={styles.hero}>
      <div className={`${styles.glow} ${styles.glowTeal}`} data-hero-glow aria-hidden="true" />
      <div className={`${styles.glow} ${styles.glowBlue}`} data-hero-glow aria-hidden="true" />

      <div className={styles.grid}>
        <div>
          <h1 ref={titleRef} className={styles.title} data-anim>
            {SITE.hero.title}
          </h1>

          <p className={styles.subtitle} data-hero-copy>
            {SITE.hero.subtitle}
          </p>

          <div data-hero-copy>
            <Button
              variant="primary"
              size="lg"
              pill
              onClick={onBook}
              iconRight={<ArrowRight size={20} />}
            >
              {SITE.cta}
            </Button>
          </div>

          <ul className={styles.trust} data-hero-copy>
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className={styles.trustItem}>
                <Icon size={18} strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.figure} data-hero-figure>
          <div className={styles.slab} data-hero-slab aria-hidden="true" />

          <div className={styles.frame} data-hero-frame>
            <Image
              src="/images/hero.png"
              alt={SITE.hero.photo}
              width={780}
              height={738}
              priority
              sizes="(max-width: 900px) 90vw, 40vw"
              data-hero-photo
            />
          </div>

          <div className={styles.chip} data-hero-chip>
            <span className={styles.chipIcon}>
              <HeartHandshake size={20} strokeWidth={2} />
            </span>
            <span className={styles.chipText}>
              <span className={styles.chipTitle}>{SITE.brand}</span>
              <span className={styles.chipSub}>{SITE.tagline}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
