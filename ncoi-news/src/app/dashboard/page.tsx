'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>('');
  const [loading, setLoading] = useState(true);
  
  const [breakingText, setBreakingText] = useState('');
  const [breakingImage, setBreakingImage] = useState<File | null>(null);
  const [isPublishingNews, setIsPublishingNews] = useState(false);
  const [newsList, setNewsList] = useState<any[]>([]);

  // Feature Article States
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleImage, setArticleImage] = useState<File | null>(null);
  const [isPublishingArticle, setIsPublishingArticle] = useState(false);
  const [upgradingNewsId, setUpgradingNewsId] = useState<number | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [articlesList, setArticlesList] = useState<any[]>([]); // To hold drafts and published articles

  useEffect(() => { 
    checkUser(); 
    fetchNewsList();
    fetchArticlesList();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = '/login'; return; }
    const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).single();
    setRole(profile?.role); setFullName(profile?.full_name || user.email); setLoading(false);
  };

  const fetchNewsList = async () => {
    const { data } = await supabase.from('breaking_news').select('*').order('created_at', { ascending: false });
    if (data) setNewsList(data);
  };

  const fetchArticlesList = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) setArticlesList(data);
  };

  const handlePostBreakingNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishingNews(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    let imageUrl = null;
    if (breakingImage && user) {
      const fileName = `${Math.random()}.${breakingImage.name.split('.').pop()}`;
      await supabase.storage.from('news-media').upload(`breaking-news/${fileName}`, breakingImage);
      const { data } = supabase.storage.from('news-media').getPublicUrl(`breaking-news/${fileName}`);
      imageUrl = data.publicUrl;
    }
    if (user) {
      await supabase.from('breaking_news').insert([{ text_content: breakingText, author_id: user.id, image_url: imageUrl }]);
      setBreakingText(''); setBreakingImage(null); fetchNewsList();
    }
    setIsPublishingNews(false);
  };

  // NEW: Save Draft OR Publish Article
  const submitArticle = async (status: string) => {
    if (!articleTitle || !articleContent) return alert("Headline and Content are required!");
    if (!articleImage && !editingArticleId) return alert("A Main Picture is MANDATORY for new articles!");
    
    setIsPublishingArticle(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    let imageUrl = null;
    if (articleImage && user) {
      const fileName = `${Math.random()}.${articleImage.name.split('.').pop()}`;
      await supabase.storage.from('news-media').upload(`articles/${fileName}`, articleImage);
      const { data } = supabase.storage.from('news-media').getPublicUrl(`articles/${fileName}`);
      imageUrl = data.publicUrl;
    }

    if (user) {
      let newArticleId = editingArticleId;

      if (editingArticleId) {
        // UPDATE EXISTING DRAFT/ARTICLE
        const updateData: any = { title: articleTitle, content: articleContent, status: status, updated_at: new Date() };
        if (imageUrl) updateData.main_image_url = imageUrl; // Only update image if a new one was uploaded
        await supabase.from('articles').update(updateData).eq('id', editingArticleId);
      } else {
        // INSERT NEW ARTICLE
        const { data: newArticle } = await supabase.from('articles').insert([{ 
          title: articleTitle, content: articleContent, main_image_url: imageUrl, author_id: user.id, status: status 
        }]).select().single();
        if (newArticle) newArticleId = newArticle.id;
      }

      // Link to Breaking News if upgrading
      if (newArticleId && upgradingNewsId) {
        await supabase.from('breaking_news').update({ linked_article_id: newArticleId }).eq('id', upgradingNewsId);
      }

      alert(`Article successfully saved as ${status.toUpperCase()}!`);
      resetArticleEditor();
      fetchNewsList();
      fetchArticlesList();
    }
    setIsPublishingArticle(false);
  };

  const resetArticleEditor = () => {
    setArticleTitle(''); setArticleContent(''); setArticleImage(null); setUpgradingNewsId(null); setEditingArticleId(null);
  };

  const handleEditDraft = (article: any) => {
    setEditingArticleId(article.id);
    setArticleTitle(article.title);
    setArticleContent(article.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteNews = async (id: number) => {
    if (!window.confirm("Delete this breaking news?")) return;
    await supabase.from('breaking_news').delete().eq('id', id); fetchNewsList();
  };

  const handleDeleteArticle = async (id: number) => {
    if (!window.confirm("Delete this entire article?")) return;
    await supabase.from('articles').delete().eq('id', id); fetchArticlesList();
  };

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
        
        {/* LEFT COLUMN: Feature Article Editor */}
        <div className={`bg-white p-6 rounded-lg shadow-sm border-2 ${upgradingNewsId || editingArticleId ? 'border-green-500 shadow-green-100' : 'border-blue-900'}`}>
          <h2 className="text-2xl font-bold text-blue-900 mb-2 uppercase">
            {editingArticleId ? '📝 Editing Article' : upgradingNewsId ? '⭐ Upgrading Wire to Article' : 'Write Feature Article'}
          </h2>
          
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Headline Title</label>
              <input type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} className="w-full border border-gray-300 rounded p-2 font-bold text-lg" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Story Content</label>
              <textarea value={articleContent} onChange={(e) => setArticleContent(e.target.value)} className="w-full border border-gray-300 rounded p-3 h-64" placeholder="Write the full report here..." />
            </div>
            <div className="border border-dashed border-gray-400 p-4 rounded bg-gray-50">
              <label className="block text-sm font-bold text-red-600 mb-2 uppercase">{editingArticleId ? 'Replace Main Picture (Optional)' : 'Attach Main Picture (Mandatory)'}</label>
              <input type="file" accept="image/*" onChange={(e) => setArticleImage(e.target.files ? e.target.files[0] : null)} className="text-sm" />
            </div>
            
            <div className="flex gap-4 pt-2">
              <button disabled={isPublishingArticle} type="button" onClick={() => submitArticle('draft')} className="flex-1 bg-yellow-500 text-white font-bold py-3 px-4 rounded hover:bg-yellow-600 uppercase text-sm">
                Save as Draft
              </button>
              <button disabled={isPublishingArticle} type="button" onClick={() => submitArticle('published')} className="flex-1 bg-blue-900 text-white font-bold py-3 px-4 rounded hover:bg-blue-800 uppercase text-sm">
                {isPublishingArticle ? 'Saving...' : 'Publish Live'}
              </button>
            </div>
            {(upgradingNewsId || editingArticleId) && (
              <button type="button" onClick={resetArticleEditor} className="w-full mt-2 bg-gray-300 text-black font-bold py-2 rounded hover:bg-gray-400 uppercase text-sm">Cancel Editing</button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Breaking News & Management */}
        <div className="space-y-8">
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-red-600 mb-4 uppercase flex items-center gap-2"><span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span> Fast Wire Update</h2>
            <form onSubmit={handlePostBreakingNews} className="space-y-4">
              <textarea value={breakingText} onChange={(e) => setBreakingText(e.target.value)} className="w-full border border-gray-300 rounded p-3" rows={2} placeholder="Type a quick update..." required />
              <input type="file" accept="image/*" onChange={(e) => setBreakingImage(e.target.files ? e.target.files[0] : null)} className="text-sm block w-full border border-dashed p-2 bg-gray-50" />
              <button disabled={isPublishingNews} type="submit" className="w-full bg-red-600 text-white font-bold py-2 px-6 rounded hover:bg-red-700 uppercase">
                Send to Left Sidebar
              </button>
            </form>
          </div>

          {/* MANAGE ARTICLES & DRAFTS */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase border-b pb-2">Manage Articles & Drafts</h2>
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
              {articlesList.map((art) => (
                <div key={art.id} className="p-3 border border-gray-100 bg-gray-50 rounded flex justify-between items-center">
                  <div className="truncate pr-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded mr-2 uppercase ${art.status === 'draft' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                      {art.status}
                    </span>
                    <span className="font-bold text-sm text-blue-900">{art.title}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditDraft(art)} className="bg-blue-100 text-blue-800 font-bold text-xs px-3 py-1 rounded hover:bg-blue-200 uppercase">Edit</button>
                    {role === 'admin' && <button onClick={() => handleDeleteArticle(art.id)} className="text-red-500 hover:text-red-700 font-bold text-xs">Delete</button>}
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
                    {!news.linked_article_id ? (
                      <button onClick={() => { setUpgradingNewsId(news.id); setArticleTitle(news.text_content); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-green-600 text-white font-bold text-xs px-3 py-1 rounded hover:bg-green-700 uppercase">⭐ Write Article</button>
                    ) : <span className="bg-blue-100 text-blue-800 font-bold text-xs px-3 py-1 rounded border border-blue-200">✓ Linked</span>}
                    {role === 'admin' && <button onClick={() => handleDeleteNews(news.id)} className="text-red-500 hover:text-red-700 font-bold text-xs">Delete</button>}
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