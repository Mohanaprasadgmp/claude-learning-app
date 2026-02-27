import { concepts, ALL_CATEGORIES, ConceptCategory } from '@/data/concepts';
import ConceptCard from '@/components/ConceptCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Linkedin, Mail } from 'lucide-react';
import ToastHandler from '@/components/ToastHandler';

type SearchParams = Promise<{ category?: string; toast?: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const activeCategory = params.category || '';
  const toastParam = params.toast;

  const filtered =
    activeCategory && ALL_CATEGORIES.includes(activeCategory as ConceptCategory)
      ? concepts.filter((c) => c.category === activeCategory)
      : concepts;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors">
      <ToastHandler toastParam={toastParam} />
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
       
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

      {/* About the Developer */}
      <section className="mt-20">
        <Separator className="mb-12 bg-gray-200 dark:bg-zinc-800" />
        <div className="max-w-2xl mx-auto rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8">
          {/* Header row */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src="/screenshots/profile/Mohanaprasad.jpg"
              alt="Mohanaprasad G"
              className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-amber-500/30"
            />
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Mohanaprasad G</h3>
              <p className="text-xs text-amber-500 dark:text-amber-400 font-semibold uppercase tracking-widest mt-0.5">
                Creator &amp; Developer
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-3">
            Full-stack developer with 7 years of industry experience building scalable web
            applications, cloud-native solutions on AWS, and generative AI integrations. I work
            across the entire product lifecycle — from backend architecture to polished frontend
            experiences.
          </p>

          {/* Why built */}
          <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-6">
            I built this app because mastering Claude Code&apos;s full potential takes time and
            there&apos;s no single structured resource for it. This platform is my way of sharing
            what I&apos;ve learned — giving developers a hands-on path from CLI basics to advanced
            agentic workflows, completely free.
          </p>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <a
              href="https://www.linkedin.com/in/mohanaprasad-g-23926a209"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Linkedin className="w-4 h-4" />
              linkedin.com/in/mohanaprasad-g-23926a209
            </a>
            <a
              href="mailto:mohanaprasadgmp@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-zinc-400 hover:underline"
            >
              <Mail className="w-4 h-4" />
              mohanaprasadgmp@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 mt-16 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-gray-400 dark:text-zinc-600">
          &copy; {new Date().getFullYear()} Mohanaprasad G. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
