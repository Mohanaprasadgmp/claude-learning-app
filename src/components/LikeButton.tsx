'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { toggleLike } from '@/app/actions/concepts'

interface LikeButtonProps {
  conceptSlug: string
  initialCount: number
  initialLiked: boolean
  userId: string | null
}

export default function LikeButton({
  conceptSlug,
  initialCount,
  initialLiked,
  userId,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [pending, setPending] = useState(false)

  async function handleClick() {
    if (!userId || pending) return
    setPending(true)
    // optimistic update
    setLiked((prev) => !prev)
    setCount((prev) => (liked ? prev - 1 : prev + 1))
    await toggleLike(conceptSlug)
    setPending(false)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        disabled={!userId || pending}
        title={userId ? (liked ? 'Unlike' : 'Like') : 'Sign in to like'}
        className={[
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
          userId
            ? liked
              ? 'bg-amber-500/15 text-amber-500 hover:bg-amber-500/25'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-amber-500/10 hover:text-amber-500'
            : 'cursor-not-allowed bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600',
        ].join(' ')}
      >
        <Heart
          className="h-4 w-4"
          fill={liked ? 'currentColor' : 'none'}
        />
        <span>{count}</span>
      </button>
      {!userId && (
        <span className="text-xs text-zinc-400 dark:text-zinc-600">
          Sign in to like
        </span>
      )}
    </div>
  )
}
