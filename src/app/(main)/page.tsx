import { concepts, ALL_CATEGORIES, ConceptCategory } from '@/data/concepts';
import ConceptCard from '@/components/ConceptCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type SearchParams = Promise<{ category?: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const activeCategory = params.category || '';

  const filtered =
    activeCategory && ALL_CATEGORIES.includes(activeCategory as ConceptCategory)
      ? concepts.filter((c) => c.category === activeCategory)
      : concepts;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors">
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight mb-3">
            Master{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
              Claude Code
            </span>
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-base max-w-xl mb-4">
            From CLI basics to advanced agentic workflows — every core concept explained with
            examples, code snippets, and tips from real usage.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-zinc-400">
              {concepts.length} concepts
            </Badge>
            <Badge variant="outline" className="border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-zinc-400">
              5 categories
            </Badge>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200 dark:bg-zinc-800" />

        {/* Category filter */}
        <div className="mb-8">
          <CategoryFilter categories={ALL_CATEGORIES} activeCategory={activeCategory} />
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-400 dark:text-zinc-600 mb-5">
          Showing {filtered.length} of {concepts.length} concepts
          {activeCategory ? ` in "${activeCategory}"` : ''}
        </p>

        {/* Card grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((concept) => (
              <ConceptCard key={concept.slug} concept={concept} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gray-400 dark:text-zinc-400">No concepts found for this category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 mt-16 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-gray-400 dark:text-zinc-600">
          Built to learn Claude Code
        </div>
      </footer>
    </div>
  );
}
