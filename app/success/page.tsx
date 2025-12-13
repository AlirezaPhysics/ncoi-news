'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const slotId = searchParams.get('slot_id')
  const router = useRouter()
  const [status, setStatus] = useState("Verifying Payment...")

  useEffect(() => {
    if (slotId) {
      confirmBooking()
    }
  }, [slotId])

  const confirmBooking = async () => {
    // In a real app, verify the stripe_session_id on backend
    // For MVP, we trust the return link
    const { error } = await supabase
      .from('schedule')
      .update({ is_booked: true }) // <--- THE ACTUAL BOOKING HAPPENS HERE
      .eq('id', slotId)

    if (!error) {
      setStatus("Payment Successful! Class Booked.")
      setTimeout(() => router.push('/'), 3000) // Go home after 3 seconds
    } else {
      setStatus("Error booking slot.")
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700">{status}</h1>
      <p>Redirecting you to dashboard...</p>
    </div>
  )
}