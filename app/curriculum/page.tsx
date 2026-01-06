'use client'
import Link from 'next/link'

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* 1. NAVBAR - FIXED */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg group-hover:scale-110 transition"></div>
          <span className="text-xl font-bold tracking-widest text-white uppercase">TutorMathPhys.AI</span>
        </Link>
        
        {/* The Missing Middle Section */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="/curriculum" className="text-white font-bold transition">Curriculum</Link>
          <Link href="/credentials" className="hover:text-white transition">Credentials</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
        </div>

        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          Book Session
        </Link>
      </nav>

      {/* HEADER */}
      <div className="text-center pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-5xl font-extrabold mb-6">Complete <span className="text-blue-400">Curriculum</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          From establishing elementary foundations to mastering third-year University Physics. 
          Expert instruction based on an Honours Bachelor of Science curriculum.
        </p>
      </div>

      {/* LEVEL 1: UNIVERSITY & COLLEGE */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-sm font-mono border border-blue-500/50">Level: Advanced</span>
          <h2 className="text-3xl font-bold">University Math & Physics</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Math */}
          <div className="bg-[#11113a] border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-200">🧮 Advanced Mathematics</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">Calculus I, II & III:</span>
                <span>Limits, Derivatives, Integrals, Multivariable functions (MATH 1004/2004).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">Linear Algebra:</span>
                <span>Matrix Theory, Vector Spaces, Eigenvalues (MATH 1104/2107).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">Differential Equations:</span>
                <span>Ordinary differential equations (ODEs), solving systems.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">Statistics:</span>
                <span>Probability theory, Statistical inference (STAT 3502).</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Physics */}
          <div className="bg-[#11113a] border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-200">⚛️ Applied Physics</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold">Mechanics:</span>
                <span>Newtonian Physics, Motion, Energy, Rotational Dynamics (PHYS 1001).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold">Electromagnetism:</span>
                <span>Electric Circuits, Magnetic Fields, Electronics (ELEC 2501).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold">Modern Physics:</span>
                <span>Wave Motion, Optics, Quantum Mechanics fundamentals (PHYS 2202/2604).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold">Thermodynamics:</span>
                <span>Heat, Energy Transfer, Statistical mechanics.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LEVEL 2: K-12 SCHOOL */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded text-sm font-mono border border-green-500/50">Level: K-12</span>
          <h2 className="text-3xl font-bold">School (Grades 4-12)</h2>
        </div>

        <div className="bg-[#161648] rounded-3xl p-1 overflow-hidden">
          <div className="grid md:grid-cols-3 gap-1 bg-[#05051e]">
            <div className="bg-[#1a1a45] p-8 hover:bg-[#1f1f50] transition">
              <h3 className="text-xl font-bold text-green-400 mb-4">Grades 4-8</h3>
              <p className="text-slate-400 text-sm mb-4">Building unshakeable foundations.</p>
              <ul className="space-y-2 text-slate-200">
                <li>• Fractions & Decimals</li>
                <li>• Pre-Algebra Logic</li>
                <li>• Geometry Basics</li>
                <li>• Problem Solving Strategies</li>
              </ul>
            </div>

            <div className="bg-[#1a1a45] p-8 hover:bg-[#1f1f50] transition">
              <h3 className="text-xl font-bold text-green-400 mb-4">High School Math</h3>
              <p className="text-slate-400 text-sm mb-4">Preparation for University.</p>
              <ul className="space-y-2 text-slate-200">
                <li>• Functions & Relations</li>
                <li>• Calculus & Vectors</li>
                <li>• Advanced Algebra</li>
                <li>• Trigonometry</li>
              </ul>
            </div>

            <div className="bg-[#1a1a45] p-8 hover:bg-[#1f1f50] transition">
              <h3 className="text-xl font-bold text-green-400 mb-4">High School Physics</h3>
              <p className="text-slate-400 text-sm mb-4">Understanding the physical world.</p>
              <ul className="space-y-2 text-slate-200">
                <li>• Kinematics & Forces</li>
                <li>• Energy & Momentum</li>
                <li>• Waves & Sound</li>
                <li>• Electricity & Magnetism</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050510] text-center border-t border-slate-900">
        <h2 className="text-3xl font-bold mb-8 text-white">Ready to master the material?</h2>
        <Link href="/login" className="inline-block px-10 py-4 text-lg font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition">
           Get Started
        </Link>
        <div className="text-slate-600 text-sm mt-12">
          © 2025 TutorMathPhys. Built with expertise.
        </div>
      </footer>
    </div>
  )
}