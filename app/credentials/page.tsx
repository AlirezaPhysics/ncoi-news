'use client'
import Link from 'next/link'

export default function CredentialsPage() {
  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg group-hover:scale-110 transition"></div>
          <span className="text-xl font-bold tracking-widest text-white uppercase">TutorMathPhys.AI</span>
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="/curriculum" className="hover:text-white transition">Curriculum</Link>
          <Link href="/credentials" className="text-white font-bold transition">Credentials</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
        </div>

        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          Book Session
        </Link>
      </nav>

      {/* HEADER: DIPLOMA STYLE */}
      <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-block p-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-mono text-sm mb-6">
          VERIFIED ACADEMIC RECORD
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Bachelor of Science <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Honours Applied Physics</span>
        </h1>
        <p className="text-xl text-slate-400">
          A rigourous 4-year major focusing on complex mathematical models and physical systems.
        </p>
      </div>

      {/* AUDIT SUMMARY STATS */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-[#11113a] p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-4xl font-bold text-white mb-2">9.63</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">High CGPA (Honours)</div>
          </div>
          <div className="bg-[#11113a] p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-4xl font-bold text-white mb-2">20.0</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Credits Completed</div>
          </div>
          <div className="bg-[#11113a] p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-4xl font-bold text-white mb-2">4th</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Year Standing</div>
          </div>
          <div className="bg-[#11113a] p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-4xl font-bold text-white mb-2">Major</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Applied Physics</div>
          </div>
        </div>
      </section>

      {/* ACADEMIC TRANSCRIPT HIGHLIGHTS */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="bg-green-500/20 text-green-400 p-2 rounded-lg text-lg">A+</span>
          Transcript Highlights
        </h2>
        
        <div className="space-y-4">
          {/* Item 1 */}
          <div className="flex justify-between items-center p-6 bg-[#161640] rounded-xl border border-white/5 hover:border-blue-500/30 transition">
            <div>
              <h3 className="font-bold text-lg text-white">Calculus for Engineering/Physics</h3>
              <p className="text-slate-400 text-sm">MATH 1004 & 1104</p>
            </div>
            <span className="font-mono text-green-400 bg-green-900/30 px-3 py-1 rounded">A+ Grade</span>
          </div>

          {/* Item 2 */}
          <div className="flex justify-between items-center p-6 bg-[#161640] rounded-xl border border-white/5 hover:border-blue-500/30 transition">
            <div>
              <h3 className="font-bold text-lg text-white">Linear Algebra</h3>
              <p className="text-slate-400 text-sm">MATH 1104</p>
            </div>
            <span className="font-mono text-green-400 bg-green-900/30 px-3 py-1 rounded">A Grade</span>
          </div>

          {/* Item 3 */}
          <div className="flex justify-between items-center p-6 bg-[#161640] rounded-xl border border-white/5 hover:border-blue-500/30 transition">
            <div>
              <h3 className="font-bold text-lg text-white">Foundations of Physics I</h3>
              <p className="text-slate-400 text-sm">PHYS 1001 (Mechanics)</p>
            </div>
            <span className="font-mono text-blue-300 bg-blue-900/30 px-3 py-1 rounded">High Standing</span>
          </div>

          {/* Item 4 */}
          <div className="flex justify-between items-center p-6 bg-[#161640] rounded-xl border border-white/5 hover:border-blue-500/30 transition">
            <div>
              <h3 className="font-bold text-lg text-white">Electronics & Circuits</h3>
              <p className="text-slate-400 text-sm">ELEC 2501</p>
            </div>
            <span className="font-mono text-green-400 bg-green-900/30 px-3 py-1 rounded">A Grade</span>
          </div>

          {/* Item 5 */}
          <div className="flex justify-between items-center p-6 bg-[#161640] rounded-xl border border-white/5 hover:border-blue-500/30 transition">
            <div>
              <h3 className="font-bold text-lg text-white">Fourth Year Physics Project</h3>
              <p className="text-slate-400 text-sm">PHYS 4909 (1.0 Credit Capstone)</p>
            </div>
            <span className="font-mono text-white bg-white/10 px-3 py-1 rounded">Completed</span>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-[#050510] text-center border-t border-slate-900">
        <p className="text-slate-500">© 2025 TutorMathPhys. AI-Enhanced Education.</p>
      </footer>
    </div>
  )
}