'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState('student')
  
  // SCHEDULE STATE
  const [slots, setSlots] = useState<any[]>([])
  
  // QUESTION STATE
  const [questions, setQuestions] = useState<any[]>([]) // For Tutors (All) and Students (Own)
  const [qDescription, setQDescription] = useState('')
  const [qFile, setQFile] = useState<File | null>(null)
  
  // ANSWER UPLOAD STATE (For Tutors)
  const [ansFile, setAnsFile] = useState<File | null>(null)
  const [answeringId, setAnsweringId] = useState<number | null>(null)

  // GENERIC LOADING
  const [loading, setLoading] = useState(true)

  // TUTOR SCHEDULE CREATION STATE
  const [newTime, setNewTime] = useState('')
  const [allowInPerson, setAllowInPerson] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      const userRole = profile?.role || 'student'
      setRole(userRole)
      
      // Load Schedule
      const now = new Date().toISOString()
      const { data: schedData } = await supabase.from('schedule').select('*').gt('start_time', now).order('start_time')
      if (schedData) setSlots(schedData)

      // Load Questions
      // RLS Policy handles who sees what (Tutor=All, Student=Own)
      const { data: qData } = await supabase.from('questions').select('*').order('created_at', { ascending: false })
      if (qData) setQuestions(qData)

      setLoading(false)
    }
    init()
  }, [])

  // --- 1. STUDENT: PAY & POST QUESTION ---
  const handlePostQuestion = async () => {
      if (!qFile) return alert("Please upload a picture/pdf of the problem.")
      setLoading(true)

      // Upload Question File
      const filePath = `q_${user.id}/${Date.now()}_${qFile.name}`
      await supabase.storage.from('assignments').upload(filePath, qFile)
      const { data } = supabase.storage.from('assignments').getPublicUrl(filePath)
      
      // Go To Checkout ($20) - Pass file url via backend
      try {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({ 
                bookingType: 'quick', 
                fileUrl: data.publicUrl,
                description: qDescription
            })
        })
        const checkout = await res.json()
        if (checkout.url) window.location.href = checkout.url
      } catch(e) { alert('Error starting payment') }
  }

  // --- 2. TUTOR: UPLOAD ANSWER ---
  const handleUploadAnswer = async (questionId: number) => {
      if (!ansFile) return alert("Select solution file.")
      setLoading(true)

      const filePath = `ans_${user.id}/${Date.now()}_${ansFile.name}`
      await supabase.storage.from('assignments').upload(filePath, ansFile)
      const { data } = supabase.storage.from('assignments').getPublicUrl(filePath)

      const { error } = await supabase
        .from('questions')
        .update({ 
            status: 'answered', 
            answer_file: data.publicUrl, 
            tutor_id: user.id 
        })
        .eq('id', questionId)

      if (!error) {
          alert("Answer sent!")
          window.location.reload()
      }
      setLoading(false)
  }

  // --- TUTOR: CREATE SLOTS (Simplified for brevity) ---
  const handleAddSlot = async () => {
      if (!newTime) return
      // Create just one for this test
      const start = new Date(newTime)
      const end = new Date(start.getTime() + 60*60*1000)
      await supabase.from('schedule').insert({
          tutor_id: user.id, start_time: start, end_time: end, is_booked: false, allow_in_person: allowInPerson
      })
      alert("Slot Added")
      window.location.reload()
  }

  const handleBookSession = async (slotId: number, type: string) => {
      if(!confirm(`Confirm ${type} booking?`)) return
      const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ slotId, bookingType: type }) })
      const data = await res.json()
      if(data.url) window.location.href = data.url
  }

  if (loading) return <div className="p-20 text-white text-center bg-[#05051e] h-screen">Loading Portal...</div>

  return (
    <div className="min-h-screen bg-[#05051e] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {role === 'tutor' ? 'Tutor Command Center' : 'Student Learning Hub'}
            </h1>
            <button onClick={() => {supabase.auth.signOut(); router.push('/')}} className="text-red-400 border border-red-500/30 px-3 py-1 rounded">Sign Out</button>
        </div>

        {/* --- STUDENT SECTION: ASK A QUESTION --- */}
        {role === 'student' && (
            <div className="mb-12 bg-gradient-to-r from-[#11113a] to-[#1a1a45] p-8 rounded-3xl border border-blue-500/40">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">⚡ Quick Question ($20)</h2>
                <p className="text-slate-300 mb-6 text-sm">Upload a problem you are stuck on. An expert will solve it and upload the solution here within 24 hours.</p>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <input type="text" placeholder="Short description (e.g. Calculus Integral #4)" 
                        className="flex-1 bg-black/30 border border-slate-600 rounded-lg p-3 text-white"
                        onChange={e => setQDescription(e.target.value)}
                    />
                    <input type="file" onChange={e => setQFile(e.target.files?.[0] || null)} className="bg-black/30 text-slate-300 p-2 rounded-lg" />
                    <button onClick={handlePostQuestion} className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold">Pay & Submit</button>
                </div>
            </div>
        )}

        {/* --- Q&A BOARD (VISIBLE TO BOTH) --- */}
        <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 text-purple-300">
                {role === 'tutor' ? 'Incoming Question Pool' : 'My Questions History'}
            </h3>
            
            <div className="grid gap-4">
                {questions.length === 0 && <p className="text-slate-500 italic">No questions found.</p>}
                
                {questions.map(q => (
                    <div key={q.id} className="bg-[#161640] p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-xs px-2 py-1 rounded font-bold ${q.status === 'answered' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {q.status === 'answered' ? 'SOLVED' : 'PENDING'}
                                </span>
                                <span className="text-slate-400 text-sm">{new Date(q.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="font-bold text-lg">{q.description || "Question details"}</p>
                            <a href={q.question_file} target="_blank" className="text-blue-400 text-sm underline hover:text-blue-300 mt-1 block">
                                View Problem File
                            </a>
                            
                            {/* STUDENT VIEW SOLUTION */}
                            {q.status === 'answered' && q.answer_file && (
                                <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                                    <p className="text-green-400 font-bold mb-1">Solution Ready:</p>
                                    <a href={q.answer_file} target="_blank" className="text-white underline">Download Tutor's Answer</a>
                                </div>
                            )}
                        </div>

                        {/* TUTOR ACTION AREA */}
                        {role === 'tutor' && q.status === 'pending' && (
                            <div className="bg-black/30 p-4 rounded-xl border border-slate-700 min-w-[250px]">
                                <p className="text-sm font-bold text-slate-300 mb-2">Upload Solution</p>
                                {answeringId === q.id ? (
                                    <div className="flex flex-col gap-2">
                                        <input type="file" className="text-xs" onChange={e => setAnsFile(e.target.files?.[0] || null)}/>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleUploadAnswer(q.id)} className="bg-green-600 text-xs px-3 py-2 rounded">Send</button>
                                            <button onClick={() => setAnsweringId(null)} className="bg-red-600 text-xs px-3 py-2 rounded">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => setAnsweringId(q.id)} className="w-full bg-purple-600 text-white px-4 py-2 rounded font-bold text-sm">Solve This ($20)</button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* --- SCHEDULE SECTION (Bottom) --- */}
        <div className="pt-8 border-t border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-white">Live Video Schedule</h2>
            
            {/* TUTOR CONTROLS */}
            {role === 'tutor' && (
                <div className="bg-[#11113a] p-4 rounded-xl mb-6 flex gap-4 items-center">
                    <input type="datetime-local" onChange={e => setNewTime(e.target.value)} className="bg-black/50 text-white p-2 rounded" />
                    <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={allowInPerson} onChange={e=>setAllowInPerson(e.target.checked)}/> In Person?</label>
                    <button onClick={handleAddSlot} className="bg-blue-600 px-4 py-2 rounded font-bold">Add 1 Hour Slot</button>
                </div>
            )}

            {/* SLOT GRID */}
            <div className="grid md:grid-cols-3 gap-4">
                {slots.map(slot => (
                    <div key={slot.id} className="bg-[#1a1a45] p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-blue-200">{new Date(slot.start_time).toLocaleString()}</span>
                            {slot.is_booked && <span className="text-red-400 font-bold text-xs">BOOKED</span>}
                        </div>
                        {role === 'student' && !slot.is_booked && (
                            <div className="flex gap-2 mt-2">
                                <button onClick={() => handleBookSession(slot.id, 'online')} className="flex-1 bg-blue-600 py-1 rounded text-xs">Online ($35)</button>
                                {slot.allow_in_person && <button onClick={() => handleBookSession(slot.id, 'in_person')} className="flex-1 bg-purple-600 py-1 rounded text-xs">Person ($55)</button>}
                            </div>
                        )}
                        {slot.is_booked && (
                            <a href={`/room/${slot.id}`} className="block text-center bg-green-700 py-2 rounded mt-2 text-sm font-bold">Enter Class</a>
                        )}
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  )
}