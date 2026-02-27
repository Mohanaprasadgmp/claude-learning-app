'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ToastHandlerProps {
  toastParam: string | undefined
}

export default function ToastHandler({ toastParam }: ToastHandlerProps) {
  const router = useRouter()

  useEffect(() => {
    if (toastParam === 'login') {
      toast.success('Welcome back!')
      router.replace('/')
    }
  }, [toastParam, router])

  return null
}
