'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function TutorApplication() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    subjects: '', // E.g., "Math 1004, Physics 12"
    experience: '',
    education: '',
    whyUs: ''
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please log in first.")
      return
    }

    // 1. Update the user profile with application data & set status to PENDING
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.fullName,
        application_data: formData,
        status: 'pending' // Locks them out of dashboard until you approve
      })
      .eq('id', user.id)

    if (error) {
      alert("Error submitting: " + error.message)
    } else {
      alert("Application Received! The administration will review your profile. You will be emailed upon approval.")
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#05051e] text-white flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full bg-[#11113a] p-8 rounded-3xl border border-blue-500/30">
        <h1 className="text-3xl font-bold mb-2">Tutor Application</h1>
        <p className="text-slate-400 mb-6">
          Join our elite network. Please provide detailed information about your teaching capabilities.
        </p>

        {/* COMMISSION BANNER */}
        <div className="bg-yellow-500/10 border border-yellow-500/50 p-4 rounded-xl mb-8">
          <h3 className="font-bold text-yellow-400">💰 20% Lifetime Referral Commission</h3>
          <p className="text-sm text-yellow-100/80">
            For every student you refer to TutorMathPhys.AI, you receive a 20% commission on *every* session they book—forever. Even if another tutor teaches them.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Full Legal Name</label>
            <input name="fullName" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 rounded p-3 text-white" placeholder="Jane Doe" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Phone Number</label>
              <input name="phone" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 rounded p-3 text-white" placeholder="+1 (555) ..." />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Highest Degree Earned</label>
              <input name="education" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 rounded p-3 text-white" placeholder="B.Sc, M.Eng..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Specific Subjects You Can Teach</label>
            <textarea name="subjects" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 rounded p-3 text-white h-24" placeholder="E.g., Gr 12 Calculus, PHYS 1004, Python Basics..." />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Teaching Experience (Be Specific)</label>
            <textarea name="experience" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 rounded p-3 text-white h-24" placeholder="Previous jobs, number of students taught..." />
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-900/50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  )
}