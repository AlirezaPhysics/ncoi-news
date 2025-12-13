'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } }
    })
    if (error) setMessage(error.message)
    else setMessage('Account created! Please check your email.')
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="p-8 bg-white shadow-xl rounded-lg w-96 border">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">Tutor Login</h1>
        
        <label className="text-sm font-bold">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        <label className="text-sm font-bold">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        <div className="mb-4">
          <label className="text-sm font-bold mr-2">I am a:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded p-1">
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button onClick={handleLogin} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Log In</button>
          <button onClick={handleSignUp} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Sign Up</button>
        </div>
        {message && <p className="mt-4 text-center text-red-500 text-sm">{message}</p>}
      </div>
    </div>
  )
}