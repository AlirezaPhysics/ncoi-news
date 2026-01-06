'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [role, setRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    setLoading(true)
    
    // 1. Check referral
    let referrerId = null
    if (referralCode && role === 'student') {
        const { data } = await supabase.from('profiles').select('id').eq('email', referralCode).single()
        if (data) referrerId = data.id
    }

    // 2. Create Auth User
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { role: role }
      }
    })

    if (error) {
      setMessage(error.message)
    } else {
        // 3. Link Referral if exists
        if (referrerId && authData.user) {
            await supabase.from('profiles').update({ referred_by: referrerId }).eq('id', authData.user.id)
        }
        setMessage('Account created! Please check your email to confirm.')
    }
    setLoading(false)
  }

  const handleLogin = async () => {
     setLoading(true)
     const { error, data } = await supabase.auth.signInWithPassword({ email, password })
     
     if (error) {
       setMessage(error.message) 
     } else {
       // 4. FETCH PROFILE + ONBOARDING STATUS
       const { data: profile } = await supabase
         .from('profiles')
         .select('role, status, onboarding_complete') // <--- Requesting new column
         .eq('id', data.user.id)
         .single()
       
       if (profile?.role === 'tutor') {
           // TUTOR LOGIC
           if (profile.status === 'pending') {
               router.push('/apply-tutor')
           } else if (profile.status === 'approved') {
               router.push('/dashboard')
           } else {
               alert("Your application is under review or rejected.")
           }
       } else {
           // STUDENT LOGIC (UPDATED)
           // If they finished the questionnaire, go to dashboard.
           // If not, send them to onboarding.
           if (profile?.onboarding_complete) {
               router.push('/dashboard')
           } else {
               router.push('/student-onboarding')
           }
       }
     }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#05051e] text-white">
      <div className="p-8 bg-[#11113a] border border-slate-700 shadow-2xl rounded-2xl w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
            {role === 'tutor' ? 'Tutor Partner' : 'Student Access'}
        </h1>
        
        <label className="text-sm font-bold text-slate-300">Email</label>
        <input 
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 bg-black/30 border border-slate-600 rounded text-white"
        />

        <label className="text-sm font-bold text-slate-300">Password</label>
        <input 
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black/30 border border-slate-600 rounded text-white"
        />

        {role === 'student' && (
            <div className="mb-4">
                <label className="text-sm font-bold text-green-400">Referral Email (Optional)</label>
                <input 
                  type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="tutor@example.com"
                  className="w-full p-2 mt-1 bg-green-900/10 border border-green-500/30 rounded text-white text-sm"
                />
            </div>
        )}

        <div className="mb-6 bg-slate-800/50 p-2 rounded flex justify-center gap-4">
            <button onClick={() => setRole('student')} className={`text-sm px-3 py-1 rounded ${role==='student' ? 'bg-blue-600' : 'opacity-50'}`}>Student</button>
            <button onClick={() => setRole('tutor')} className={`text-sm px-3 py-1 rounded ${role==='tutor' ? 'bg-purple-600' : 'opacity-50'}`}>I want to Teach</button>
        </div>

        <div className="flex gap-2">
          <button onClick={handleLogin} className="flex-1 bg-slate-700 text-white py-2 rounded hover:bg-slate-600 font-bold">Log In</button>
          <button onClick={handleSignUp} className="flex-1 bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400 font-bold">Sign Up</button>
        </div>
        {message && <p className="mt-4 text-center text-yellow-400 text-sm">{message}</p>}
      </div>
    </div>
  )
}