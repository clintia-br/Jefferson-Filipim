import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

/**
 * Motion vocabulary for the site.
 *
 * The brand's motion tokens call for "calm, no bounce", so everything here
 * stays inside a narrow band: short distances (16–48px), long-tailed easing,
 * and staggers small enough to read as one gesture rather than a queue of
 * separate events. Nothing overshoots, nothing spins, nothing loops.
 *
 * Every element the scroll timeline touches carries `data-anim` and starts at
 * `visibility: hidden` (see globals.css). GSAP's `autoAlpha` flips visibility
 * back on as opacity rises, so there is no flash of un-animated content — and
 * if JS never runs, the `.jf-anim-ready` class is never set and everything
 * renders plainly visible.
 */

gsap.registerPlugin(ScrollTrigger, SplitText)

/** Long-tailed ease matching the `--ease-out` design token. */
export const EASE = 'power3.out'

/** Where a section starts animating: once its top third has entered the view. */
export const START = 'top 78%'

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

type Target = gsap.TweenTarget

interface RevealOptions {
  /** Element that drives the scroll position. Defaults to the target itself. */
  trigger?: Element | null
  y?: number
  x?: number
  duration?: number
  stagger?: number
  delay?: number
  scale?: number
  start?: string
}

/**
 * The workhorse: fade + short travel, played once when the trigger scrolls in.
 * Passing a NodeList staggers them as a single gesture.
 */
export function reveal(targets: Target, opts: RevealOptions = {}) {
  const {
    trigger,
    y = 28,
    x = 0,
    duration = 0.9,
    stagger = 0.08,
    delay = 0,
    scale,
    start = START,
  } = opts

  return gsap.from(targets, {
    autoAlpha: 0,
    y,
    x,
    ...(scale !== undefined ? { scale } : {}),
    duration,
    delay,
    stagger,
    ease: EASE,
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  })
}

/**
 * Headline reveal: each line is split into words that rise out of their own
 * clipping mask. Reads as the sentence assembling itself rather than a fade.
 *
 * SplitText measures line boxes, so it must run after webfonts settle —
 * `document.fonts.ready` is awaited by the caller via `whenFontsReady`.
 * Returns a cleanup that restores the original DOM.
 */
export function revealHeading(
  el: HTMLElement | null,
  opts: { trigger?: Element | null; delay?: number; start?: string; duration?: number } = {},
) {
  if (!el) return () => {}

  const { trigger = el, delay = 0, start = START, duration = 1 } = opts

  // `autoSplit` re-splits whenever the line boxes change (a resize, a late font
  // swap). Each re-split builds fresh line elements, so the mask styles and the
  // tween have to be created inside `onSplit` — setting them once on the
  // original nodes would silently lose the effect on the first reflow.
  let played = false

  const split = SplitText.create(el, {
    type: 'lines,words',
    linesClass: 'jf-line',
    autoSplit: true,
    onSplit(self) {
      // The mask each word slides out of. Without it the words simply fade;
      // with it the line itself appears to uncover them.
      gsap.set(self.lines, { overflow: 'hidden' })
      gsap.set(el, { autoAlpha: 1 })

      // A resize after the intro has run must not replay it — the visitor is
      // already reading this heading. Jump straight to the resting state.
      if (played) {
        gsap.set(self.words, { yPercent: 0, autoAlpha: 1 })
        return
      }

      // Returned so GSAP reverts this tween as part of the next re-split.
      return gsap.from(self.words, {
        yPercent: 115,
        autoAlpha: 0,
        duration,
        delay,
        stagger: 0.035,
        ease: EASE,
        onComplete: () => {
          played = true
        },
        scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
      })
    },
  })

  return () => split.revert()
}

/**
 * Image reveal: the frame wipes open from the bottom while the photo inside
 * settles back from a slight overscale, so the picture appears to be uncovered
 * rather than to pop in.
 */
export function revealImage(
  el: HTMLElement | null,
  opts: { trigger?: Element | null; inner?: HTMLElement | null; start?: string } = {},
) {
  if (!el) return
  const { trigger = el, inner, start = START } = opts

  const tl = gsap.timeline({
    scrollTrigger: { trigger, start, once: true },
  })

  tl.fromTo(
    el,
    { clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 1 },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power4.out' },
  )

  if (inner) {
    tl.from(inner, { scale: 1.18, duration: 1.4, ease: 'power3.out' }, 0)
  }

  return tl
}

/**
 * Ties an element's vertical position to scroll progress. Distance stays small
 * — this should register as depth, not as the element drifting off its layout.
 */
export function parallax(el: HTMLElement | null, distance = 60, trigger?: Element | null) {
  if (!el) return
  return gsap.fromTo(
    el,
    { y: -distance / 2 },
    {
      y: distance / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    },
  )
}

/**
 * Resolves once webfonts have settled, so SplitText measures real line boxes.
 *
 * Headings sit hidden until this resolves, so it must never hang: a slow or
 * blocked font request would otherwise leave the page's copy invisible. The
 * timeout is the safety net — we would rather split against fallback metrics
 * than show nothing.
 */
export function whenFontsReady(timeoutMs = 1500): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve()
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
  if (!fonts) return Promise.resolve()

  return Promise.race([
    fonts.ready.then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ])
}

export { gsap, ScrollTrigger, SplitText }
