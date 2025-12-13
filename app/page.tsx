'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState('student')
  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newTime, setNewTime] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login') 
        return
      }
      setUser(user)
      setRole(user.user_metadata?.role || 'student')
      fetchSchedule()
    }
    checkUser()
  }, [])

  const fetchSchedule = async () => {
    const { data } = await supabase.from('schedule').select('*').order('start_time', { ascending: true })
    if (data) setSlots(data)
    setLoading(false)
  }

  const handleAddSlot = async () => {
    if (!newTime) return
    const start = new Date(newTime)
    const end = new Date(start.getTime() + 60 * 60 * 1000)

    const { error } = await supabase.from('schedule').insert({
      tutor_id: user.id,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    })
    if (!error) {
      alert('Slot added!')
      fetchSchedule()
    }
  }

  // NEW: Handle Payment instead of instant booking
  const handleBook = async (slotId: number) => {
    // 1. Call our API to get a payment link
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotId, tutorName: 'Expert Tutor' }),
    })
    
    const data = await response.json()

    if (data.url) {
      // 2. Redirect the student to Stripe
      window.location.href = data.url
    } else {
      alert("Payment Error")
    }
  }

  if (loading) return <div className="p-10 text-center text-white">Loading Marketplace...</div>

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-blue-900">
            {role === 'tutor' ? 'Tutor Dashboard' : 'Student Dashboard'}
          </h1>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} className="text-red-500 font-bold hover:underline">
            Sign Out
          </button>
        </div>

        {role === 'tutor' && (
          <div className="bg-white p-6 rounded-lg mb-8 shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Add Availability</h2>
            <div className="flex gap-4">
              <input type="datetime-local" onChange={(e) => setNewTime(e.target.value)} className="border p-2 rounded flex-1" />
              <button onClick={handleAddSlot} className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">Add Slot</button>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Available Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slots.map((slot) => (
            <div key={slot.id} className={`p-4 border rounded shadow flex justify-between items-center ${slot.is_booked ? 'bg-gray-200' : 'bg-white'}`}>
              <div>
                <p className="font-bold">{new Date(slot.start_time).toLocaleString()}</p>
                {slot.is_booked ? <span className="text-red-600 font-bold">BOOKED</span> : <span className="text-green-600 font-bold">OPEN</span>}
              </div>
              {role === 'student' && !slot.is_booked && (
                <button onClick={() => handleBook(slot.id)} className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700">Book</button>
              )}
              {/* JOIN BUTTON: If slot is booked (either by me or I am the tutor) */}
                {/* Note: In a real app, strict checks if I OWN this slot are needed, for MVP we show it if booked */}
                {slot.is_booked && (
                  <button 
                    onClick={() => router.push(`/room/${slot.id}`)} 
                    className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 ml-2"
                  >
                    Join Class (Video)
                  </button>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}