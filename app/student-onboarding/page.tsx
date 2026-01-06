'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function StudentOnboarding() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [grade, setGrade] = useState('Grade 9')
  const [goals, setGoals] = useState('')
  const [helpTypes, setHelpTypes] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)

  const toggleHelp = (type: string) => {
    setHelpTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    let assignmentUrl = ''
    if (file) {
        const filePath = `student_${user.id}/${Date.now()}_${file.name}`
        await supabase.storage.from('assignments').upload(filePath, file)
        const { data } = supabase.storage.from('assignments').getPublicUrl(filePath)
        assignmentUrl = data.publicUrl
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        student_grade: grade,
        student_goals: goals,
        help_type: helpTypes,
        application_data: { initial_problem_url: assignmentUrl }, // Store url in generic data or a specific column
        onboarding_complete: true // MARK THEM AS DONE
      })
      .eq('id', user.id)

    if (error) alert("Error")
    else router.push('/dashboard')
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#05051e] text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-[#11113a] p-8 rounded-3xl">
        <h1 className="text-3xl font-bold mb-4">Welcome, Student! 🎓</h1>
        <p className="text-slate-400 mb-6">Tell us about your goals so we can prepare for you.</p>

        <label className="block mb-2 font-bold">Current Grade / Level</label>
        <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full bg-[#05051e] border border-slate-600 p-3 rounded mb-4">
            <option>Grade 4-8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 12</option>
            <option>University Year 1</option>
            <option>University Year 2+</option>
        </select>

        <label className="block mb-2 font-bold">What do you want to learn/improve?</label>
        <textarea className="w-full bg-[#05051e] border border-slate-600 p-3 rounded mb-4 h-24" placeholder="I need help with calculus integrals..." onChange={e => setGoals(e.target.value)}></textarea>

        <label className="block mb-2 font-bold">I need help with (Check all that apply):</label>
        <div className="flex gap-4 mb-6">
            <button onClick={() => toggleHelp('homework')} className={`p-2 rounded border ${helpTypes.includes('homework') ? 'bg-blue-600 border-blue-600' : 'border-slate-600'}`}>Homework/Assignments</button>
            <button onClick={() => toggleHelp('exam')} className={`p-2 rounded border ${helpTypes.includes('exam') ? 'bg-blue-600 border-blue-600' : 'border-slate-600'}`}>Exam Prep</button>
        </div>

        <label className="block mb-2 font-bold text-sm text-yellow-400">Upload your homework question / Syllabus (Optional)</label>
        <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="block w-full text-sm text-slate-300 mb-6"/>

        <button onClick={handleSubmit} disabled={loading} className="w-full bg-green-600 py-3 rounded-xl font-bold">
            {loading ? "Saving..." : "Start Learning"}
        </button>
      </div>
    </div>
  )
}