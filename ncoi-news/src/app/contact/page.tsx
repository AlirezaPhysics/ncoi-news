export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans">
      <header className="bg-blue-900 text-white p-6 shadow-md text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest"><a href="/">NCOI News</a></h1>
      </header>
      <main className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-sm rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-blue-900 mb-6 uppercase border-b-4 border-red-600 pb-2 inline-block">Contact Us</h2>
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>We welcome secure tips, inquiries from the press, and messages from our readers around the world.</p>
          <div className="bg-blue-50 p-6 rounded border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2 uppercase">Secure Email</h3>
            <p>For all general inquiries and news tips, please email us at:<br/>
            <a href="mailto:contact@ncoinews.com" className="text-red-600 font-bold hover:underline">contact@ncoinews.com</a></p>
          </div>
          <div className="bg-gray-50 p-6 rounded border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2 uppercase">Join Our Team</h3>
            <p>If you are a journalist or activist looking to volunteer, please visit our <a href="/login" className="text-blue-600 font-bold hover:underline">Staff Portal</a> to apply.</p>
          </div>
        </div>
      </main>
    </div>
  );
}