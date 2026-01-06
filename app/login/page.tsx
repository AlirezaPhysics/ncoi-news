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
    let referrerId = null
    if (referralCode && role === 'student') {
        const { data } = await supabase.from('profiles').select('id').eq('email', referralCode).single()
        if (data) referrerId = data.id
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email, password, options: { data: { role: role } }
    })

    if (error) setMessage(error.message)
    else {
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
     
     if (error) setMessage(error.message) 
     else {
       const { data: profile } = await supabase
         .from('profiles').select('role, status, onboarding_complete').eq('id', data.user.id).single()
       
       if (profile?.role === 'tutor') {
           if (profile.status === 'pending') router.push('/apply-tutor')
           else if (profile.status === 'approved') router.push('/dashboard')
           else alert("Application under review.")
       } else {
           if (profile?.onboarding_complete) router.push('/dashboard')
           else router.push('/student-onboarding')
       }
     }
    setLoading(false)
  }

  return (
    // UPDATED: Added Background Image
    <div className="flex flex-col items-center justify-center min-h-screen relative text-white">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-bg.jpg')" }} 
      >
        {/* Dark Overlay so text is readable */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      <div className="p-8 bg-[#11113a]/90 backdrop-blur-md border border-slate-600 shadow-2xl rounded-2xl w-96 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
            {role === 'tutor' ? 'Tutor Partner' : 'Student Access'}
        </h1>
        
        <label className="text-sm font-bold text-slate-300">Email</label>
        <input 
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 bg-black/50 border border-slate-600 rounded text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
        />

        <label className="text-sm font-bold text-slate-300">Password</label>
        <input 
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black/50 border border-slate-600 rounded text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
        />

        {role === 'student' && (
            <div className="mb-4">
                <label className="text-sm font-bold text-green-400">Referral Email (Optional)</label>
                <input 
                  type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="tutor@example.com"
                  className="w-full p-2 mt-1 bg-green-900/20 border border-green-500/50 rounded text-white text-sm"
                />
            </div>
        )}

        <div className="mb-6 bg-black/40 p-1.5 rounded flex justify-center gap-2">
            <button onClick={() => setRole('student')} className={`flex-1 text-sm px-3 py-1.5 rounded transition ${role==='student' ? 'bg-blue-600 text-white shadow-lg' : 'hover:text-gray-300 text-gray-500'}`}>Student</button>
            <button onClick={() => setRole('tutor')} className={`flex-1 text-sm px-3 py-1.5 rounded transition ${role==='tutor' ? 'bg-purple-600 text-white shadow-lg' : 'hover:text-gray-300 text-gray-500'}`}>Tutor</button>
        </div>

        <div className="flex gap-2">
          <button onClick={handleLogin} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold transition">Log In</button>
          <button onClick={handleSignUp} className="flex-1 bg-[#fbbf24] text-black py-3 rounded-xl font-bold hover:bg-[#f59e0b] transition shadow-[0_0_15px_rgba(251,191,36,0.3)]">Sign Up</button>
        </div>
        {message && <p className="mt-4 text-center text-yellow-400 text-sm font-bold">{message}</p>}
      </div>
    </div>
  )
}