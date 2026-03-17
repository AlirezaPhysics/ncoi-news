'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// @ts-ignore
export default function ArticlePage({ params }) {
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Comment Form States
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, []);

  const fetchArticle = async () => {
    const { data } = await supabase.from('articles').select('*').eq('id', params.id).single();
    if (data) setArticle(data);
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await supabase.from('comments').select('*').eq('article_id', params.id).order('created_at', { ascending: true });
    if (data) setComments(data);
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('comments').insert([{
      article_id: params.id,
      user_name: commentName,
      content: commentText
    }]);

    if (!error) {
      setCommentName(''); setCommentText('');
      fetchComments(); // Refresh the comments section instantly
    } else {
      alert("Error posting comment: " + error.message);
    }
    setIsSubmitting(false);
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center text-black">Loading report...</div>;
  if (!article) return <div className="min-h-screen flex justify-center items-center text-red-600 font-bold">Article not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans pb-24">
      
      <header className="bg-blue-900 text-white p-4 shadow-md text-center">
        <a href="/" className="text-xl font-bold tracking-widest uppercase hover:underline">← Back to NCOI News Home</a>
      </header>

      <main className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 leading-tight">{article.title}</h1>
        
        <div className="text-sm text-gray-500 font-bold uppercase mb-6 border-b pb-4 flex gap-6">
          <span>Published: {new Date(article.created_at).toLocaleDateString()}</span>
          <span>Last Updated: {new Date(article.updated_at).toLocaleTimeString()}</span>
        </div>

        {article.main_image_url && (
          <img src={article.main_image_url} alt="Article Header" className="w-full max-h-[500px] object-cover rounded-md mb-8 shadow-sm border border-gray-200" />
        )}

        <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>

        {/* --- COMMENTS SECTION --- */}
        <div className="mt-16 pt-8 border-t-4 border-gray-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 uppercase">Reader Comments ({comments.length})</h3>
          
          {/* List of Existing Comments */}
          <div className="space-y-4 mb-8">
            {comments.map((c) => (
              <div key={c.id} className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-blue-900 font-bold">{c.user_name}</strong>
                  <span className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</span>
                </div>
                <p className="text-gray-700 text-sm">{c.content}</p>
              </div>
            ))}
            {comments.length === 0 && <p className="text-gray-500 italic text-sm">Be the first to comment on this story.</p>}
          </div>

          {/* Form to Post a New Comment */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-4 uppercase">Leave a Comment</h4>
            <form onSubmit={handlePostComment} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Display Name</label>
                <input type="text" value={commentName} onChange={(e) => setCommentName(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" placeholder="e.g. TehranWatcher99" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Your Comment</label>
                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" rows={3} placeholder="Share your thoughts..." required />
              </div>
              <button disabled={isSubmitting} type="submit" className="bg-blue-900 text-white font-bold py-2 px-6 rounded hover:bg-blue-800 uppercase text-sm shadow-sm">
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}