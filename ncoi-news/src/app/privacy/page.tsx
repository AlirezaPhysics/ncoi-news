export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans pb-12">
      <header className="bg-blue-900 text-white p-6 shadow-md text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest"><a href="/">NCOI News</a></h1>
      </header>
      <main className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-sm rounded-lg border border-gray-200 text-gray-700">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 uppercase border-b-2 border-red-600 pb-2">Privacy Policy</h2>
        <p className="mb-4"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        <p className="mb-4">NCOI takes the privacy and security of our readers and contributors extremely seriously. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
        <p className="mb-4">When you register for a staff account or leave a comment, we collect your email address and display name. This data is secured using industry-standard encryption via Supabase.</p>
        <p>If you are accessing this site from within a restricted region, we highly recommend utilizing a secure VPN for your safety.</p>
      </main>
    </div>
  );
}