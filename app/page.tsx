import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a2a] text-white overflow-x-hidden font-sans">
      
      {/* 1. NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          TUTORCODE.AI
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-blue-200">
          <Link href="#" className="hover:text-white transition">Curriculum</Link>
          <Link href="#" className="hover:text-white transition">For Schools</Link>
          <Link href="#" className="hover:text-white transition">About Us</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-bold text-white hover:text-blue-200">
            Log In
          </Link>
          <Link href="/login" className="px-5 py-2 text-sm font-bold bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition transform hover:scale-105">
            Try for free
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="max-w-6xl mx-auto px-6 pt-20 pb-32 text-center md:text-left md:flex items-center justify-between">
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            The world’s first <br />
            <span className="bg-indigo-600 px-2 text-white">superhuman</span> <br />
            Code & Math tutor.
          </h1>
          <p className="text-xl text-blue-200 leading-relaxed max-w-lg">
            Warm, patient, encouraging. Our tutors adapt to your child's ability, 
            teaching C++, Unity, and University Math through secure, live video sessions.
          </p>
          <Link href="/login" className="inline-block px-8 py-4 text-lg font-bold bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20">
            Find a Tutor Now &rarr;
          </Link>
          <div className="flex items-center gap-4 text-sm text-blue-300 pt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-black"></div>
              <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-black"></div>
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-black"></div>
            </div>
            <p>Join 1,000+ forward-thinking families.</p>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
          <div className="relative bg-slate-900 border border-slate-700 p-2 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500">
            {/* Placeholder for Video/Image */}
            <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center">
                 <button className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white font-bold flex items-center gap-2">
                   ▶ Play Demo
                 </button>
               </div>
               {/* This is where your hero image goes */}
               <div className="w-full h-full bg-gradient-to-tr from-indigo-900 to-slate-900"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. TESTIMONIALS (The Purple Cards) */}
      <section className="bg-[#0f0f35] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            A revolution in <span className="text-indigo-400">learning.</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-[#1a1a45] p-8 rounded-2xl border border-indigo-900 hover:border-indigo-500 transition">
              <p className="text-4xl text-indigo-400 mb-6">“</p>
              <p className="text-lg text-blue-100 mb-6">
                My son went from hating math to asking to do Algebra II. The tutors actually listen and care.
              </p>
              <div className="font-bold text-indigo-300">- Sarah's Mom</div>
            </div>

            {/* Review 2 (Large Image Card) */}
            <div className="md:row-span-2 bg-[#1a1a45] rounded-2xl overflow-hidden border border-indigo-900 relative min-h-[400px]">
               <div className="absolute inset-0 bg-indigo-900/50 flex items-end p-8">
                 <p className="text-white font-bold text-xl relative z-10">
                   "This is magical. TutorCode challenges him to think in new ways."
                 </p>
               </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#1a1a45] p-8 rounded-2xl border border-indigo-900 hover:border-indigo-500 transition">
              <p className="text-4xl text-indigo-400 mb-6">“</p>
              <p className="text-lg text-blue-100 mb-6">
                Unlike rote memorization, this actually teaches the logic behind the code. C++ finally clicks.
              </p>
              <div className="font-bold text-indigo-300">- Mark D.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURRICULUM SECTION */}
      <section className="py-24 bg-[#0a0a2a]">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-12">Master the foundations. <br/> Then go beyond.</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
            <div>
              <h3 className="text-indigo-400 font-bold mb-4 border-b border-indigo-800 pb-2">Math</h3>
              <ul className="space-y-2 text-blue-200">
                <li>Algebra & Calculus</li>
                <li>Statistics</li>
                <li>Geometry</li>
                <li>University Prep</li>
              </ul>
            </div>
            <div>
              <h3 className="text-pink-400 font-bold mb-4 border-b border-pink-800 pb-2">Coding</h3>
              <ul className="space-y-2 text-blue-200">
                <li>C++ / C#</li>
                <li>Unity Game Dev</li>
                <li>AI Algorithms</li>
                <li>Data Science</li>
              </ul>
            </div>
            <div>
              <h3 className="text-green-400 font-bold mb-4 border-b border-green-800 pb-2">Skills</h3>
              <ul className="space-y-2 text-blue-200">
                <li>Problem Solving</li>
                <li>Logic</li>
                <li>Creativity</li>
              </ul>
            </div>
            <div>
              <h3 className="text-yellow-400 font-bold mb-4 border-b border-yellow-800 pb-2">Levels</h3>
              <ul className="space-y-2 text-blue-200">
                <li>Beginner</li>
                <li>Intermediate</li>
                <li>Advanced</li>
                <li>Expert</li>
              </ul>
            </div>
          </div>

          <div className="mt-16">
             <Link href="/login" className="px-10 py-4 text-lg font-bold bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition">
                Start Learning Now &rarr;
             </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-indigo-900 py-10 bg-[#05051a] text-center text-indigo-400">
        <p>© 2025 TutorCode.AI. Built for the future of education.</p>
      </footer>
    </div>
  )
}