'use client'

import { useCallback, useState } from 'react'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import Decline from '@/components/sections/Decline'
import Story from '@/components/sections/Story'
import Plan from '@/components/sections/Plan'
import Expect from '@/components/sections/Expect'
import WhyHome from '@/components/sections/WhyHome'
import Testimonials from '@/components/sections/Testimonials'
import WhoFor from '@/components/sections/WhoFor'
import Faq from '@/components/sections/Faq'
import FinalCta from '@/components/sections/FinalCta'
import BookingModal from '@/components/BookingModal'

export default function Page() {
  const [booking, setBooking] = useState(false)

  const openBooking = useCallback(() => setBooking(true), [])
  const closeBooking = useCallback(() => setBooking(false), [])

  return (
    <>
      <Header onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <Decline />
        <Story onBook={openBooking} />
        <Plan />
        <Expect />
        <WhyHome />
        <Testimonials />
        <WhoFor />
        <Faq />
        <FinalCta onBook={openBooking} />
      </main>
      <BookingModal open={booking} onClose={closeBooking} />
    </>
  )
}
