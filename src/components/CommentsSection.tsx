'use client'

import { useState } from 'react'
import { Heart, Reply, Trash2 } from 'lucide-react'
import { addComment, deleteComment, toggleCommentLike } from '@/app/actions/concepts'
import type { ActionComment } from '@/app/actions/concepts'

// Re-export so page.tsx can import the type
export type { ActionComment }

function relativeTime(date: Date | string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(date).toLocaleDateString()
}

const textareaClass =
  'w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition'

const postBtnClass =
  'rounded-full bg-amber-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'

const cancelBtnClass =
  'rounded-full px-4 py-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors'

interface CommentRowProps {
  comment: ActionComment
  userId: string | null
  conceptSlug: string
  isReply?: boolean
  onDelete: (id: string) => void
  onLike: (id: string) => void
  onReplySubmit?: (parentId: string, text: string) => Promise<void>
}

function CommentRow({
  comment,
  userId,
  conceptSlug,
  isReply = false,
  onDelete,
  onLike,
  onReplySubmit,
}: CommentRowProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replySubmitting, setReplySubmitting] = useState(false)

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!replyText.trim() || replySubmitting || !onReplySubmit) return
    setReplySubmitting(true)
    await onReplySubmit(comment.id, replyText)
    setReplyText('')
    setShowReplyForm(false)
    setReplySubmitting(false)
  }

  return (
    <li className={isReply ? 'ml-8 mt-3' : ''}>
      <div
        className={[
          'rounded-lg border bg-white dark:bg-zinc-900 px-4 py-3',
          isReply
            ? 'border-gray-100 dark:border-zinc-800/60'
            : 'border-gray-200 dark:border-zinc-800',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {comment.profile.name}
          </span>
          <span className="text-xs text-gray-400 dark:text-zinc-600">
            {relativeTime(comment.createdAt)}
          </span>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-600 dark:text-zinc-300 whitespace-pre-wrap mb-3">
          {comment.content}
        </p>

        {/* Actions row */}
        <div className="flex items-center gap-3">
          {/* Like */}
          <button
            onClick={() => userId && onLike(comment.id)}
            disabled={!userId}
            title={userId ? (comment.userLiked ? 'Unlike' : 'Like') : 'Sign in to like'}
            className={[
              'flex items-center gap-1 text-xs transition-colors',
              userId
                ? comment.userLiked
                  ? 'text-amber-500 hover:text-amber-600'
                  : 'text-zinc-400 dark:text-zinc-600 hover:text-amber-500'
                : 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed',
            ].join(' ')}
          >
            <Heart
              className="h-3.5 w-3.5"
              fill={comment.userLiked ? 'currentColor' : 'none'}
            />
            {comment.likeCount > 0 && <span>{comment.likeCount}</span>}
          </button>

          {/* Reply (only on top-level comments) */}
          {!isReply && userId && onReplySubmit && (
            <button
              onClick={() => setShowReplyForm((v) => !v)}
              className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600 hover:text-amber-500 transition-colors"
            >
              <Reply className="h-3.5 w-3.5" />
              Reply
            </button>
          )}

          {/* Delete (own comment) */}
          {userId === comment.userId && (
            <button
              onClick={() => onDelete(comment.id)}
              className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600 hover:text-red-500 transition-colors ml-auto"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Inline reply form */}
      {showReplyForm && (
        <form onSubmit={handleReply} className="ml-8 mt-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply…"
            rows={2}
            autoFocus
            className={textareaClass}
          />
          <div className="mt-1.5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => { setShowReplyForm(false); setReplyText('') }}
              className={cancelBtnClass}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={replySubmitting || !replyText.trim()}
              className={postBtnClass}
            >
              {replySubmitting ? 'Posting…' : 'Reply'}
            </button>
          </div>
        </form>
      )}

      {/* Nested replies */}
      {comment.replies.length > 0 && (
        <ul className="mt-1 space-y-0">
          {comment.replies.map((reply) => (
            <CommentRow
              key={reply.id}
              comment={reply}
              userId={userId}
              conceptSlug={conceptSlug}
              isReply
              onDelete={onDelete}
              onLike={onLike}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

interface CommentsSectionProps {
  conceptSlug: string
  initialComments: ActionComment[]
  userId: string | null
}

export default function CommentsSection({
  conceptSlug,
  initialComments,
  userId,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<ActionComment[]>(initialComments)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalCount = comments.reduce((n, c) => n + 1 + c.replies.length, 0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    const result = await addComment(conceptSlug, text)
    if (result.error) {
      setError(result.error)
    } else if (result.comment) {
      setComments((prev) => [...prev, result.comment!])
      setText('')
    }
    setSubmitting(false)
  }

  async function handleReplySubmit(parentId: string, replyText: string) {
    const result = await addComment(conceptSlug, replyText, parentId)
    if (result.comment) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? { ...c, replies: [...c.replies, result.comment!] }
            : c,
        ),
      )
    }
  }

  function handleDelete(commentId: string) {
    // Remove from top-level or from replies
    setComments((prev) =>
      prev
        .filter((c) => c.id !== commentId)
        .map((c) => ({
          ...c,
          replies: c.replies.filter((r) => r.id !== commentId),
        })),
    )
    deleteComment(commentId, conceptSlug)
  }

  function handleLike(commentId: string) {
    if (!userId) return
    // Optimistic toggle for top-level and replies
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            likeCount: c.userLiked ? c.likeCount - 1 : c.likeCount + 1,
            userLiked: !c.userLiked,
          }
        }
        return {
          ...c,
          replies: c.replies.map((r) =>
            r.id === commentId
              ? {
                  ...r,
                  likeCount: r.userLiked ? r.likeCount - 1 : r.likeCount + 1,
                  userLiked: !r.userLiked,
                }
              : r,
          ),
        }
      }),
    )
    toggleCommentLike(commentId, conceptSlug)
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
      <h2 className="text-base font-semibold text-gray-700 dark:text-zinc-300 mb-6 uppercase tracking-wider text-xs">
        Comments ({totalCount})
      </h2>

      {/* New comment form */}
      {userId ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share a thought or ask a question…"
            rows={3}
            className={textareaClass}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className={postBtnClass}
            >
              {submitting ? 'Posting…' : 'Post'}
            </button>
          </div>
        </form>
      ) : (
        <p className="mb-8 text-sm text-zinc-400 dark:text-zinc-600">
          <a href="/login" className="text-amber-500 hover:underline">
            Sign in
          </a>{' '}
          to leave a comment.
        </p>
      )}

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-sm text-zinc-400 dark:text-zinc-600">
          No comments yet. Be the first!
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <CommentRow
              key={comment.id}
              comment={comment}
              userId={userId}
              conceptSlug={conceptSlug}
              onDelete={handleDelete}
              onLike={handleLike}
              onReplySubmit={handleReplySubmit}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
