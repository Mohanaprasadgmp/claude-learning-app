'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup, signInWithGoogle, type AuthState } from '@/app/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: AuthState = { error: null, fieldErrors: {} }

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-xs text-red-400 mt-1">{msg}</p>
}

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState)

  return (
    <div className="mx-auto w-full max-w-[420px]">
      {/* Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm p-8 shadow-2xl">

        {/* Logo mark */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
            <span className="text-[15px] font-black text-white tracking-tight">CC</span>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-white">
              Claude Code <span className="text-amber-400">Learning Hub</span>
            </h1>
            <p className="mt-0.5 text-sm text-zinc-400">Create your account to get started</p>
          </div>
        </div>

        {/* Google sign-in */}
        <form action={signInWithGoogle} className="mb-5">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700/60 hover:border-zinc-600"
          >
            <GoogleIcon />
            Sign up with Google
          </button>
        </form>

        {/* Divider */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-zinc-600">or continue with email</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Error */}
        {state.error && (
          <div className="mb-4 rounded-lg border border-red-800/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-zinc-300 text-xs font-medium">
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Mohanaprasad"
              required
              autoComplete="name"
              aria-invalid={!!state.fieldErrors?.name}
              className="mt-1.5 border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-600 focus-visible:border-amber-500 focus-visible:ring-amber-500/20"
            />
            <FieldError msg={state.fieldErrors?.name} />
          </div>

          <div>
            <Label htmlFor="email" className="text-zinc-300 text-xs font-medium">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              aria-invalid={!!state.fieldErrors?.email}
              className="mt-1.5 border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-600 focus-visible:border-amber-500 focus-visible:ring-amber-500/20"
            />
            <FieldError msg={state.fieldErrors?.email} />
          </div>

          <div>
            <Label htmlFor="password" className="text-zinc-300 text-xs font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              required
              autoComplete="new-password"
              aria-invalid={!!state.fieldErrors?.password}
              className="mt-1.5 border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-600 focus-visible:border-amber-500 focus-visible:ring-amber-500/20"
            />
            <FieldError msg={state.fieldErrors?.password} />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-zinc-300 text-xs font-medium">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              aria-invalid={!!state.fieldErrors?.confirmPassword}
              className="mt-1.5 border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-600 focus-visible:border-amber-500 focus-visible:ring-amber-500/20"
            />
            <FieldError msg={state.fieldErrors?.confirmPassword} />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-amber-400 transition-colors hover:text-amber-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
