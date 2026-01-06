'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* 1. NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg group-hover:scale-110 transition"></div>
          <span className="text-xl font-bold tracking-widest text-white uppercase">TutorMathPhys.AI</span>
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="/curriculum" className="hover:text-white transition">Curriculum</Link>
          <Link href="/credentials" className="hover:text-white transition">Credentials</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
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
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/20 text-blue-300 font-medium text-sm">
              ✨ 300+ Hours of Teaching Experience
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              Master Physics & <br />
              <span className="bg-[#3b82f6] text-white px-2 decoration-clone">All Level Math</span> <br />
              with Experts.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-md">
              From 4th Grade foundations to 3rd Year University Mathematics/Physics. Learn from a former <strong>Mathnasium Instructor</strong> and <strong>Carleton University Teaching Assistant</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login" className="px-8 py-4 text-lg font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition text-center">
                Find a Tutor Now &rarr;
              </Link>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="text-green-400 font-bold text-xl">✓</span>
                <span className="text-sm font-medium">B.Sc. Honours Specialist</span>
              </div>
            </div>
          </div>

          {/* Right Stats Visualization */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-700 bg-[#12123a]/80 backdrop-blur-xl p-8 shadow-2xl rotate-2 hover:rotate-0 transition duration-700">
               <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-[#1a1a45] rounded-xl border border-blue-500/20">
                    <div className="text-4xl font-bold text-white mb-1">300+</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Tutoring Hours</div>
                  </div>
                  <div className="text-center p-4 bg-[#1a1a45] rounded-xl border border-purple-500/20">
                    <div className="text-4xl font-bold text-white mb-1">10+</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Students Mentored</div>
                  </div>
                  <div className="col-span-2 text-center p-4 bg-[#1a1a45] rounded-xl border border-green-500/20">
                    <div className="text-3xl font-bold text-white mb-1">9.63</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Honours GPA (12.0 Scale)</div>
                  </div>
               </div>
               
               <div className="mt-6 flex items-center justify-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                 <p className="text-green-400 font-mono text-sm">Accepting New Students</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EXPERIENCE & CREDIBILITY GRID */}
      <section className="bg-[#0c0c24] py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            Proven teaching <span className="text-blue-400">results.</span>
          </h2>
          <p className="text-center text-slate-400 max-w-2xl mx-auto mb-20">
            Professional experience teaching everyone from Grade 4 beginners to University Engineering students.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto] gap-6">
            
            {/* Experience Card 1 */}
            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400 transition shadow-lg shadow-blue-900/20">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-bold text-white mb-2">Mathnasium Instructor</h3>
              <p className="text-slate-300 text-sm">
                Over a year of professional experience at Mathnasium & Varsity Tutors. Specialized in adapting teaching styles to individual learning needs.
              </p>
            </div>

            {/* Main Center Feature */}
            <div className="md:row-span-2 md:h-full min-h-[400px] bg-[#1a1a40] rounded-3xl border border-blue-500/30 overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a2a] via-transparent to-transparent z-10"></div>
               <div className="absolute inset-4 bg-slate-800/50 rounded-xl border border-white/10 opacity-100 flex flex-col items-center justify-center text-center p-6">
                  <div className="text-6xl mb-6">🏆</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Award-Winning Physicist</h3>
                  <p className="text-blue-200">
                    Winner of the CAP University Prize Exam (Top Physics Student).
                  </p>
               </div>
               <div className="absolute bottom-8 left-8 right-8 z-20">
                 <p className="text-sm font-mono text-blue-300">
                   "Dean's Honour List 2020-2021"
                 </p>
               </div>
            </div>

            {/* Experience Card 2 */}
            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400 transition shadow-lg shadow-blue-900/20">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-white mb-2">University T.A.</h3>
              <p className="text-slate-300 text-sm">
                Current Teaching Assistant at Carleton University. I grade exams and facilitate learning for undergrad math courses.
              </p>
            </div>

            {/* Experience Card 3 */}
            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400 transition shadow-lg shadow-blue-900/20">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Physics, Math & Engineering</h3>
              <p className="text-slate-300 text-sm">
                4th Year Honours Standing. Mastering Complex Calculus, Linear Algebra, and Quantum Mechanics.
              </p>
            </div>

            {/* Small Action Card */}
            <div className="bg-[#1a1a40] rounded-3xl border border-blue-500/30 overflow-hidden relative min-h-[200px] flex flex-col items-center justify-center p-6 text-center hover:bg-[#202050] transition cursor-pointer">
                <Link href="/credentials" className="absolute inset-0 z-10"></Link>
                <p className="font-bold text-lg mb-2 text-white">View Full Credentials</p>
                <p className="text-blue-400 text-sm">See Transcripts & Awards &rarr;</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CURRICULUM SUBJECTS */}
      <section className="py-24 bg-[#0a0a2a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#11113a] rounded-3xl border border-blue-900/50 p-1 md:p-2 overflow-hidden">
            <div className="grid grid-cols-2 p-6 border-b border-blue-900/50 bg-[#161648]">
               <div className="text-slate-400 font-bold">Subject</div>
               <div className="text-white font-bold">Expertise</div>
            </div>
            
            <div className="grid grid-cols-2 p-6 border-b border-blue-900/30 hover:bg-[#1a1a4a] transition">
              <div className="text-blue-200 font-bold">Math (Uni)</div>
              <div className="text-slate-300">Calculus I-III, Linear Algebra, Diff Eq, Statistics</div>
            </div>

            <div className="grid grid-cols-2 p-6 border-b border-blue-900/30 hover:bg-[#1a1a4a] transition">
              <div className="text-purple-200 font-bold">Physics (Uni)</div>
              <div className="text-slate-300">Mechanics, Modern Physics, Thermodynamics</div>
            </div>

            <div className="grid grid-cols-2 p-6 border-b border-blue-900/30 hover:bg-[#1a1a4a] transition">
              <div className="text-green-200 font-bold">Grade 4-12</div>
              <div className="text-slate-300">Foundations, Pre-Calculus, Functions, Homework Help</div>
            </div>

            <div className="p-8 text-center bg-[#1a1a45]">
               <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition w-full md:w-auto inline-block">
                 Book a Free Consultation
               </Link>
            </div>
          </div>
        </div>
      </section>
      {/* SAMPLE TEACHING SESSIONS */}
      <section className="bg-[#05051e] py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">See how we <span className="text-purple-400">Teach.</span></h2>
          <p className="text-slate-400 mb-16 max-w-xl mx-auto">Watch real examples of how we break down complex problems in University Physics and Elementary Math.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Video 1 */}
            <div className="bg-[#1a1a40] p-4 rounded-3xl border border-white/10 hover:border-purple-500/50 transition">
                <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group">
                    {/* Replace 'YOUR_VIDEO_ID' below with a real YouTube ID when you have it */}
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE" title="Calculus Sample" allowFullScreen></iframe>
                </div>
                <h3 className="text-left text-xl font-bold mt-4 text-white">Calculus II: Multivariable Integrals</h3>
                <p className="text-left text-sm text-slate-400">University Level Walkthrough</p>
            </div>

            {/* Video 2 */}
            <div className="bg-[#1a1a40] p-4 rounded-3xl border border-white/10 hover:border-green-500/50 transition">
                <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE" title="Grade 6 Math Sample" allowFullScreen></iframe>
                </div>
                <h3 className="text-left text-xl font-bold mt-4 text-white">Grade 6: Solving Word Problems</h3>
                <p className="text-left text-sm text-slate-400">Elementary Foundation Strategy</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-20 bg-[#050510] text-center border-t border-slate-900">
        <h2 className="text-4xl font-bold mb-8 text-white">Your personalized <br/>Physics & Math Tutor.</h2>
        <div className="text-slate-600 text-sm">
          © 2025 TutorMathPhys. Built with expertise.
        </div>
      </footer>
    </div>
  )
}