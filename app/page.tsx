'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-[#0a0a2a] text-white font-sans'>
      <nav className='flex justify-between items-center px-8 py-6'>
        <div className='text-2xl font-bold text-blue-400'>TUTORCODE.AI</div>
        <Link href='/login' className='bg-yellow-500 text-black px-5 py-2 rounded-full font-bold'>Try for Free</Link>
      </nav>
      <header className='text-center pt-20 px-6'>
        <h1 className='text-5xl font-extrabold mb-8'>The World's First <br/><span className='text-blue-500'>Superhuman</span> Tutor.</h1>
        <Link href='/login' className='inline-block px-8 py-4 bg-yellow-500 text-black rounded-full font-bold text-xl'>Find a Tutor Now</Link>
      </header>
    </div>
  )
}
