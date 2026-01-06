'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminPage() {
  const [applicants, setApplicants] = useState<any[]>([])
  
  // SECURITY: Only you should see this.
  // In production, we'd check if user.email === 'alirezaddd33@gmail.com'
  
  useEffect(() => {
    fetchApplicants()
  }, [])

  const fetchApplicants = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'tutor')
      .eq('status', 'pending') // Only show people waiting
    
    if (data) setApplicants(data)
  }

  const approveTutor = async (id: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ status: 'approved' })
      .eq('id', id)
    
    if (!error) {
        alert("Tutor Approved! They can now login.")
        fetchApplicants() // Refresh list
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Admin Headquarters</h1>
      
      <div className="grid gap-4">
        {applicants.length === 0 && <p>No pending applications.</p>}
        
        {applicants.map((app) => (
            <div key={app.id} className="p-6 bg-[#11113a] border border-slate-600 rounded-xl">
                <h3 className="text-xl font-bold">{app.full_name || app.email}</h3>
                <div className="mt-4 bg-black p-4 rounded text-sm text-slate-300">
                    <pre>{JSON.stringify(app.application_data, null, 2)}</pre>
                </div>
                <button 
                    onClick={() => approveTutor(app.id)}
                    className="mt-4 bg-green-600 px-6 py-2 rounded hover:bg-green-500 font-bold"
                >
                    Approve Application ✅
                </button>
            </div>
        ))}
      </div>
    </div>
  )
}