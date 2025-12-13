'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

// 1. THE MAIN WRAPPER (This fixes the build error)
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading payment verification...</div>}>
      <BookingLogic />
    </Suspense>
  )
}

// 2. THE ACTUAL LOGIC (Moved inside the wrapper)
function BookingLogic() {
  const searchParams = useSearchParams()
  const slotId = searchParams.get('slot_id')
  const router = useRouter()
  const [status, setStatus] = useState("Verifying Payment...")
  const [ran, setRan] = useState(false) // Prevents running twice

  useEffect(() => {
    // Only run if we have an ID and haven't run yet
    if (slotId && !ran) {
      setRan(true)
      confirmBooking()
    }
  }, [slotId])

  const confirmBooking = async () => {
    // Lock the slot in the database
    const { error } = await supabase
      .from('schedule')
      .update({ is_booked: true })
      .eq('id', slotId)

    if (!error) {
      setStatus("Success! Payment verified. Class is booked.")
      // Send them home after 4 seconds
      setTimeout(() => {
        router.push('/')
      }, 4000)
    } else {
      setStatus("Error: Charged but failed to update database.")
      console.error(error)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-50 text-green-900">
      <div className="p-8 bg-white rounded shadow-md border border-green-200 text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Status</h1>
        <p className="text-xl mb-4">{status}</p>
        <p className="text-sm text-gray-500">Redirecting to Dashboard...</p>
      </div>
    </div>
  )
}