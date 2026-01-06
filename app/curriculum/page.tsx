'use client'
import Link from 'next/link'

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg group-hover:scale-110 transition"></div>
          <span className="text-xl font-bold tracking-widest text-white uppercase">TutorMathPhys.AI</span>
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="/curriculum" className="text-white font-bold transition">Curriculum</Link>
          <Link href="/credentials" className="hover:text-white transition">Credentials</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
        </div>

        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition">
          Book Session
        </Link>
      </nav>

      {/* HEADER */}
      <div className="text-center pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-5xl font-extrabold mb-6">Curriculum & <span className="text-blue-400">Engineering</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Master the tools of Applied Physics and Building Engineering.
        </p>
      </div>

      {/* LEVEL 1: UNIVERSITY */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-sm font-mono border border-blue-500/50">University Level</span>
          <h2 className="text-3xl font-bold">Physics, Math & Engineering</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Math & Engineering */}
          <div className="bg-[#11113a] border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-200">📐 Math & Engineering</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">Engineering Calculus:</span>
                <span>Differentiation, Integration, Vector Calculus.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">Electronics:</span>
                <span>Circuit Theory (ELEC 2501), Op-Amps, Digital Logic.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">Thermodynamics:</span>
                <span>Heat Transfer, HVAC systems, Energy Modeling (IESVE).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">Data Analysis:</span>
                <span>Statistics, Data cleaning, Linear Regressions.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Applied Physics */}
          <div className="bg-[#11113a] border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-200">⚛️ Applied Physics</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold">Mechanics:</span>
                <span>Newtonian Physics, Dynamics, Rotational Motion.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold">Modern Physics:</span>
                <span>Wave Motion, Quantum Mechanics, Optics.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold">Fluid Dynamics:</span>
                <span>Pressure, Flow, Bernoullis Principle.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LEVEL 2: K-12 */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded text-sm font-mono border border-green-500/50">Level: K-12</span>
          <h2 className="text-3xl font-bold">School Support</h2>
        </div>
        
        <div className="p-8 bg-[#1a1a45] rounded-3xl border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-2">Complete Grades 4-12 Support</h3>
            <p className="text-slate-300">We specialize in building the mathematical foundation required for future Engineering and Science degrees.</p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-black/20 rounded-xl text-slate-200">• Functions & Advanced Functions</div>
                <div className="p-4 bg-black/20 rounded-xl text-slate-200">• Physics 11 & 12</div>
                <div className="p-4 bg-black/20 rounded-xl text-slate-200">• Calculus & Vectors</div>
            </div>
        </div>
      </section>

      <footer className="py-12 bg-[#050510] text-center border-t border-slate-900">
        <p className="text-slate-500">© 2025 TutorMathPhys. AI-Enhanced Education.</p>
      </footer>
    </div>
  )
}