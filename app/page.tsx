'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* 1. NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg"></div>
          <span className="text-xl font-bold tracking-widest text-white uppercase">TutorMathPhys.AI</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="/curriculum" className="hover:text-white transition">Curriculum</Link>
          <Link href="#" className="hover:text-white transition">Credentials</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
        </div>

        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition transform hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          Book a Session
        </Link>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
              Master Physics & <br />
              <span className="bg-[#3b82f6] text-white px-2 decoration-clone">University Math</span> <br />
              with a Pro.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-md">
              From 4th Grade foundations to 3rd Year University Applied Physics. Learn Calculus, Mechanics, and Statistics from an Honours Major expert.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login" className="px-8 py-4 text-lg font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition text-center">
                Find a Tutor Now &rarr;
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="text-sm font-medium">B.Sc. Honours Specialist</span>
              </div>
            </div>
          </div>

          {/* Right Image Mockup - Equations Theme */}
          <div className="relative">
            <div className="rounded-2xl border-4 border-slate-800 bg-[#12123a] aspect-square flex items-center justify-center relative overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-700">
               <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80"></div>
               <div className="text-center z-10 p-4">
                 <div className="text-6xl mb-4">⚛️ ∫dx</div>
                 <p className="text-slate-200 font-mono font-bold text-lg">Applied Physics & Calculus</p>
                 <div className="mt-4 px-4 py-2 bg-blue-600/20 rounded text-blue-300 text-sm border border-blue-500/50">
                   GPA 9.6/12.0 Honours Standing
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. REVOLUTION SECTION */}
      <section className="bg-[#0c0c24] py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Don't just memorize. <span className="text-blue-400">Understand.</span>
          </h2>
          <p className="text-center text-slate-400 max-w-2xl mx-auto mb-20">
            Whether you are 10 years old learning fractions or a university student tackling Quantum Mechanics, we bridge the gap.
          </p>
          
          {/* THE BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto] gap-6">
            
            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400 transition shadow-lg shadow-blue-900/20">
              <span className="text-5xl text-blue-400 block mb-4">“</span>
              <p className="text-lg text-slate-200 mb-6 font-medium">
                Finally passed my Calculus II exam. The explanation of Multivariable Integrals made so much sense.
              </p>
              <div className="font-bold text-blue-300">— University Student, 2nd Year</div>
            </div>

            <div className="md:row-span-2 md:h-full min-h-[400px] bg-[#1a1a40] rounded-3xl border border-blue-500/30 overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a2a] via-transparent to-transparent z-10"></div>
               <div className="absolute inset-4 bg-slate-800 rounded-xl border border-white/10 opacity-50 group-hover:scale-105 transition duration-700 flex items-center justify-center">
                  <span className="text-8xl opacity-20">📐</span>
               </div>
               <div className="absolute bottom-8 left-8 right-8 z-20">
                 <p className="text-xl font-bold leading-relaxed">
                   "Physics is no longer scary. From Newton's Laws to Wave Motion, everything is clear now."
                 </p>
                 <p className="text-blue-300 mt-2">— Applied Physics Student</p>
               </div>
            </div>

            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400 transition shadow-lg shadow-blue-900/20">
              <span className="text-5xl text-blue-400 block mb-4">“</span>
              <p className="text-lg text-slate-200 mb-6 font-medium">
                My daughter in Grade 6 actually enjoys her math homework now. A huge confidence booster.
              </p>
              <div className="font-bold text-blue-300">— Parent of Grade 6 Student</div>
            </div>

            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400 transition shadow-lg shadow-blue-900/20">
              <span className="text-5xl text-blue-400 block mb-4">“</span>
              <p className="text-lg text-slate-200 mb-6 font-medium">
                Linear Algebra concepts like Matrix operations and Vector Spaces were impossible until I took these sessions.
              </p>
              <div className="font-bold text-blue-300">— First Year Engineering Student</div>
            </div>

            <div className="bg-[#1a1a40] rounded-3xl border border-blue-500/30 overflow-hidden relative min-h-[250px]">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="font-bold text-lg mb-2">Homework Help & Exam Prep</p>
                    <div className="text-4xl">📝 ✅</div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CURRICULUM TABLE - UPDATED FROM YOUR AUDIT */}
      <section className="py-24 bg-[#0a0a2a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#11113a] rounded-3xl border border-blue-900/50 p-1 md:p-2 overflow-hidden">
            <div className="grid grid-cols-2 p-6 border-b border-blue-900/50 bg-[#161648]">
               <div className="text-slate-400 font-bold">Subject Areas</div>
               <div className="text-white font-bold">Topics Covered</div>
            </div>
            
            {/* Row 1 */}
            <div className="grid grid-cols-2 p-6 border-b border-blue-900/30 hover:bg-[#1a1a4a] transition">
              <div className="text-blue-200 font-bold">University Math</div>
              <div className="text-slate-300">Calculus (I, II, Multivariable), Linear Algebra, Statistics, Diff Equations</div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 p-6 border-b border-blue-900/30 hover:bg-[#1a1a4a] transition">
              <div className="text-indigo-200 font-bold">University Physics</div>
              <div className="text-slate-300">Mechanics, Electromagnetism, Modern Physics, Wave Motion</div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 p-6 border-b border-blue-900/30 hover:bg-[#1a1a4a] transition">
              <div className="text-green-200 font-bold">School (K-12)</div>
              <div className="text-slate-300">Grades 4-12 Math & Physics, SAT Prep, High School Diploma Prep</div>
            </div>

            <div className="p-8 text-center bg-[#1a1a45]">
               <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition w-full md:w-auto inline-block">
                 Book a Free Consultation
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#050510] text-center border-t border-slate-900">
        <h2 className="text-4xl font-bold mb-8 text-white">Your personalized <br/>Physics & Math Tutor.</h2>
        <div className="text-slate-600 text-sm">
          © 2025 TutorMathPhys. Built with expertise.
        </div>
      </footer>
    </div>
  )
}