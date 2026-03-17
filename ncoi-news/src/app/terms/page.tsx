export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans pb-12">
      <header className="bg-blue-900 text-white p-6 shadow-md text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest"><a href="/">NCOI News</a></h1>
      </header>
      <main className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-sm rounded-lg border border-gray-200 text-gray-700">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 uppercase border-b-2 border-red-600 pb-2">Terms of Service</h2>
        <p className="mb-4">By accessing NCOI News, you agree to abide by these Terms of Service.</p>
        <p className="mb-4"><strong>1. Content Usage:</strong> The news and articles published here are for informational purposes. You may share our content provided you credit NCOI News and link back to the original article.</p>
        <p className="mb-4"><strong>2. User Conduct:</strong> We encourage open discussion in our comment sections. However, hate speech, direct threats of violence, or state-sponsored disinformation will be immediately deleted, and the offending user will be banned.</p>
        <p><strong>3. Disclaimer:</strong> Opinions expressed by individual writers or commenters do not necessarily reflect the official stance of the NCOI organization.</p>
      </main>
    </div>
  );
}