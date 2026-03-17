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
        
        {/* LEFT SIDEBAR: Breaking News (Takes up 1 column) */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold border-b-4 border-red-600 pb-2 mb-4 text-red-600 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            Live News
          </h2>
          <div className="space-y-4">
            <p className="text-sm border-l-2 border-red-200 pl-2">10:45 AM - Breaking news text will go right here...</p>
            <p className="text-sm border-l-2 border-red-200 pl-2">09:30 AM - Another quick update for the diaspora...</p>
          </div>
        </div>

        {/* MIDDLE: Featured Articles & Video (Takes up 2 columns) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
          <h2 className="text-2xl font-bold border-b-2 border-blue-900 pb-2 mb-4">Featured Report</h2>
          
          {/* Placeholder for YouTube Video */}
          <div className="aspect-video bg-gray-800 flex items-center justify-center mb-6 rounded shadow-inner">
            <span className="text-gray-400 font-medium">[YouTube Live Stream Player Goes Here]</span>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">Advocating for Change: New Statements Released</h3>
          <p className="text-gray-700 leading-relaxed">
            This is where your main articles, opinions, and detailed reports will live. Your two writers will be able to publish stories that automatically appear in this central column...
          </p>
        </div>

        {/* RIGHT SIDEBAR: Telegram Feed (Takes up 1 column) */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold border-b-4 border-blue-400 pb-2 mb-4 text-blue-600 uppercase tracking-wide">
            Telegram Live
          </h2>
          <div className="bg-blue-50 h-96 rounded border border-blue-100 flex items-center justify-center p-4 text-center text-sm text-blue-800">
            [The live, updating Telegram widget will be embedded inside this box]
          </div>
        </div>

      </main>
    </div>
  );
}