'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // For MVP, this creates a mailto link to open their email app
    const subject = `Feedback from ${formData.name}`
    const body = `${formData.message}\n\nFrom: ${formData.email}`
    window.location.href = `mailto:admin@tutorcodeai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg group-hover:scale-110 transition"></div>
          <span className="text-xl font-bold tracking-widest text-white uppercase">TutorMathPhys.AI</span>
        </Link>
        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition">
          Book Session
        </Link>
      </nav>

      {/* HEADER */}
      <div className="pt-20 pb-10 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Contact <span className="text-blue-400">Support</span></h1>
        <p className="text-slate-400">We are here to help aspiring physicists and mathematicians.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-20">
        
        {/* LEFT: INFO CARD */}
        <div className="bg-[#11113a] p-8 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full"></div>
          
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📍</span> HQ Location
          </h2>
          <div className="mb-8 space-y-2 text-slate-300">
            <p className="font-bold text-white">Service Area: Ottawa West</p>
            <p>101 Centrepointe Dr</p>
            <p>Nepean, ON K2G 5K7</p>
            <p className="text-sm text-blue-400 mt-2">(Near Baseline Station & Algonquin College)</p>
          </div>

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📧</span> Admin Contact
          </h2>
          <p className="text-slate-300">For billing, technical support, or partnership inquiries:</p>
          <a href="mailto:admin@tutorcodeai.com" className="text-xl font-mono text-green-400 hover:underline block mt-2">
            admin@tutorcodeai.com
          </a>
        </div>

        {/* RIGHT: FEEDBACK FORM */}
        <div className="bg-[#161640] p-8 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-bold mb-6">Send Feedback</h2>
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-400">Message Prepared!</h3>
              <p className="text-slate-400">Check your email app to hit send.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Name</label>
                <input required className="w-full bg-black/30 border border-slate-600 rounded-xl p-3 text-white focus:border-blue-500 outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Email</label>
                <input required type="email" className="w-full bg-black/30 border border-slate-600 rounded-xl p-3 text-white focus:border-blue-500 outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Message</label>
                <textarea required className="w-full bg-black/30 border border-slate-600 rounded-xl p-3 h-32 text-white focus:border-blue-500 outline-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-500/30">
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>

      <footer className="py-12 bg-[#050510] text-center border-t border-slate-900">
        <p className="text-slate-500">© 2025 TutorMathPhys. AI-Enhanced Education.</p>
      </footer>
    </div>
  )
}