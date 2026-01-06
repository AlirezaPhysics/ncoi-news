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
  
  // NEW: State for Recurrence
  const [newTime, setNewTime] = useState('')
  const [recurrence, setRecurrence] = useState('one-time') // 'one-time', 'weekly', 'biweekly', 'monthly'

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      
      setUser(user)
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      setRole(profile?.role || 'student')
      fetchSchedule()
    }
    checkUser()
  }, [])

  const fetchSchedule = async () => {
    // Only fetch slots in the future to keep the list clean
    const now = new Date().toISOString()
    const { data } = await supabase
        .from('schedule')
        .select('*')
        .gt('start_time', now)
        .order('start_time', { ascending: true })
    if (data) setSlots(data)
    setLoading(false)
  }

  // UPDATED: Logic to create multiple slots at once
  const handleAddSlot = async () => {
    if (!newTime) return
    setLoading(true)

    const baseStart = new Date(newTime)
    let slotsToCreate = []
    
    // How many times to repeat? 
    // Weekly for 12 weeks (3 months)
    let loops = 1
    let intervalDays = 0

    if (recurrence === 'weekly') { loops = 12; intervalDays = 7 }
    if (recurrence === 'biweekly') { loops = 6; intervalDays = 14 }
    if (recurrence === 'monthly') { loops = 3; intervalDays = 30 }

    // Generate the Dates
    for (let i = 0; i < loops; i++) {
        const start = new Date(baseStart)
        start.setDate(baseStart.getDate() + (i * intervalDays)) // Add days
        
        const end = new Date(start.getTime() + 60 * 60 * 1000) // +1 Hour

        slotsToCreate.push({
            tutor_id: user.id,
            start_time: start.toISOString(),
            end_time: end.toISOString(),
            is_booked: false
        })
    }

    const { error } = await supabase.from('schedule').insert(slotsToCreate)
    
    if (error) {
        alert('Error: ' + error.message)
    } else {
        alert(recurrence === 'one-time' ? 'Slot Added!' : `Created ${loops} recurring slots!`)
        fetchSchedule()
    }
    setLoading(false)
  }

  const handleBook = async (slotId: number) => {
    const confirm = window.confirm("Proceed to payment ($30.00)?")
    if (!confirm) return

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId }),
      })
      const data = await response.json()
      if (data.url) window.location.href = data.url
      else alert("Payment Error")
    } catch (err) {
      alert("Payment failed to initialize")
    }
  }

  if (loading) return <div className="p-20 text-center text-white bg-[#05051e] min-h-screen">Loading Marketplace...</div>

  return (
    <div className="min-h-screen bg-[#05051e] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {role === 'tutor' ? 'Tutor Control Panel' : 'Student Marketplace'}
          </h1>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} className="text-red-400 font-bold hover:underline border border-red-900/50 px-4 py-2 rounded">
            Sign Out
          </button>
        </div>

        {/* TUTOR CONTROLS */}
        {role === 'tutor' && (
          <div className="bg-[#11113a] p-8 rounded-3xl mb-12 shadow-lg border border-indigo-500/30">
            <h2 className="text-2xl font-bold mb-6 text-white">📅 Set Availability</h2>
            <div className="grid md:grid-cols-4 gap-4 items-end">
              
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Start Time</label>
                <input type="datetime-local" onChange={(e) => setNewTime(e.target.value)} className="w-full bg-black/40 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Recurrence</label>
                <select onChange={(e) => setRecurrence(e.target.value)} className="w-full bg-black/40 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none">
                    <option value="one-time">One Time Only</option>
                    <option value="weekly">Repeat Weekly (3 Mo)</option>
                    <option value="biweekly">Repeat Bi-Weekly (3 Mo)</option>
                    <option value="monthly">Repeat Monthly (3 Mo)</option>
                </select>
              </div>

              <button onClick={handleAddSlot} className="bg-blue-600 text-white px-6 py-3.5 rounded-lg font-bold hover:bg-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                Create Slots
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-4">* Mandate: 6 hours/week availability required.</p>
          </div>
        )}

        {/* MARKETPLACE LIST */}
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="bg-blue-500 w-2 h-8 rounded-full"></span> 
            Available Sessions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.length === 0 && <p className="text-slate-500 italic">No upcoming sessions found.</p>}

          {slots.map((slot) => {
            const date = new Date(slot.start_time)
            const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
            const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

            return (
                <div key={slot.id} className={`p-6 rounded-2xl border flex flex-col gap-4 relative overflow-hidden transition group ${slot.is_booked ? 'bg-red-900/10 border-red-500/30' : 'bg-[#1a1a45] border-blue-500/20 hover:border-blue-400'}`}>
                {/* Visual Status Indicator */}
                <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold rounded-bl-xl ${slot.is_booked ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                    {slot.is_booked ? 'BOOKED' : 'OPEN'}
                </div>

                <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">{dateStr}</p>
                    <p className="text-3xl font-extrabold text-white mt-1">{timeStr}</p>
                    <p className="text-slate-500 text-sm mt-1">1 Hour Session</p>
                </div>

                <div className="mt-auto">
                    {/* BUTTONS LOGIC */}
                    {role === 'student' && !slot.is_booked && (
                        <button onClick={() => handleBook(slot.id)} className="w-full bg-[#fbbf24] text-black py-3 rounded-lg font-bold hover:bg-[#f59e0b] transition">
                        Book Session ($30)
                        </button>
                    )}
                    
                    {slot.is_booked && (
                    <button 
                        onClick={() => router.push(`/room/${slot.id}`)} 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-500 transition shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-pulse"
                    >
                        Join Video Room
                    </button>
                    )}
                </div>
                </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}