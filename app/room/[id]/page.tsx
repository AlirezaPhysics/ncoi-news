'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useParams } from 'next/navigation' // <--- Key Change
import { differenceInSeconds } from 'date-fns'

export default function ClassRoom() {
  const router = useRouter()
  // 1. Get the ID the 'safe' way for Next.js 15+
  const params = useParams()
  // "params.id" is how we get the "11" from the URL
  const slotId = params?.id

  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0) 
  const [sessionActive, setSessionActive] = useState(false)
  const jitsiContainerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // 2. Wait until we actually have the ID
    if (!slotId) return 

    const fetchSession = async () => {
      // Get the schedule details
      const { data: slot, error } = await supabase
        .from('schedule')
        .select('*')
        .eq('id', slotId)
        .single()

      if (error || !slot) {
        alert("Session not found!")
        router.push('/')
        return
      }

      // Check Time
      const now = new Date()
      const end = new Date(slot.end_time)
      const secondsRemaining = differenceInSeconds(end, now)

      if (secondsRemaining <= 0) {
        alert("This class has ended!")
        router.push('/')
        return
      }

      setTimeLeft(secondsRemaining)
      setSessionActive(true)
      setLoading(false)

      initJitsi(slot)
    }

    fetchSession()
  }, [slotId])

  // Timer logic
  useEffect(() => {
    if (!sessionActive) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
           clearInterval(timer)
           alert("Class Time Finished!")
           router.push('/') 
           return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [sessionActive])

  // Jitsi Logic
  const initJitsi = (slot: any) => {
    if (typeof window === 'undefined') return

    const script = document.createElement("script")
    script.src = "https://meet.jit.si/external_api.js"
    script.async = true
    script.onload = () => {
      const roomName = `TutorCodeAI_Session_${slot.id}_${slot.tutor_id}`

      // @ts-ignore
      const api = new window.JitsiMeetExternalAPI("meet.jit.si", {
        roomName: roomName,
        parentNode: jitsiContainerRef.current,
        width: '100%',
        height: '100%',
        configOverwrite: { startWithAudioMuted: false, disableDeepLinking: true, prejoinPageEnabled: false },
        interfaceConfigOverwrite: { SHOW_JITSI_WATERMARK: false }
      })
    }
    document.body.appendChild(script)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (loading) return <div className="text-center p-20 text-white bg-black h-screen">Connecting to Secure Room...</div>

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="h-16 bg-gray-900 flex justify-between items-center px-4 border-b border-gray-700">
         <span className="text-blue-400 font-bold text-lg">Classroom #{slotId}</span>
         <div className="flex items-center gap-4">
            <span className={`text-xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
              Time: {formatTime(timeLeft)}
            </span>
            <button onClick={() => router.push('/')} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-bold text-sm">
              Exit
            </button>
         </div>
      </div>
      {/* Video */}
      <div className="flex-1 w-full h-full" ref={jitsiContainerRef}></div>
    </div>
  )
}

