'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  // News & Articles State
  const [breakingNews, setBreakingNews] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  
  // User State
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchBreakingNews();
    fetchArticles();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(data);
    }
  };

  const fetchBreakingNews = async () => {
    const { data } = await supabase.from('breaking_news').select('*').order('created_at', { ascending: false }).limit(10);
    if (data) setBreakingNews(data);
  };

  const fetchArticles = async () => {
    // We will fetch real articles here soon!
    const { data } = await supabase.from('articles').select('*').eq('status', 'published').order('created_at', { ascending: false }).limit(5);
    if (data) setArticles(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans">
      
      {/* SMART HEADER */}
      <header className="bg-blue-900 text-white p-6 shadow-md flex justify-between items-center relative z-50">
        <div>
          <h1 className="text-4xl font-bold tracking-widest uppercase"><a href="/">NCOI News</a></h1>
          <p className="text-sm mt-1 text-blue-200">National Cooperation Ottawa Iran</p>
        </div>
        
        {/* IF LOGGED IN: Show Profile Menu | IF LOGGED OUT: Show Staff Portal Button */}
        {user && profile ? (
          <div className="relative group cursor-pointer pb-2 pt-2">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm">{profile.full_name || user.email}</span>
              <span className="text-xs bg-slate-700 px-3 py-1 rounded text-green-400 font-bold uppercase border border-green-500">{profile.role}</span>
            </div>
            <div className="absolute right-0 top-full w-48 bg-white text-black rounded shadow-xl hidden group-hover:block border border-gray-200 overflow-hidden">
               <a href="/dashboard" className="block px-4 py-3 text-sm hover:bg-gray-100 border-b font-bold text-blue-900">🎛️ Control Room</a>
               <button onClick={() => { supabase.auth.signOut(); window.location.reload(); }} className="w-full text-left px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50">
                 Log Out
               </button>
            </div>
          </div>
        ) : (
          <a href="/login" className="bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-gray-200 text-sm uppercase">
            Staff Portal
          </a>
        )}
      </header>

      <main className="max-w-7xl mx-auto mt-6 p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* LEFT SIDEBAR: Real Breaking News */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold border-b-4 border-red-600 pb-2 mb-4 text-red-600 uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span> Live News
          </h2>
          <div className="space-y-6">
            {breakingNews.map((news) => (
              <div key={news.id} className="text-sm border-l-2 border-red-200 pl-2">
                <strong className="text-red-600">
                  {new Date(news.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </strong>
                <p className="mt-1 text-gray-800 font-medium">{news.text_content}</p>
                {news.image_url && <img src={news.image_url} alt="News" className="mt-2 rounded shadow-sm w-full object-cover max-h-32" />}
                
                {/* IF THIS NEWS HAS A FULL ARTICLE LINKED, SHOW A READ MORE BUTTON */}
                {news.linked_article_id && (
                  <a href={`/article/${news.linked_article_id}`} className="inline-block mt-2 text-blue-600 font-bold text-xs hover:underline">
                    Read Full Article &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE: Featured Articles & Live Video */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
          <h2 className="text-2xl font-bold border-b-2 border-blue-900 pb-2 mb-4">Live Broadcast</h2>
          <div className="aspect-video w-full mb-6 rounded bg-black">
            <iframe width="100%" height="100%" src="https://www.youtube.com/@NationalCooperationOttawa" title="Live" frameBorder="0" allowFullScreen></iframe>
          </div>
          
          <h2 className="text-2xl font-bold border-b-2 border-blue-900 pb-2 mb-4 mt-8">Latest Reports</h2>
          <div className="space-y-6">
            {articles.length === 0 ? (
              <p className="text-gray-700 italic">No full articles published yet.</p>
            ) : (
              articles.map((article) => (
                <div key={article.id} className="border-b pb-4">
                  {article.main_image_url && <img src={article.main_image_url} className="w-full h-48 object-cover rounded mb-3" alt="Article Cover" />}
                  <a href={`/article/${article.id}`} className="text-2xl font-bold text-blue-900 hover:underline">{article.title}</a>
                  <p className="text-xs text-gray-500 mt-1 uppercase font-bold">Updated: {new Date(article.updated_at).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR: Telegram Feed */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold border-b-4 border-blue-400 pb-2 mb-4 text-blue-600 uppercase">Telegram Live</h2>
          <div className="h-[600px] w-full rounded bg-gray-50">
            <iframe src="https://t.me/s/NCOI_Updates?embed=1" width="100%" height="100%" frameBorder="0"></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}