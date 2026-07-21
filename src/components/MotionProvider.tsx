'use client'

import { useEffect } from 'react'
import { ScrollTrigger, reduceMotion, whenFontsReady } from '@/lib/motion'

/**
 * Hands the page over to GSAP.
 *
 * Adding `.jf-anim-ready` to <html> is what puts `[data-anim]` elements into
 * their hidden pre-animation state. Doing it from JS (rather than in the
 * stylesheet) means a visitor with JS disabled — or one whose bundle fails —
 * still sees the full page instead of a blank one. Visitors who asked for
 * reduced motion skip the class entirely.
 */
export default function MotionProvider() {
  useEffect(() => {
    if (reduceMotion()) return

    const root = document.documentElement
    root.classList.add('jf-anim-ready')

    // Section timelines measure text that has not been laid out in its final
    // font yet; refreshing once the webfonts land keeps every trigger honest.
    let cancelled = false
    whenFontsReady().then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      root.classList.remove('jf-anim-ready')
    }
  }, [])

  return null
}
