'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Finalizing...</div>}>
      <BookingLogic />
    </Suspense>
  )
}

function BookingLogic() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState("Finalizing Booking...")
  const [ran, setRan] = useState(false)

  useEffect(() => {
    if (!ran && searchParams.get('slot_id')) {
      setRan(true)
      finishBooking()
    }
  }, [searchParams])

  const finishBooking = async () => {
    const slotId = searchParams.get('slot_id')
    const bookingType = searchParams.get('type')
    const rawData = searchParams.get('data') // The encoded JSON
    
    let locationInfo = `tutorcodeai.com/room/${slotId}`
    if (bookingType === 'in_person') locationInfo = 'Nepean Centrepointe Library (Baseline Station)'

    // Parse the student details back into an object
    let studentDetails = {}
    try {
        if (rawData) studentDetails = JSON.parse(decodeURIComponent(rawData))
    } catch (e) { console.error("JSON Error", e) }

    const { error } = await supabase
      .from('schedule')
      .update({ 
          is_booked: true,
          booking_type: bookingType,
          location: locationInfo,
          student_details: studentDetails // <--- Saving the questionnaire!
      })
      .eq('id', slotId)

    if (!error) {
      setStatus("Booking Confirmed! Details saved.")
      setTimeout(() => router.push('/dashboard'), 3000)
    } else {
      setStatus("Error saving booking details.")
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#05051e] text-white">
      <h1 className="text-3xl font-bold text-green-400 mb-4">{status}</h1>
    </div>
  )
}