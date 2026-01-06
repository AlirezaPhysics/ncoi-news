'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingLogic />
    </Suspense>
  )
}

function BookingLogic() {
  const searchParams = useSearchParams()
  const slotId = searchParams.get('slot_id')
  const bookingType = searchParams.get('type') // 'online' or 'in_person'
  const router = useRouter()
  const [status, setStatus] = useState("Verifying Payment...")
  const [ran, setRan] = useState(false)

  useEffect(() => {
    if (slotId && !ran) {
      setRan(true)
      confirmBooking()
    }
  }, [slotId])

  const confirmBooking = async () => {
    
    // If in-person, set the physical location. If online, set video link.
    const locationInfo = bookingType === 'in_person' 
        ? 'Nepean Centrepointe Library (Baseline Station)' 
        : `tutorcodeai.com/room/${slotId}`

    const { error } = await supabase
      .from('schedule')
      .update({ 
          is_booked: true,
          booking_type: bookingType,
          location: locationInfo
      })
      .eq('id', slotId)

    if (!error) {
      setStatus(`Success! Your ${bookingType === 'in_person' ? 'In-Person' : 'Online'} session is booked.`)
      setTimeout(() => router.push('/dashboard'), 4000)
    } else {
      setStatus("Error updating schedule.")
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#05051e] text-white">
      <h1 className="text-3xl font-bold mb-4 text-green-400">Payment Confirmed!</h1>
      <p className="text-lg">{status}</p>
    </div>
  )
}