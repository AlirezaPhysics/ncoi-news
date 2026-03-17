export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans">
      <header className="bg-blue-900 text-white p-6 shadow-md text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest"><a href="/">NCOI News</a></h1>
      </header>
      <main className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-sm rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-blue-900 mb-6 uppercase border-b-4 border-red-600 pb-2 inline-block">About Us</h2>
        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
          <p>The <strong>National Cooperation Ottawa Iran (NCOI)</strong> is a dedicated news and opinion platform focused on advocating for democracy, human rights, and systemic regime change in Iran.</p>
          <p>Our mission is to provide the Iranian diaspora and the global community with rapid, uncensored breaking news and deep-dive feature articles regarding the ongoing political climate.</p>
          <p>Led by a volunteer coalition of journalists, activists, and citizens, NCOI stands as a beacon of truth against state-sponsored censorship.</p>
        </div>
      </main>
    </div>
  );
}