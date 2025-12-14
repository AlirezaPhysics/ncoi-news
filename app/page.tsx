'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-lg"></div>
          <span className="text-xl font-bold tracking-widest text-white uppercase">TutorCode.AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="#" className="hover:text-white transition">Curriculum</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
        </div>
        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition transform hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          Try it for free
        </Link>
      </nav>

      {/* HERO SECTION */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
              The world�s first <br />
              <span className="bg-[#5833ef] text-white px-2 decoration-clone">superhuman</span> <br />
              Code Tutor.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-md">
              Warm, patient, encouraging. TutorCode AI adapts to your child's ability, teaching C++, Unity, and Math through secure, live video sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login" className="px-8 py-4 text-lg font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition text-center">
                Try it for free &rarr;
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl border-4 border-slate-800 bg-[#12123a] aspect-square flex items-center justify-center relative overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-700">
               <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-80"></div>
               <div className="text-center z-10">
                 <div className="text-6xl mb-2">??</div>
                 <p className="text-slate-400 font-mono">Live Session #204</p>
                 <button className="mt-4 px-6 py-2 bg-blue-600 rounded-full text-white font-bold flex items-center gap-2 mx-auto">
                   ? Play Video
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-[#0c0c24] py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            A revolution in <span className="text-indigo-400">math learning.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto] gap-6 mt-16">
            <div className="bg-[#242457] p-8 rounded-3xl border border-indigo-500/30 hover:border-indigo-400 transition shadow-lg shadow-indigo-900/20">
              <span className="text-5xl text-indigo-400 block mb-4">�</span>
              <p className="text-lg text-slate-200 mb-6 font-medium">
                My son went from hating math to asking for Algebra II. The tutors actually listen.
              </p>
              <div className="font-bold text-indigo-300">� Sarah, Parent</div>
            </div>
            <div className="md:row-span-2 md:h-full min-h-[400px] bg-[#1a1a40] rounded-3xl border border-indigo-500/30 overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a2a] via-transparent to-transparent z-10"></div>
               <div className="absolute inset-4 bg-slate-800 rounded-xl border border-white/10 opacity-50 group-hover:scale-105 transition duration-700"></div>
               <div className="absolute bottom-8 left-8 right-8 z-20">
                 <p className="text-xl font-bold leading-relaxed">
                   "This is magical. TutorCode challenges him to think in new ways I never could."
                 </p>
               </div>
            </div>
            <div className="bg-[#242457] p-8 rounded-3xl border border-indigo-500/30 hover:border-indigo-400 transition shadow-lg shadow-indigo-900/20">
              <span className="text-5xl text-indigo-400 block mb-4">�</span>
              <p className="text-lg text-slate-200 mb-6 font-medium">
                Unlike rote memorization, this actually teaches the logic behind the code.
              </p>
              <div className="font-bold text-indigo-300">� Mark D.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#050510] text-center border-t border-slate-900">
        <h2 className="text-4xl font-bold mb-8 text-white">The only digitally-native tool.</h2>
        <div className="text-slate-600 text-sm">
          � 2025 TutorCode AI Inc. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
