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
  const router = useRouter()
  const [status, setStatus] = useState("Finalizing...")
  const [ran, setRan] = useState(false)

  useEffect(() => {
    if (ran) return
    const type = searchParams.get('type')
    
    if (type) {
      setRan(true)
      if (type === 'quick') createQuestion(type)
      else confirmSlot(type)
    }
  }, [searchParams])

  // CASE 1: Updating a Slot (Session)
  const confirmSlot = async (type: string) => {
    const slotId = searchParams.get('slot_id')
    const loc = type === 'in_person' ? 'Nepean Centrepointe Library' : `tutorcodeai.com/room/${slotId}`
    
    await supabase.from('schedule')
      .update({ is_booked: true, booking_type: type, location: loc })
      .eq('id', slotId)
    
    setStatus("Session Confirmed!")
    setTimeout(() => router.push('/dashboard'), 3000)
  }

  // CASE 2: Creating a Question (Async)
  const createQuestion = async (type: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    const fileUrl = decodeURIComponent(searchParams.get('file') || '')
    const desc = decodeURIComponent(searchParams.get('desc') || '')

    await supabase.from('questions').insert({
        student_id: user?.id,
        question_file: fileUrl,
        description: desc,
        status: 'pending'
    })

    setStatus("Question Received! Tutors have been notified.")
    setTimeout(() => router.push('/dashboard'), 3000)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#05051e] text-white">
      <h1 className="text-3xl font-bold text-green-400 mb-4">{status}</h1>
    </div>
  )
}