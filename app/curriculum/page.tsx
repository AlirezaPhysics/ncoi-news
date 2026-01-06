'use client'
import Link from 'next/link'

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
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
      <div className="text-center pt-20 pb-12 px-6">
        <h1 className="text-5xl font-extrabold mb-4">Complete <span className="text-blue-400">Mathematics</span> Focus</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Specializing in the transition from elementary foundations to complex University Analysis.
        </p>
      </div>

      {/* ROW 1: PURE MATHEMATICS (The Priority) */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* LEFT: University Math */}
          <div className="bg-[#11113a] border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600/20 text-blue-200 px-4 py-1 rounded-bl-xl font-bold text-sm">UNIVERSITY LEVEL</div>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="text-4xl">🎓</span> Advanced Mathematics
            </h2>
            <div className="space-y-6">
              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="text-blue-200 font-bold text-lg">Calculus Stream (I, II, III)</h3>
                <p className="text-slate-400 text-sm mt-1">Limits, Derivatives, Integrals, Multivariable Calculus, Vector Fields (MATH 1004/2004).</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="text-blue-200 font-bold text-lg">Linear Algebra</h3>
                <p className="text-slate-400 text-sm mt-1">Matrix Theory, Eigenvalues/Eigenvectors, Vector Spaces, Transformations.</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="text-blue-200 font-bold text-lg">Differential Equations & Stats</h3>
                <p className="text-slate-400 text-sm mt-1">ODEs, System Modeling, Probability Theory, Hypothesis Testing.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Grade 4-12 Math */}
          <div className="bg-[#161640] border border-green-500/30 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-600/20 text-green-200 px-4 py-1 rounded-bl-xl font-bold text-sm">GRADES 4-12</div>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="text-4xl">🏫</span> Foundational Math
            </h2>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Elementary */}
              <div>
                <h3 className="text-green-400 font-bold border-b border-white/10 pb-2 mb-2">Grades 4-8</h3>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li>• Arithmetic Mastery</li>
                  <li>• Fractions, % & Decimals</li>
                  <li>• Pre-Algebra Logic</li>
                  <li>• Word Problem Solving</li>
                </ul>
              </div>

              {/* Grades 9-10 */}
              <div>
                <h3 className="text-green-400 font-bold border-b border-white/10 pb-2 mb-2">Grades 9-10</h3>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li>• Analytic Geometry</li>
                  <li>• Linear Systems</li>
                  <li>• Quadratics</li>
                  <li>• Trigonometry Basics</li>
                </ul>
              </div>

              {/* Grades 11-12 (University Prep) */}
              <div className="col-span-2 bg-black/20 p-4 rounded-xl">
                <h3 className="text-green-400 font-bold border-b border-white/10 pb-2 mb-2">Grade 11-12 (Uni Prep)</h3>
                <ul className="text-slate-300 text-sm space-y-2 grid grid-cols-2">
                  <li>• Advanced Functions (MHF4U)</li>
                  <li>• Calculus & Vectors (MCV4U)</li>
                  <li>• Data Management (MDM4U)</li>
                  <li>• Functions 11 (MCR3U)</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ROW 2: SCIENCE & ENGINEERING */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <h2 className="text-2xl font-bold text-slate-400 mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Applied Sciences</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Engineering */}
          <div className="bg-[#111122] border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">🏗️ Building Engineering</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Thermodynamics:</strong> Heat transfer, fluid flow & HVAC systems.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Energy Modeling:</strong> Simulation with IESVE, efficiency analysis.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Electronics:</strong> Circuit analysis (ELEC 2501), Digital Logic.</span>
              </li>
            </ul>
          </div>

          {/* Physics */}
          <div className="bg-[#111122] border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">⚛️ Physics (All Levels)</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span><strong>University Mechanics:</strong> Dynamics, Forces, Rotational Energy.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span><strong>Modern Physics:</strong> Quantum mechanics intro, Optics, Waves.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span><strong>High School Physics:</strong> Gr 11 (SPH3U) & Gr 12 (SPH4U) mastery.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#050510] text-center border-t border-slate-900">
        <Link href="/login" className="inline-block px-10 py-4 text-lg font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition">
           Get Started
        </Link>
        <div className="text-slate-600 text-sm mt-8">
          © 2025 TutorMathPhys. AI-Enhanced Education.
        </div>
      </footer>
    </div>
  )
}