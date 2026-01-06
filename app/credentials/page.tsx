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
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
        </div>

        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          Book Session
        </Link>
      </nav>

      {/* HEADER: DUAL DEGREE */}
      <div className="pt-16 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 font-mono text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Active Graduate Researcher
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Engineering & Physics <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Academic Portfolio</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Combining rigorous Applied Physics foundations with advanced Master's level Building Engineering simulations.
        </p>
      </div>

      {/* SUMMARY STATS (Updated with your numbers) */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-[#11113a] p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-4xl font-bold text-white mb-2">300+</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Teaching Hours</div>
          </div>
          <div className="bg-[#11113a] p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Students Mentored</div>
          </div>
          <div className="bg-[#11113a] p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl font-bold text-white mb-2">M.A.Sc</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Current Degree</div>
          </div>
          <div className="bg-[#11113a] p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-4xl font-bold text-white mb-2">9.63</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Honours CGPA</div>
          </div>
        </div>
      </section>

      {/* DEGREE 1: MASTERS (CURRENT) */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="p-8 bg-[#161640] rounded-3xl border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl">🏗️</div>
          <h2 className="text-2xl font-bold mb-2">Master of Applied Science (Building Engineering)</h2>
          <p className="text-blue-300 font-mono text-sm mb-6">Carleton University | Sept 2024 – Present</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">Focus Areas</h3>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li>• Building Performance Simulation (MECH5205)</li>
                <li>• Energy Management & Optimization</li>
                <li>• Thermodynamics & Fluid Dynamics</li>
                <li>• HVAC Fault Detection & Diagnostics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">Key Research</h3>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li>• Graduate Research Assistant (Dr. Gunay's Group)</li>
                <li>• Data Analytics on 4-Zone HVAC systems</li>
                <li>• Energy Model Validation (Urbandale Centre)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DEGREE 2: UNDERGRAD (COMPLETED) */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="p-8 bg-[#161640] rounded-3xl border border-purple-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl">⚛️</div>
          <h2 className="text-2xl font-bold mb-2">B.Sc Honours Applied Physics</h2>
          <p className="text-purple-300 font-mono text-sm mb-6">Carleton University | 2020 – 2024</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">Awards</h3>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li>• <span className="text-yellow-400">Dean's Honour List (2020-2021)</span></li>
                <li>• CAP University Prize Exam (Top Physics Student)</li>
                <li>• 4th Year Physics Project (Completed)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">Key Coursework</h3>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li>• Calculus for Engineering/Physics (A+)</li>
                <li>• Linear Algebra (A)</li>
                <li>• Electronics & Circuits (A)</li>
                <li>• Quantum Mechanics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHING EXPERIENCE */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">Teaching Experience</h2>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 border-l-2 border-green-500 bg-[#1a1a2e]">
            <div>
              <h3 className="font-bold">Teaching Assistant (Mathematics Dept)</h3>
              <p className="text-xs text-slate-400">Carleton University | Jan 2024 - Present</p>
              <p className="text-sm text-slate-300 mt-2">Facilitating learning for undergrads in complex quantitative concepts. Grading exams with high attention to detail.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 border-l-2 border-blue-500 bg-[#1a1a2e]">
            <div>
              <h3 className="font-bold">Math Tutor / Instructor</h3>
              <p className="text-xs text-slate-400">Mathnasium & Varsity Tutors | Apr 2024 - Present</p>
              <p className="text-sm text-slate-300 mt-2">Adapting teaching methods for individual learning styles. Specializing in simplifying abstract theories in Math and Physics.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-[#050510] text-center border-t border-slate-900">
        <p className="text-slate-500">© 2025 TutorMathPhys. AI-Enhanced Education.</p>
      </footer>
    </div>
  )
}