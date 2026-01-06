'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const OTTAWA_LOCATIONS = ["Nepean Centrepointe Library (101 Centrepointe Dr)"]

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState('student')
  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // TUTOR STATE
  const [newTime, setNewTime] = useState('')
  const [recurrence, setRecurrence] = useState('one-time')
  const [allowInPerson, setAllowInPerson] = useState(false)
  // Tutor detailed preferences
  const [tutorGradePref, setTutorGradePref] = useState('All Grades')
  const [tutorCourses, setTutorCourses] = useState('All Math Courses')
  const [rememberTutor, setRememberTutor] = useState(false)

  // STUDENT BOOKING STATE (The Modal)
  const [selectedSlot, setSelectedSlot] = useState<any>(null) // If not null, modal is open
  const [bookingType, setBookingType] = useState('online')
  const [stuForm, setStuForm] = useState({ grade: '', course: '', needs: '', accommodations: '' })
  const [stuFile, setStuFile] = useState<File | null>(null)
  const [parentConsent, setParentConsent] = useState(false)
  const [rememberStudent, setRememberStudent] = useState(false)

  // REQUEST SESSION STATE
  const [isRequesting, setIsRequesting] = useState(false)
  const [requestText, setRequestText] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      
      setUser(user)
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      setRole(profile?.role || 'student')
      fetchSchedule()

      // Load Remembered Settings
      if (profile?.role === 'tutor') {
          const saved = localStorage.getItem('tutor_pref')
          if (saved) {
              const p = JSON.parse(saved)
              setTutorGradePref(p.grade)
              setTutorCourses(p.courses)
              setAllowInPerson(p.inPerson)
              setRememberTutor(true)
          }
      } else {
          const saved = localStorage.getItem('student_pref')
          if (saved) {
              const p = JSON.parse(saved)
              setStuForm(prev => ({...prev, grade: p.grade, needs: p.needs}))
              setRememberStudent(true)
          }
      }
    }
    checkUser()
  }, [])

  const fetchSchedule = async () => {
    const now = new Date().toISOString()
    const { data } = await supabase
        .from('schedule')
        .select('*, profiles(full_name)') // Get tutor name
        .gt('start_time', now)
        .order('start_time', { ascending: true })
    if (data) setSlots(data)
    setLoading(false)
  }

  // --- TUTOR: CREATE SLOTS ---
  const handleAddSlot = async () => {
    if (!newTime) return
    setLoading(true)

    // Save preferences if 'Remember' checked
    if (rememberTutor) {
        localStorage.setItem('tutor_pref', JSON.stringify({ grade: tutorGradePref, courses: tutorCourses, inPerson: allowInPerson }))
    }

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
            allow_in_person: allowInPerson,
            tutor_constraints: { grades: tutorGradePref, courses: tutorCourses } // SAVING META
        })
    }

    const { error } = await supabase.from('schedule').insert(slotsToCreate)
    if (error) alert('Error: ' + error.message)
    else { alert('Availability Updated!'); fetchSchedule(); }
    setLoading(false)
  }

  // --- STUDENT: SUBMIT BOOKING (Detailed) ---
  const handleFinalPayment = async () => {
      // 1. Validation
      if (bookingType === 'in_person' && !parentConsent) return alert("Parental Consent is required for In-Person.")
      if (!stuForm.grade || !stuForm.course) return alert("Please fill in Grade and Course.")

      // 2. Save Preference
      if (rememberStudent) {
          localStorage.setItem('student_pref', JSON.stringify({ grade: stuForm.grade, needs: stuForm.needs }))
      }

      setLoading(true)

      // 3. Upload File if exists
      let fileUrl = ''
      if (stuFile) {
          const filePath = `booking_${selectedSlot.id}/${Date.now()}_${stuFile.name}`
          await supabase.storage.from('assignments').upload(filePath, stuFile)
          const { data } = supabase.storage.from('assignments').getPublicUrl(filePath)
          fileUrl = data.publicUrl
      }

      // 4. Construct Full Data Payload
      const studentDetails = {
          grade: stuForm.grade,
          course: stuForm.course,
          needs: stuForm.needs,
          accommodations: stuForm.accommodations,
          file_url: fileUrl
      }

      // 5. Checkout
      try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                slotId: selectedSlot.id, 
                bookingType: bookingType,
                studentDetails: studentDetails 
            }),
        })
        const data = await response.json()
        if (data.url) window.location.href = data.url
        else alert("Payment Init Failed")
      } catch(e) { alert("System Error") }
      
      setLoading(false)
  }

  // --- STUDENT: REQUEST A SESSION ---
  const handleRequestSession = async () => {
      // For MVP, this creates a `mailto` link. 
      // This is the fastest, free-est way to "Notify the company" who then forwards it.
      const subject = `New Tutoring Request: ${stuForm.course || 'Math Help'}`
      const body = `I am requesting a session.\n\nDetails: ${requestText}\nMy Course: ${stuForm.course}\n\nPlease check with all tutors.`
      window.location.href = `mailto:admin@tutorcodeai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setIsRequesting(false)
  }

  if (loading) return <div className="p-20 text-center text-white bg-[#05051e] min-h-screen">Loading Marketplace...</div>

  return (
    <div className="min-h-screen bg-[#05051e] text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {role === 'tutor' ? 'Tutor Control Panel' : 'Student Marketplace'}
          </h1>
          <div className="flex gap-4">
            {role === 'student' && (
                <button onClick={() => setIsRequesting(true)} className="bg-green-600 text-white font-bold px-4 py-2 rounded hover:bg-green-500">
                    Request Specific Time ✉️
                </button>
            )}
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} className="text-red-400 font-bold border border-red-900/50 px-4 py-2 rounded">
                Sign Out
            </button>
          </div>
        </div>

        {/* --- TUTOR CREATE SECTION --- */}
        {role === 'tutor' && (
          <div className="bg-[#11113a] p-6 rounded-3xl mb-12 border border-blue-500/30">
            <h2 className="text-xl font-bold mb-4">Set Availability & Rules</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
              <div>
                <label className="text-slate-400 text-xs uppercase">Time</label>
                <input type="datetime-local" onChange={(e) => setNewTime(e.target.value)} className="w-full bg-black/40 border border-slate-600 rounded p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs uppercase">Target Grade(s)</label>
                <input type="text" value={tutorGradePref} onChange={e => setTutorGradePref(e.target.value)} className="w-full bg-black/40 border border-slate-600 rounded p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs uppercase">Courses</label>
                <input type="text" value={tutorCourses} onChange={e => setTutorCourses(e.target.value)} className="w-full bg-black/40 border border-slate-600 rounded p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-xs uppercase">Recurrence</label>
                <select onChange={(e) => setRecurrence(e.target.value)} className="w-full bg-black/40 border border-slate-600 rounded p-2 text-white">
                    <option value="one-time">One Time</option>
                    <option value="weekly">Weekly (3 Mo)</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="ip" checked={allowInPerson} onChange={e => setAllowInPerson(e.target.checked)} className="w-4 h-4"/>
                    <label htmlFor="ip" className="text-sm">Allow In-Person ($55)?</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="rem" checked={rememberTutor} onChange={e => setRememberTutor(e.target.checked)} className="w-4 h-4"/>
                    <label htmlFor="rem" className="text-sm text-yellow-400">Remember these settings</label>
                </div>
                <button onClick={handleAddSlot} className="ml-auto bg-blue-600 px-6 py-2 rounded font-bold hover:bg-blue-500">Publish Slot(s)</button>
            </div>
          </div>
        )}

        {/* --- SLOT LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot) => {
            const date = new Date(slot.start_time)
            const meta = slot.tutor_constraints || { grades: 'All', courses: 'Math' } // Default Fallback

            return (
                <div key={slot.id} className={`p-6 rounded-2xl border flex flex-col gap-2 ${slot.is_booked ? 'bg-slate-900 border-slate-700 opacity-70' : 'bg-[#1a1a45] border-blue-500/30'}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-300 font-bold">{date.toLocaleDateString()}</p>
                            <p className="text-2xl font-bold">{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${slot.is_booked ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>{slot.is_booked ? 'BOOKED' : 'OPEN'}</span>
                    </div>
                    
                    {/* SHOW TUTOR CONSTRAINTS */}
                    <div className="mt-2 text-sm text-slate-400 bg-black/20 p-2 rounded">
                        <p><strong>Focus:</strong> {meta.courses}</p>
                        <p><strong>Grades:</strong> {meta.grades}</p>
                        {slot.profiles && <p className="text-xs mt-1 text-blue-200">Tutor: {slot.profiles.full_name}</p>}
                    </div>

                    <div className="mt-auto pt-4">
                        {role === 'student' && !slot.is_booked && (
                            <button onClick={() => setSelectedSlot(slot)} className="w-full bg-[#fbbf24] text-black font-bold py-2 rounded hover:bg-[#f59e0b]">
                                Book Now
                            </button>
                        )}
                        {slot.is_booked && (
                            <button onClick={() => router.push(`/room/${slot.id}`)} className="w-full bg-blue-600 py-2 rounded font-bold">Join Video Room</button>
                        )}
                    </div>
                </div>
            )
          })}
        </div>

        {/* --- MODAL: STUDENT BOOKING DETAILS --- */}
        {selectedSlot && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <div className="bg-[#11113a] border border-blue-500/50 rounded-2xl p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Complete Your Booking</h2>
                    
                    {/* Booking Type */}
                    <label className="text-sm font-bold text-slate-300">Session Mode</label>
                    <div className="flex gap-2 mb-4">
                        <button onClick={() => setBookingType('online')} className={`flex-1 py-2 rounded border ${bookingType === 'online' ? 'bg-blue-600 border-blue-600' : 'border-slate-600'}`}>Online ($35)</button>
                        {selectedSlot.allow_in_person ? (
                            <button onClick={() => setBookingType('in_person')} className={`flex-1 py-2 rounded border ${bookingType === 'in_person' ? 'bg-purple-600 border-purple-600' : 'border-slate-600'}`}>In-Person ($55)</button>
                        ) : <button disabled className="flex-1 py-2 rounded border border-slate-700 text-slate-500 cursor-not-allowed">In-Person N/A</button>}
                    </div>

                    <label className="text-sm font-bold text-slate-300">Grade Level</label>
                    <input className="w-full mb-3 bg-black/40 border border-slate-600 rounded p-2 text-white" value={stuForm.grade} onChange={e=>setStuForm({...stuForm, grade: e.target.value})} placeholder="e.g. Grade 11"/>

                    <label className="text-sm font-bold text-slate-300">Course Code / Subject</label>
                    <input className="w-full mb-3 bg-black/40 border border-slate-600 rounded p-2 text-white" value={stuForm.course} onChange={e=>setStuForm({...stuForm, course: e.target.value})} placeholder="e.g. MCR3U or Calculus I"/>

                    <label className="text-sm font-bold text-slate-300">Issues / What to learn?</label>
                    <textarea className="w-full mb-3 bg-black/40 border border-slate-600 rounded p-2 h-20 text-white" value={stuForm.needs} onChange={e=>setStuForm({...stuForm, needs: e.target.value})} placeholder="I am stuck on integration..."></textarea>

                    <label className="text-sm font-bold text-slate-300">Accommodations / Needs?</label>
                    <input className="w-full mb-3 bg-black/40 border border-slate-600 rounded p-2 text-white" value={stuForm.accommodations} onChange={e=>setStuForm({...stuForm, accommodations: e.target.value})} placeholder="Optional..."/>

                    <label className="text-sm font-bold text-yellow-400">Upload Problem/Image (PDF/JPG)</label>
                    <input type="file" className="w-full mb-4 text-sm" onChange={e => setStuFile(e.target.files ? e.target.files[0] : null)} />

                    {/* Checkboxes */}
                    {bookingType === 'in_person' && (
                        <div className="flex items-start gap-2 mb-4 bg-red-900/20 p-2 rounded">
                            <input type="checkbox" className="mt-1" checked={parentConsent} onChange={e => setParentConsent(e.target.checked)} />
                            <p className="text-xs text-red-200">I verify I am 15+ OR have Parent Consent. Location: Nepean Library.</p>
                        </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-6">
                        <input type="checkbox" checked={rememberStudent} onChange={e => setRememberStudent(e.target.checked)} />
                        <span className="text-xs text-slate-400">Remember my details for next time</span>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => setSelectedSlot(null)} className="flex-1 bg-slate-700 py-3 rounded font-bold hover:bg-slate-600">Cancel</button>
                        <button onClick={handleFinalPayment} className="flex-1 bg-green-600 py-3 rounded font-bold hover:bg-green-500">Pay Now</button>
                    </div>
                </div>
            </div>
        )}

        {/* --- REQUEST MODAL --- */}
        {isRequesting && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
                <div className="bg-[#1a1a45] p-8 rounded-2xl w-full max-w-md border border-white/20">
                    <h2 className="text-xl font-bold mb-4">Request a Session</h2>
                    <p className="text-slate-400 text-sm mb-4">Can't find a time? Tell us when you are free. This request will be emailed to our team.</p>
                    <textarea 
                        className="w-full h-32 bg-black/50 p-3 rounded text-white border border-slate-600" 
                        placeholder="I need a tutor for Linear Algebra on Tuesday evenings or Sunday morning..."
                        value={requestText} onChange={e => setRequestText(e.target.value)}
                    ></textarea>
                    <div className="flex gap-4 mt-4">
                        <button onClick={() => setIsRequesting(false)} className="flex-1 bg-slate-600 py-2 rounded">Close</button>
                        <button onClick={handleRequestSession} className="flex-1 bg-blue-600 py-2 rounded font-bold">Send Email</button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  )
}