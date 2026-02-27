'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export type AuthState = {
  error: string | null
  fieldErrors?: {
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  redirect('/?toast=login')
}

export async function signup(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const fieldErrors: AuthState['fieldErrors'] = {}

  if (!name || name.trim().length < 2) {
    fieldErrors.name = 'Name must be at least 2 characters.'
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.'
  }
  if (!password || password.length < 6) {
    fieldErrors.password = 'Password must be at least 6 characters.'
  }
  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = 'Passwords do not match.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: null, fieldErrors }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    await prisma.profile.upsert({
      where: { userId: data.user.id },
      update: { email, name: name.trim() },
      create: { userId: data.user.id, email, name: name.trim() },
    })
  }

  redirect('/')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })
  if (error || !data.url) redirect('/login?error=oauth_failed')
  redirect(data.url)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
