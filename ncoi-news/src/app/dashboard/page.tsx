'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [breakingText, setBreakingText] = useState('');
  const [breakingImage, setBreakingImage] = useState<File | null>(null);
  const [isPublishingNews, setIsPublishingNews] = useState(false);
  const [newsList, setNewsList] = useState<any[]>([]);

  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleImage, setArticleImage] = useState<File | null>(null);
  const [isPublishingArticle, setIsPublishingArticle] = useState(false);
  const [upgradingNewsId, setUpgradingNewsId] = useState<number | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [articlesList, setArticlesList] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);

  useEffect(() => { checkUser(); fetchNewsList(); fetchArticlesList(); }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = '/login'; return; }
    
    setUserId(user.id);
    const { data: profile } = await supabase.from('profiles').select('role, full_name, email').eq('id', user.id).single();
    setRole(profile?.role); setFullName(profile?.full_name || user.email);
    if (profile?.role === 'admin') fetchPendingUsers();
    setLoading(false);
  };

  const fetchNewsList = async () => { const { data } = await supabase.from('breaking_news').select('*').order('created_at', { ascending: false }); if (data) setNewsList(data); };
  const fetchArticlesList = async () => { const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false }); if (data) setArticlesList(data); };
  const fetchPendingUsers = async () => { const { data } = await supabase.from('profiles').select('*').eq('role', 'pending'); if (data) setPendingUsers(data); };

  // --- SECURITY CHECK FUNCTION ---
  // Returns true if the user is Admin, OR if they are the author AND it's under 24 hours old
  const canEditOrDelete = (itemAuthorId: string, createdAt: string) => {
    if (role === 'admin') return true;
    if (role === 'writer' && itemAuthorId === userId) {
      const hoursOld = Math.abs(new Date().getTime() - new Date(createdAt).getTime()) / 36e5;
      return hoursOld <= 24; // Only true if less than or equal to 24 hours
    }
    return false;
  };

  const handleUpdateRole = async (targetUserId: string, newRole: string) => {
    if (!window.confirm(`Are you sure?`)) return;
    await supabase.from('profiles').update({ role: newRole }).eq('id', targetUserId);
    fetchPendingUsers(); alert(`User updated!`);
  };

  const handlePostBreakingNews = async (e: React.FormEvent) => {
    e.preventDefault(); setIsPublishingNews(true);
    let imageUrl = null;
    if (breakingImage) {
      const fileName = `${Math.random()}.${breakingImage.name.split('.').pop()}`;
      await supabase.storage.from('news-media').upload(`breaking-news/${fileName}`, breakingImage);
      imageUrl = supabase.storage.from('news-media').getPublicUrl(`breaking-news/${fileName}`).data.publicUrl;
    }
    await supabase.from('breaking_news').insert([{ text_content: breakingText, author_id: userId, image_url: imageUrl }]);
    setBreakingText(''); setBreakingImage(null); fetchNewsList(); setIsPublishingNews(false);
  };

  const submitArticle = async (status: string) => {
    if (!articleTitle || !articleContent) return alert("Headline and Content required!");
    if (!articleImage && !editingArticleId) return alert("Main Picture is MANDATORY!");
    setIsPublishingArticle(true);
    
    let imageUrl = null;
    if (articleImage) {
      const fileName = `${Math.random()}.${articleImage.name.split('.').pop()}`;
      await supabase.storage.from('news-media').upload(`articles/${fileName}`, articleImage);
      imageUrl = supabase.storage.from('news-media').getPublicUrl(`articles/${fileName}`).data.publicUrl;
    }
    
    let newArticleId = editingArticleId;
    if (editingArticleId) {
      const updateData: any = { title: articleTitle, content: articleContent, status: status, updated_at: new Date() };
      if (imageUrl) updateData.main_image_url = imageUrl;
      await supabase.from('articles').update(updateData).eq('id', editingArticleId);
    } else {
      const { data: newArticle } = await supabase.from('articles').insert([{ title: articleTitle, content: articleContent, main_image_url: imageUrl, author_id: userId, status: status }]).select().single();
      if (newArticle) newArticleId = newArticle.id;
    }
    if (newArticleId && upgradingNewsId) await supabase.from('breaking_news').update({ linked_article_id: newArticleId }).eq('id', upgradingNewsId);
    
    alert(`Article saved as ${status.toUpperCase()}!`);
    setArticleTitle(''); setArticleContent(''); setArticleImage(null); setUpgradingNewsId(null); setEditingArticleId(null); fetchNewsList(); fetchArticlesList();
    setIsPublishingArticle(false);
  };

  const handleDeleteNews = async (id: number) => { if (window.confirm("Delete this?")) { await supabase.from('breaking_news').delete().eq('id', id); fetchNewsList(); }};
  const handleDeleteArticle = async (id: number) => { if (window.confirm("Delete this?")) { await supabase.from('articles').delete().eq('id', id); fetchArticlesList(); }};

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-black pb-20">
      <header className="bg-slate-900 text-white p-4 flex justify-between items-center border-b-4 border-red-600 relative z-50">
        <h1 className="text-xl font-bold uppercase"><a href="/">NCOI Control Room</a></h1>
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="font-bold text-sm">{fullName}</span>
          <span className="text-xs bg-slate-700 px-3 py-1 rounded text-green-400 font-bold uppercase">{role}</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Editor & Admin Panel */}
        <div className="space-y-8">
          
          <div className={`bg-white p-6 rounded-lg shadow-sm border-2 ${upgradingNewsId || editingArticleId ? 'border-green-500 shadow-green-100' : 'border-blue-900'}`}>
            <h2 className="text-2xl font-bold text-blue-900 mb-2 uppercase">{editingArticleId ? '📝 Editing Article' : upgradingNewsId ? '⭐ Upgrading Wire to Article' : 'Write Feature Article'}</h2>
            <div className="space-y-4 mt-4">
              <input type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} placeholder="Headline Title" className="w-full border border-gray-300 rounded p-2 font-bold text-lg" />
              <textarea value={articleContent} onChange={(e) => setArticleContent(e.target.value)} className="w-full border border-gray-300 rounded p-3 h-64" placeholder="Full Story Content..." />
              <div className="border border-dashed border-gray-400 p-4 rounded bg-gray-50">
                <label className="block text-sm font-bold text-red-600 mb-2 uppercase">{editingArticleId ? 'Replace Picture' : 'Attach Main Picture'}</label>
                <input type="file" accept="image/*" onChange={(e) => setArticleImage(e.target.files ? e.target.files[0] : null)} className="text-sm" />
              </div>
              <div className="flex gap-4 pt-2">
                <button disabled={isPublishingArticle} type="button" onClick={() => submitArticle('draft')} className="flex-1 bg-yellow-500 text-white font-bold py-3 px-4 rounded hover:bg-yellow-600 uppercase text-sm">Save Draft</button>
                <button disabled={isPublishingArticle} type="button" onClick={() => submitArticle('published')} className="flex-1 bg-blue-900 text-white font-bold py-3 px-4 rounded hover:bg-blue-800 uppercase text-sm">Publish Live</button>
              </div>
              {(upgradingNewsId || editingArticleId) && <button type="button" onClick={() => {setArticleTitle(''); setArticleContent(''); setArticleImage(null); setUpgradingNewsId(null); setEditingArticleId(null);}} className="w-full mt-2 bg-gray-300 text-black font-bold py-2 rounded hover:bg-gray-400 uppercase text-sm">Cancel Editing</button>}
            </div>
          </div>

          {role === 'admin' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-900">
              <h2 className="text-xl font-bold text-purple-900 mb-4 uppercase flex items-center gap-2">👑 Staff Approvals</h2>
              {pendingUsers.length === 0 ? <p className="text-sm text-gray-500">No pending volunteer requests right now.</p> : (
                <div className="space-y-3">
                  {pendingUsers.map(user => (
                    <div key={user.id} className="p-3 border border-purple-100 bg-purple-50 rounded flex justify-between items-center">
                      <span className="font-bold text-sm text-purple-900">{user.email}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdateRole(user.id, 'writer')} className="bg-green-600 text-white font-bold text-xs px-3 py-1 rounded hover:bg-green-700 uppercase">Approve</button>
                        <button onClick={() => handleUpdateRole(user.id, 'rejected')} className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded hover:bg-red-700 uppercase">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Breaking News & Management */}
        <div className="space-y-8">
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-red-600 mb-4 uppercase"><span className="w-3 h-3 bg-red-600 rounded-full animate-pulse inline-block mr-2"></span> Fast Wire Update</h2>
            <form onSubmit={handlePostBreakingNews} className="space-y-4">
              <textarea value={breakingText} onChange={(e) => setBreakingText(e.target.value)} className="w-full border border-gray-300 rounded p-3" rows={2} placeholder="Type a quick update..." required />
              <input type="file" accept="image/*" onChange={(e) => setBreakingImage(e.target.files ? e.target.files[0] : null)} className="text-sm block w-full border border-dashed p-2 bg-gray-50" />
              <button disabled={isPublishingNews} type="submit" className="w-full bg-red-600 text-white font-bold py-2 px-6 rounded hover:bg-red-700 uppercase">Send to Left Sidebar</button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b pb-2">Manage Articles & Drafts</h2>
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
              {articlesList.map((art) => (
                <div key={art.id} className="p-3 border border-gray-100 bg-gray-50 rounded flex justify-between items-center">
                  <div className="truncate pr-4 flex items-center">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded mr-2 uppercase ${art.status === 'draft' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{art.status}</span>
                    <span className="font-bold text-sm text-blue-900 truncate w-32">{art.title}</span>
                  </div>
                  <div className="flex gap-2">
                    {/* SECURITY CHECK BEFORE SHOWING BUTTONS */}
                    {canEditOrDelete(art.author_id, art.created_at) ? (
                      <>
                        <button onClick={() => {setEditingArticleId(art.id); setArticleTitle(art.title); setArticleContent(art.content); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="bg-blue-100 text-blue-800 font-bold text-xs px-3 py-1 rounded hover:bg-blue-200 uppercase">Edit</button>
                        <button onClick={() => handleDeleteArticle(art.id)} className="text-red-500 hover:text-red-700 font-bold text-xs">Delete</button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Locked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase border-b pb-2">Manage Live News</h2>
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
              {newsList.map((news) => (
                <div key={news.id} className="p-3 border border-gray-100 bg-gray-50 rounded">
                  <div className="font-medium text-sm mb-3">{news.text_content}</div>
                  <div className="flex gap-2">
                    {canEditOrDelete(news.author_id, news.created_at) ? (
                      <>
                        {!news.linked_article_id ? (
                          <button onClick={() => { setUpgradingNewsId(news.id); setArticleTitle(news.text_content); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-green-600 text-white font-bold text-xs px-3 py-1 rounded hover:bg-green-700 uppercase">⭐ Write Article</button>
                        ) : <span className="bg-blue-100 text-blue-800 font-bold text-xs px-3 py-1 rounded border border-blue-200">✓ Linked</span>}
                        <button onClick={() => handleDeleteNews(news.id)} className="text-red-500 hover:text-red-700 font-bold text-xs ml-2">Delete</button>
                      </>
                    ) : (
                       <span className="text-xs text-gray-400 italic">Locked (Over 24h old)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}