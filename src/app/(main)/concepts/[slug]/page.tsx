import { notFound } from 'next/navigation';
import Link from 'next/link';
import { concepts, difficultyBadgeStyles } from '@/data/concepts';
import ConceptCard from '@/components/ConceptCard';
import CodeBlock from '@/components/CodeBlock';
import LikeButton from '@/components/LikeButton';
import CommentsSection from '@/components/CommentsSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const concept = concepts.find((c) => c.slug === slug);
  if (!concept) return {};
  return {
    title: `${concept.title} — Claude Code Learning Hub`,
    description: concept.shortDesc,
  };
}

export default async function ConceptPage({ params }: { params: Params }) {
  const { slug } = await params;
  const concept = concepts.find((c) => c.slug === slug);

  if (!concept || !concept.released) notFound();

  const related = concepts
    .filter((c) => c.category === concept.category && c.slug !== concept.slug)
    .slice(0, 3);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [likesCount, userLike, rawComments] = await Promise.all([
    prisma.conceptLike.count({ where: { conceptSlug: slug } }),
    user
      ? prisma.conceptLike.findUnique({
          where: { userId_conceptSlug: { userId: user.id, conceptSlug: slug } },
        })
      : Promise.resolve(null),
    prisma.conceptComment.findMany({
      where: { conceptSlug: slug, parentId: null },
      include: {
        profile: { select: { name: true } },
        likes: { select: { userId: true } },
        replies: {
          include: {
            profile: { select: { name: true } },
            likes: { select: { userId: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    }),
  ] as const);

  const comments = rawComments.map((c: any) => ({
    id: c.id,
    content: c.content,
    createdAt: c.createdAt,
    userId: c.userId,
    profile: c.profile,
    likeCount: c.likes.length,
    userLiked: user ? c.likes.some((l:any) => l.userId === user.id) : false,
    replies: c.replies.map((r:any) => ({
      id: r.id,
      content: r.content,
      createdAt: r.createdAt,
      userId: r.userId,
      profile: r.profile,
      likeCount: r.likes.length,
      userLiked: user ? r.likes.some((l:any) => l.userId === user.id) : false,
      replies: [] as never[],
    })),
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors">

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Concept header */}
        <header className="mb-12">
          <div className="flex items-start gap-5 mb-6">
            <span className="text-6xl leading-none" aria-hidden="true">
              {concept.emoji}
            </span>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="border-amber-500/30 dark:border-amber-400/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10"
                >
                  {concept.category}
                </Badge>
                <Badge
                  variant="outline"
                  className={difficultyBadgeStyles[concept.difficulty]}
                >
                  {concept.difficulty}
                </Badge>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
                {concept.title}
              </h1>
              <p className="text-gray-500 dark:text-zinc-400 text-lg leading-relaxed">
                {concept.shortDesc}
              </p>
            </div>
          </div>

          {/* Section nav */}
          <Separator className="mb-4 bg-gray-200 dark:bg-zinc-800" />
          <nav className="flex flex-wrap gap-1" aria-label="Section navigation">
            {concept.sections.map((section, i) => (
              <Button
                key={i}
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400 dark:text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-400/10 h-7 px-2"
                asChild
              >
                <a href={`#section-${i}`}>{section.heading}</a>
              </Button>
            ))}
          </nav>
        </header>

        {/* Sections */}
        <article className="space-y-12">
          {concept.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 dark:bg-amber-400/10 text-xs font-bold text-amber-600 dark:text-amber-400">
                  {i + 1}
                </span>
                {section.heading}
              </h2>

              <p className="text-gray-600 dark:text-zinc-300 leading-relaxed text-[15px]">
                {section.body}
              </p>

              {section.code && (
                <CodeBlock
                  language={section.code.language}
                  content={section.code.content}
                />
              )}
            </section>
          ))}
        </article>

        {/* Likes */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <LikeButton
            conceptSlug={slug}
            initialCount={likesCount}
            initialLiked={!!userLike}
            userId={user?.id ?? null}
          />
        </div>

        {/* Comments */}
        <CommentsSection
          conceptSlug={slug}
          initialComments={comments}
          userId={user?.id ?? null}
        />

        {/* References */}
        {concept.references && concept.references.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-gray-700 dark:text-zinc-300 mb-3 uppercase tracking-wider text-xs">
              Official References
            </h2>
            <div className="flex flex-col gap-2">
              {concept.references.map((ref, i) => (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 hover:border-amber-400/60 hover:bg-amber-500/5 dark:hover:border-amber-400/60 dark:hover:bg-amber-400/5 transition-all"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {ref.label}
                    </span>
                    {ref.description && (
                      <p className="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">{ref.description}</p>
                    )}
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-gray-400 dark:text-zinc-600 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors shrink-0 ml-4" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related concepts */}
        {related.length > 0 && (
          <aside className="mt-16 pt-10 border-t border-gray-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
              More in{' '}
              <span className="text-amber-500 dark:text-amber-400">{concept.category}</span>
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {related.map((c) => (
                <ConceptCard key={c.slug} concept={c} compact />
              ))}
            </div>
          </aside>
        )}

        {/* Back to home */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800 text-center">
          <Button
            variant="outline"
            className="rounded-full border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-amber-500/50 dark:hover:border-amber-400/50 hover:text-amber-600 dark:hover:text-amber-400 bg-transparent"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              Back to all concepts
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
