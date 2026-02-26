'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export type ActionComment = {
  id: string
  content: string
  createdAt: Date
  userId: string
  profile: { name: string }
  likeCount: number
  userLiked: boolean
  replies: ActionComment[]
}

export async function toggleLike(conceptSlug: string): Promise<{ error?: string }> {
  const user = await getUser()
  if (!user) return { error: 'Not authenticated' }

  const existing = await prisma.conceptLike.findUnique({
    where: { userId_conceptSlug: { userId: user.id, conceptSlug } },
  })

  if (existing) {
    await prisma.conceptLike.delete({ where: { id: existing.id } })
  } else {
    await prisma.conceptLike.create({ data: { userId: user.id, conceptSlug } })
  }

  revalidatePath(`/concepts/${conceptSlug}`)
  return {}
}

export async function addComment(
  conceptSlug: string,
  content: string,
  parentId?: string,
): Promise<{ error?: string; comment?: ActionComment }> {
  const user = await getUser()
  if (!user) return { error: 'Not authenticated' }

  const trimmed = content.trim()
  if (!trimmed) return { error: 'Comment cannot be empty' }

  const created = await prisma.conceptComment.create({
    data: { userId: user.id, conceptSlug, content: trimmed, parentId: parentId ?? null },
    include: { profile: { select: { name: true } } },
  })

  revalidatePath(`/concepts/${conceptSlug}`)

  return {
    comment: {
      id: created.id,
      content: created.content,
      createdAt: created.createdAt,
      userId: created.userId,
      profile: created.profile,
      likeCount: 0,
      userLiked: false,
      replies: [],
    },
  }
}

export async function deleteComment(
  commentId: string,
  conceptSlug: string,
): Promise<{ error?: string }> {
  const user = await getUser()
  if (!user) return { error: 'Not authenticated' }

  await prisma.conceptComment.deleteMany({
    where: { id: commentId, userId: user.id },
  })

  revalidatePath(`/concepts/${conceptSlug}`)
  return {}
}

export async function toggleCommentLike(
  commentId: string,
  conceptSlug: string,
): Promise<{ error?: string }> {
  const user = await getUser()
  if (!user) return { error: 'Not authenticated' }

  const existing = await prisma.conceptCommentLike.findUnique({
    where: { userId_commentId: { userId: user.id, commentId } },
  })

  if (existing) {
    await prisma.conceptCommentLike.delete({ where: { id: existing.id } })
  } else {
    await prisma.conceptCommentLike.create({ data: { userId: user.id, commentId } })
  }

  revalidatePath(`/concepts/${conceptSlug}`)
  return {}
}
