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
    // 1. Create the user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: role }
      }
    })
    
    if (signUpError) {
      setMessage(signUpError.message)
    } else {
      setMessage('Account created! Please check your email (and Spam folder) to verify.')
    }
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      router.push('/') // Redirect home
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
      <div className="p-8 bg-white shadow-md rounded-lg w-96 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">Tutor Platform</h1>
        
        <label className="block text-sm font-bold mb-1">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black"
          placeholder="student@example.com"
        />

        <label className="block text-sm font-bold mb-1">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black"
          placeholder="••••••••"
        />

        {/* Role Select */}
        <div className="mb-4">
          <span className="mr-2 text-sm font-bold">I am a:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="p-1 border rounded bg-white"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleLogin}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
            disabled={loading}
          >
            Log In
          </button>
          <button 
            onClick={handleSignUp}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
            disabled={loading}
          >
            Sign Up
          </button>
        </div>

        {message && <p className="mt-4 text-center text-red-500 text-sm font-bold">{message}</p>}
      </div>
    </div>
  )
}