import { Armchair, Footprints, HeartHandshake, PersonStanding, Scale, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Maps the icon names stored as plain strings in `site.ts` to Lucide
 * components. Keeping the copy model free of imports means the client can edit
 * wording without touching component code; this registry is the one place that
 * has to learn about a new icon.
 */
export const ICONS: Record<string, LucideIcon> = {
  Armchair,
  Footprints,
  HeartHandshake,
  PersonStanding,
  Scale,
  ShieldCheck,
}
