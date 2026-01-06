'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05051e] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* 1. NAVBAR (Improved UX) */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg group-hover:scale-110 transition"></div>
          {/* BRIDGING THE GAP: Connecting the URL to the content */}
          <span className="text-xl font-bold tracking-widest text-white uppercase">
            TutorCode<span className="text-blue-400">AI</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="/curriculum" className="hover:text-white transition">Curriculum</Link>
          <Link href="/credentials" className="hover:text-white transition">Instructor Credentials</Link>
          <Link href="/login" className="hover:text-white transition">Student Portal</Link>
        </div>

        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition transform hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          Book First Lesson
        </Link>
      </nav>

      {/* 2. HERO SECTION (Fixing the Identity Crisis) */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-900/10 text-yellow-300 font-medium text-sm">
              ✨ The Personal Touch of an Expert.
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              Real Human <span className="text-blue-400">Expertise.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Powered by AI Speed.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-md">
              Don't struggle with robot chatbots. Learn <strong>University Calculus & Physics</strong> from a Master's Engineer who knows exactly how to help you ace your exam.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login" className="px-8 py-4 text-lg font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition text-center shadow-xl shadow-yellow-500/20">
                Book a Session Now &rarr;
              </Link>
              <div className="flex items-center gap-3 px-4 py-2">
                <span className="text-green-400 font-bold text-xl">✓</span>
                <span className="text-sm font-medium text-slate-300">Honours Specialist in Math/Phys</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: VIDEO TRUST SIGNAL (Action Item 3) */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-700 bg-[#12123a]/80 backdrop-blur-xl p-2 shadow-2xl rotate-2 hover:rotate-0 transition duration-700">
               {/* PLACEHOLDER FOR YOUR FUTURE PROBLEM-SOLVING VIDEO */}
               <div className="aspect-[9/16] bg-black rounded-2xl relative flex flex-col items-center justify-center text-center p-6 border border-white/10 w-[300px] mx-auto">
                  <div className="text-5xl mb-4">▶️</div>
                  <h3 className="text-white font-bold mb-2">Watch me solve a Calculus Integral</h3>
                  <p className="text-xs text-slate-400">See how I simplify complex math in under 60 seconds.</p>
                  <p className="text-xs text-yellow-500 mt-4">(Video Coming Soon)</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CREDIBILITY TRANSLATION (Fixing "Value over Features") */}
      <section className="bg-[#0c0c24] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why students choose us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400 transition">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-2">I Aced the Exams You're Dreading</h3>
              <p className="text-slate-300 text-sm">
                I don't just know the theory; I know the tests. I graduated with a <strong>9.63 GPA</strong> so I can teach you the exact shortcuts to solve problems fast.
              </p>
            </div>

            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-purple-500/30 hover:border-purple-400 transition">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Personal Mentorship</h3>
              <p className="text-slate-300 text-sm">
                Chatbots can't see where you are stuck. I watch your workflow and correct your logic in real-time using secure video.
              </p>
            </div>

            <div className="bg-[#1e1e48] p-8 rounded-3xl border border-green-500/30 hover:border-green-400 transition">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">From "F" to "A"</h3>
              <p className="text-slate-300 text-sm">
                Specialized in helping students who "hate math" break down mental barriers and actually enjoy solving problems.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FREE RESOURCES (Lead Magnet Strategy) */}
      <section className="py-24 bg-[#0a0a2a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-3xl border border-blue-500/30 p-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full uppercase">Free Resource</div>
              <h2 className="text-3xl font-bold text-white">Stuck on Integration?</h2>
              <p className="text-slate-300 max-w-md">
                Download my <strong>"Top 5 Calculus Mistakes"</strong> cheat sheet. It's free and might save your grade on the next quiz.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
                {/* For MVP this just goes to login, later you can connect a newsletter */}
                <Link href="/login" className="px-8 py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-slate-200 transition text-center">
                    Download Cheat Sheet
                </Link>
                <p className="text-xs text-slate-500 text-center">Available inside the Student Portal</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#050510] text-center border-t border-slate-900">
        <h2 className="text-3xl font-bold mb-8 text-white">Ready to boost your grades?</h2>
        <Link href="/login" className="inline-block px-10 py-4 text-lg font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition">
           Get Started Now
        </Link>
        <div className="text-slate-600 text-sm mt-12">
          © 2026 TutorCode.AI. Human Expertise, Digital Delivery.
        </div>
      </footer>
    </div>
  )
}