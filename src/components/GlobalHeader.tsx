import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import ThemeToggle from '@/components/ThemeToggle'
import LogoutButton from '@/components/LogoutButton'

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export default async function GlobalHeader() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const profile = user
    ? await prisma.profile.findUnique({ where: { userId: user.id } }).catch(() => null)
    : null

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-zinc-800 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-amber-500 dark:text-amber-400">Claude Code</span>{' '}
          <span className="text-gray-900 dark:text-white">Learning Hub</span>
        </Link>

        <div className="flex items-center gap-3">
          {profile && (
            <div className="flex items-center gap-2.5 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[10px] font-bold text-white leading-none select-none">
                {getInitials(profile.name)}
              </span>
              <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">
                {profile.name}
              </span>
            </div>
          )}
          {user && <LogoutButton />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
