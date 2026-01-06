'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ConfirmedPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Auto-detect login when they land here from the email link
  useEffect(() => {
    // Supabase usually auto-handles the session from the URL hash
    // We just wait for the user to click the button
  }, [])

  const handleNextStep = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        // If the link didn't log them in automatically, send to login
        router.push('/login')
        return
    }

    // Check Profile to decide where they go
    const { data: profile } = await supabase
        .from('profiles')
        .select('role, status, onboarding_complete')
        .eq('id', user.id)
        .single()

    if (profile?.role === 'tutor') {
        if (profile.status === 'pending') router.push('/apply-tutor')
        else router.push('/dashboard')
    } else {
        // Student logic
        if (profile?.onboarding_complete) router.push('/dashboard')
        else router.push('/student-onboarding')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#05051e] flex flex-col items-center justify-center text-white px-4">
      <div className="bg-[#11113a] p-10 rounded-3xl border border-green-500/30 text-center max-w-lg w-full shadow-2xl">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✓
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Email Verified!</h1>
        <p className="text-slate-300 text-lg mb-8">
          Your email is confirmed, please complete the next step(s).
        </p>

        <button 
          onClick={handleNextStep}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition transform hover:scale-105"
        >
          {loading ? "Loading..." : "Continue to Next Step →"}
        </button>
      </div>
    </div>
  )
}