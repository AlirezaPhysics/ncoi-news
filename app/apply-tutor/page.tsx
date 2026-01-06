'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function TutorApplication() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    fullName: '', phone: '', subjects: '', 
    experience: '', education: ''
  })

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
        if (selectedFile.size > 2 * 1024 * 1024) return alert("File too big! Max 2MB.")
        if (selectedFile.type !== 'application/pdf') return alert("PDF only please.")
        setFile(selectedFile)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    let resumeUrl = ''

    // 1. Upload Resume
    if (file) {
        const filePath = `${user.id}/${file.name}`
        const { error: uploadError } = await supabase.storage.from('resumes').upload(filePath, file)
        
        if (uploadError) {
            // If user re-uploads, we might get an 'already exists' error, ignore it or handle nicely
            console.error(uploadError)
        }
        
        // Get Public Link
        const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(filePath)
        resumeUrl = urlData.publicUrl
    }

    // 2. Save Data
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.fullName,
        application_data: { ...formData, resume: resumeUrl },
        status: 'pending' 
      })
      .eq('id', user.id)

    if (error) alert("Error: " + error.message)
    else {
      alert("Application Sent! Check email for approval.")
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#05051e] text-white flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full bg-[#11113a] p-8 rounded-3xl border border-blue-500/30">
        <h1 className="text-3xl font-bold mb-6">Tutor Application</h1>
        
        <div className="space-y-4">
          <input name="fullName" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 p-3 rounded text-white" placeholder="Full Legal Name" />
          <div className="grid md:grid-cols-2 gap-4">
            <input name="phone" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 p-3 rounded text-white" placeholder="Phone Number" />
            <input name="education" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 p-3 rounded text-white" placeholder="Highest Degree (e.g. M.Eng)" />
          </div>
          <textarea name="subjects" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 p-3 rounded h-24 text-white" placeholder="Subjects (e.g., Gr 12 Math)" />
          <textarea name="experience" onChange={handleChange} className="w-full bg-[#05051e] border border-slate-700 p-3 rounded h-24 text-white" placeholder="Teaching Experience" />
          
          <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
            <label className="block text-sm font-bold mb-2">Upload Resume (PDF, Max 2MB)</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-blue-600 file:text-white" />
          </div>

          <button onClick={handleSubmit} disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg">
            {loading ? "Uploading..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  )
}