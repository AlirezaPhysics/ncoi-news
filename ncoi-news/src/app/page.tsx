export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans">
      
      {/* HEADER / LOGO AREA */}
      <header className="bg-blue-900 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-widest uppercase">NCOI News</h1>
          <p className="text-sm mt-1 text-blue-200">National Cooperation Ottawa Iran</p>
        </div>
      </header>

      {/* MAIN 3-COLUMN LAYOUT */}
      <main className="max-w-7xl mx-auto mt-6 p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* LEFT SIDEBAR: Breaking News */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold border-b-4 border-red-600 pb-2 mb-4 text-red-600 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            Live News
          </h2>
          <div className="space-y-4">
            <p className="text-sm border-l-2 border-red-200 pl-2"><strong>10:45 AM</strong> - This text will soon be linked to a database so your team can update it instantly.</p>
            <p className="text-sm border-l-2 border-red-200 pl-2"><strong>09:30 AM</strong> - Another quick update for the diaspora...</p>
          </div>
        </div>

        {/* MIDDLE: Featured Articles & Live Video */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
          <h2 className="text-2xl font-bold border-b-2 border-blue-900 pb-2 mb-4">Live Broadcast</h2>
          
          {/* REAL YOUTUBE EMBED */}
          <div className="aspect-video w-full mb-6 rounded shadow-lg overflow-hidden bg-black">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig" 
              title="YouTube Live Stream" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">Advocating for Change: New Statements Released</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            This is where your main articles, opinions, and detailed reports will live. Soon, your two writers will be able to log in and publish stories that automatically appear right here...
          </p>
          <button className="text-blue-600 font-bold hover:underline">Read full report &rarr;</button>
        </div>

        {/* RIGHT SIDEBAR: Real Telegram Feed */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold border-b-4 border-blue-400 pb-2 mb-4 text-blue-600 uppercase tracking-wide">
            Telegram Live
          </h2>
          
          {/* REAL TELEGRAM EMBED */}
          <div className="h-[600px] w-full rounded border border-gray-200 overflow-hidden bg-gray-50">
            <iframe 
              src="https://t.me/s/iranintl?embed=1" 
              width="100%" 
              height="100%" 
              frameBorder="0">
            </iframe>
          </div>
        </div>

      </main>
    </div>
  );
}