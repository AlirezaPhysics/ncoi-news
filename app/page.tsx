'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a2a] text-white overflow-x-hidden font-sans">
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          TUTORCODE.AI
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 text-sm font-bold bg-yellow-500 text-black rounded-full hover:bg-yellow-400">
            Log In / Sign Up
          </Link>
        </div>
      </nav>

      <header className="max-w-6xl mx-auto px-6 pt-20 pb-32 text-center md:text-left md:flex items-center justify-between">
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            The world’s first <br />
            <span className="bg-indigo-600 px-2 text-white">superhuman</span> <br />
            Code & Math tutor.
          </h1>
          <Link href="/login" className="inline-block px-8 py-4 text-lg font-bold bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition">
            Find a Tutor Now &rarr;
          </Link>
        </div>
      </header>
    </div>
  )
}