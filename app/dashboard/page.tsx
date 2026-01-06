'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

// SAFE LOCATIONS WITHIN 10KM OF BASELINE STATION
const OTTAWA_LOCATIONS = [
    "Nepean Centrepointe Library (101 Centrepointe Dr)",
    "Woodroffe Campus Library (Algonquin)",
    "Centennial Branch Library"
]

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState('student')
  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // TUTOR: Add Slot State
  const [newTime, setNewTime] = useState('')
  const [recurrence, setRecurrence] = useState('one-time')
  const [allowInPerson, setAllowInPerson] = useState(false)

  // STUDENT: Booking State (Track which slot uses which mode)
  const [selectedModes, setSelectedModes] = useState<Record<number, string>>({}) 
  const [parentConsent, setParentConsent] = useState(false)

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
    const now = new Date().toISOString()
    const { data } = await supabase
        .from('schedule')
        .select('*')
        .gt('start_time', now)
        .order('start_time', { ascending: true })
    if (data) setSlots(data)
    setLoading(false)
  }

  // --- TUTOR LOGIC ---
  const handleAddSlot = async () => {
    if (!newTime) return
    setLoading(true)

    const baseStart = new Date(newTime)
    let slotsToCreate = []
    
    let loops = 1
    let intervalDays = 0
    if (recurrence === 'weekly') { loops = 12; intervalDays = 7 }
    if (recurrence === 'biweekly') { loops = 6; intervalDays = 14 }
    if (recurrence === 'monthly') { loops = 3; intervalDays = 30 }

    for (let i = 0; i < loops; i++) {
        const start = new Date(baseStart)
        start.setDate(baseStart.getDate() + (i * intervalDays))
        const end = new Date(start.getTime() + 60 * 60 * 1000)

        slotsToCreate.push({
            tutor_id: user.id,
            start_time: start.toISOString(),
            end_time: end.toISOString(),
            is_booked: false,
            allow_in_person: allowInPerson // Save Tutor preference
        })
    }

    const { error } = await supabase.from('schedule').insert(slotsToCreate)
    if (error) alert('Error: ' + error.message)
    else { alert('Availability Updated!'); fetchSchedule(); }
    setLoading(false)
  }

  // --- STUDENT LOGIC ---
  const handleBookingStart = (slot: any) => {
      const mode = selectedModes[slot.id] || 'online'
      
      if (mode === 'in_person') {
          if (!parentConsent) {
              alert("Safety Requirement: You must acknowledge the Parental Consent/Attendance policy for in-person meetings.")
              return
          }
      }
      
      // Calculate Price
      const price = mode === 'in_person' ? '$55.00' : '$35.00'
      const confirmMsg = mode === 'in_person' 
        ? `Confirm In-Person Session?\nLocation: Nepean Centrepointe Library\nPrice: ${price}\n(10km from Baseline)` 
        : `Confirm Online Session?\nPrice: ${price}`

      if (window.confirm(confirmMsg)) {
          processPayment(slot.id, mode)
      }
  }

  const processPayment = async (slotId: number, bookingType: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId, bookingType }),
      })
      const data = await response.json()
      if (data.url) window.location.href = data.url
      else alert("Payment Error")
    } catch (err) {
      alert("System Error")
    }
  }

  if (loading) return <div className="p-20 text-center text-white bg-[#05051e] min-h-screen">Loading Marketplace...</div>

  return (
    <div className="min-h-screen bg-[#05051e] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
          <h1 className="text-3xl font-extrabold text-blue-400">
            {role === 'tutor' ? 'Manage Schedule' : 'Book a Session'}
          </h1>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} className="text-red-400 font-bold border border-red-900/50 px-4 py-2 rounded">Sign Out</button>
        </div>

        {/* --- TUTOR INTERFACE --- */}
        {role === 'tutor' && (
          <div className="bg-[#11113a] p-6 rounded-3xl mb-12 border border-blue-500/30">
            <h2 className="text-xl font-bold mb-4">Create Slots</h2>
            <div className="grid md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-1">
                <label className="text-slate-400 text-sm">Start Time</label>
                <input type="datetime-local" onChange={(e) => setNewTime(e.target.value)} className="w-full bg-black/40 border border-slate-600 rounded p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Repeats?</label>
                <select onChange={(e) => setRecurrence(e.target.value)} className="w-full bg-black/40 border border-slate-600 rounded p-2 text-white">
                    <option value="one-time">Just Once</option>
                    <option value="weekly">Weekly (3 Mo)</option>
                </select>
              </div>
              <div className="flex items-center pb-3 gap-2">
                  <input type="checkbox" id="inperson" checked={allowInPerson} onChange={e => setAllowInPerson(e.target.checked)} className="w-5 h-5"/>
                  <label htmlFor="inperson" className="text-sm cursor-pointer select-none">Allow In-Person? <br/><span className="text-xs text-green-400">(Earns $55/hr)</span></label>
              </div>
              <button onClick={handleAddSlot} className="bg-blue-600 hover:bg-blue-500 py-2 rounded font-bold">Publish Slots</button>
            </div>
          </div>
        )}

        {/* --- STUDENT INTERFACE (Filters) --- */}
        {role === 'student' && (
            <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-xl">
                <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-5 h-5" onChange={(e) => setParentConsent(e.target.checked)} />
                    <p className="text-sm text-yellow-200">
                        <strong>Safety & Consent Required:</strong> If choosing "In-Person", I confirm that I am over 15 years old OR a parent/guardian has provided email consent (or will attend). 
                        Location is restricted to: <span className="font-bold text-white">Nepean Centrepointe Library</span>.
                    </p>
                </div>
            </div>
        )}

        {/* --- SLOT LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slots.map((slot) => {
            const dateStr = new Date(slot.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            const timeStr = new Date(slot.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            
            // Default to online if user hasn't touched the toggle yet
            const currentMode = selectedModes[slot.id] || 'online'

            return (
                <div key={slot.id} className={`p-6 rounded-2xl border relative ${slot.is_booked ? 'bg-slate-900 border-slate-700 opacity-70' : 'bg-[#1a1a45] border-blue-500/30'}`}>
                    
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-blue-300 font-bold">{dateStr}</p>
                            <p className="text-2xl font-bold text-white">{timeStr}</p>
                        </div>
                        {slot.is_booked ? (
                            <span className="text-red-400 font-bold text-sm bg-red-900/20 px-2 py-1 rounded">BOOKED</span>
                        ) : (
                            <span className="text-green-400 font-bold text-sm bg-green-900/20 px-2 py-1 rounded">OPEN</span>
                        )}
                    </div>

                    {/* SELECTOR FOR STUDENTS (Only show if slot allows in-person) */}
                    {role === 'student' && !slot.is_booked && slot.allow_in_person && (
                        <div className="bg-black/30 p-2 rounded-lg mb-4 flex gap-1">
                            <button 
                                onClick={() => setSelectedModes({...selectedModes, [slot.id]: 'online'})}
                                className={`flex-1 text-xs py-1 rounded transition ${currentMode==='online' ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                            >
                                Online ($35)
                            </button>
                            <button 
                                onClick={() => setSelectedModes({...selectedModes, [slot.id]: 'in_person'})}
                                className={`flex-1 text-xs py-1 rounded transition ${currentMode==='in_person' ? 'bg-purple-600' : 'hover:bg-white/5'}`}
                            >
                                In-Person ($55)
                            </button>
                        </div>
                    )}

                    {role === 'student' && !slot.is_booked && !slot.allow_in_person && (
                        <div className="bg-black/30 p-2 rounded-lg mb-4 text-center text-xs text-slate-400">
                            Online Only ($35)
                        </div>
                    )}

                    {/* ACTION BUTTONS */}
                    {role === 'student' && !slot.is_booked && (
                        <button onClick={() => handleBookingStart(slot)} className="w-full bg-[#fbbf24] text-black font-bold py-2 rounded hover:bg-[#f59e0b] transition">
                            Book This
                        </button>
                    )}

                    {/* JOIN BUTTON */}
                    {slot.is_booked && (
                        <div>
                            <p className="text-xs text-slate-400 mb-2">Location: {slot.location || 'Video Room'}</p>
                            {slot.location && slot.location.includes('Library') ? (
                                <div className="text-center py-2 bg-purple-900/50 rounded border border-purple-500 text-sm">📍 Meet at Library</div>
                            ) : (
                                <button onClick={() => router.push(`/room/${slot.id}`)} className="w-full bg-blue-600 py-2 rounded font-bold">Enter Video Room</button>
                            )}
                        </div>
                    )}
                </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}