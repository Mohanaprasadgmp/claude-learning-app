import { notFound } from 'next/navigation';
import Link from 'next/link';
import { concepts, difficultyBadgeStyles } from '@/data/concepts';
import ConceptCard from '@/components/ConceptCard';
import CodeBlock from '@/components/CodeBlock';
import ThemeToggle from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';

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

  if (!concept) notFound();

  const related = concepts
    .filter((c) => c.category === concept.category && c.slug !== concept.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors">
      {/* Top bar */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-400/10 px-2"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              All Concepts
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

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
