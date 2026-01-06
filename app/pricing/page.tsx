'use client'
import Link from 'next/link'

export default function PricingPage() {
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
          <Link href="/credentials" className="hover:text-white transition">Credentials</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-[#fbbf24] text-black rounded-full hover:bg-[#f59e0b] transition shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          Book Session
        </Link>
      </nav>

      {/* HEADER */}
      <div className="text-center pt-24 pb-16 px-6 relative overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Pricing.</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          No hidden fees. No contracts. Pay only when you book a session.
        </p>
      </div>

      {/* PRICING CARDS */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* OPTION 1: ONLINE */}
          <div className="bg-[#11113a] border border-blue-500/30 rounded-3xl p-8 relative flex flex-col hover:-translate-y-2 transition duration-300">
            <div className="mb-4">
                <span className="bg-blue-900/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Global Online</h3>
            <p className="text-slate-400 text-sm mb-6">Video calls via secure classroom.</p>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$35</span>
                <span className="text-slate-500">/ hour</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 text-slate-300 text-sm">
                <li className="flex gap-3"><span className="text-green-400">✓</span> High-Definition Video</li>
                <li className="flex gap-3"><span className="text-green-400">✓</span> Interactive Whiteboard</li>
                <li className="flex gap-3"><span className="text-green-400">✓</span> Recording Available</li>
                <li className="flex gap-3"><span className="text-green-400">✓</span> Pay-As-You-Go</li>
            </ul>
            <Link href="/login" className="w-full block text-center py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition shadow-lg shadow-blue-500/25">
                Book Online
            </Link>
          </div>

          {/* OPTION 2: IN PERSON */}
          <div className="bg-[#1a1a45] border-2 border-[#fbbf24] rounded-3xl p-8 relative flex flex-col transform md:-translate-y-4 shadow-[0_0_40px_rgba(251,191,36,0.15)]">
            <div className="absolute top-0 right-0 left-0 bg-[#fbbf24] text-black text-center text-xs font-bold py-1 uppercase rounded-t-xl">
                Premium Experience
            </div>
            <h3 className="text-2xl font-bold text-white mt-4 mb-2">In-Person (Ottawa)</h3>
            <p className="text-slate-400 text-sm mb-6">Nepean Centrepointe Library.</p>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#fbbf24]">$55</span>
                <span className="text-slate-500">/ hour</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 text-slate-300 text-sm">
                <li className="flex gap-3"><span className="text-[#fbbf24]">✓</span> Everything in Online</li>
                <li className="flex gap-3"><span className="text-[#fbbf24]">✓</span> Face-to-Face Guidance</li>
                <li className="flex gap-3"><span className="text-[#fbbf24]">✓</span> Hard-Copy Exam Review</li>
                <li className="flex gap-3"><span className="text-[#fbbf24]">✓</span> <span className="text-slate-400 text-xs mt-1">Requires Safety Consent*</span></li>
            </ul>
            <Link href="/login" className="w-full block text-center py-3 bg-[#fbbf24] text-black hover:bg-yellow-400 rounded-xl font-bold transition shadow-lg shadow-yellow-500/25">
                Book In-Person
            </Link>
          </div>

          {/* OPTION 3: SCHOOLS */}
          <div className="bg-[#11113a] border border-purple-500/30 rounded-3xl p-8 relative flex flex-col hover:-translate-y-2 transition duration-300">
            <div className="mb-4">
                <span className="bg-purple-900/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Organizations</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">School Bundles</h3>
            <p className="text-slate-400 text-sm mb-6">For bulk purchases & parents.</p>
            <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">Custom</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 text-slate-300 text-sm">
                <li className="flex gap-3"><span className="text-purple-400">✓</span> 20+ Hour Packages</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span> Priority Scheduling</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span> Progress Reports</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span> Dedicated Admin Support</li>
            </ul>
            <Link href="/contact" className="w-full block text-center py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition shadow-lg shadow-purple-500/25">
                Contact Sales
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        
        <div className="grid gap-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-lg mb-2">Is the In-Person location safe?</h4>
                <p className="text-slate-400">Yes. We strictly meet at the Nepean Centrepointe Library (Public Building). Parents are encouraged to attend or sit nearby.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-lg mb-2">How do payments work?</h4>
                <p className="text-slate-400">All payments are secured by Stripe. You pay per session when you book. Refunds are available for cancellations made 24h in advance.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-lg mb-2">Do you teach University courses?</h4>
                <p className="text-slate-400">Absolutely. We specialize in Calculus I-III, Linear Algebra, Differential Equations, and Physics degrees.</p>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#050510] text-center border-t border-slate-900">
        <div className="text-slate-600 text-sm">
          © 2025 TutorMathPhys. AI-Enhanced Education.
        </div>
      </footer>
    </div>
  )
}