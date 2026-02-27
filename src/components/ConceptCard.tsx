import Link from 'next/link';
import { Concept, difficultyBadgeStyles } from '@/data/concepts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ConceptCardProps {
  concept: Concept;
  compact?: boolean;
}

export default function ConceptCard({ concept, compact = false }: ConceptCardProps) {
  const released = concept.released === true;

  const cardContent = (
    <Card
      className={`
        h-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900
        transition-all duration-200
        ${released
          ? 'group-hover:-translate-y-1 group-hover:border-amber-400/60 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.12)]'
          : 'opacity-60 cursor-not-allowed'
        }
      `}
    >
      <CardContent className={`relative ${compact ? 'p-4' : 'p-6'}`}>
        {/* Coming Soon badge */}
        {!released && (
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            <span className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Coming Soon
            </span>
            {concept.releaseDate && (
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500">
                {new Date(concept.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
        )}

        {/* Emoji */}
        <div className={compact ? 'text-3xl mb-3' : 'text-4xl mb-4'}>
          {concept.emoji}
        </div>

        {/* Category badge */}
        <Badge
          variant="outline"
          className="border-amber-500/30 dark:border-amber-400/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10 mb-3"
        >
          {concept.category}
        </Badge>

        {/* Title */}
        <h3
          className={`font-bold text-gray-900 dark:text-white mb-2 leading-snug transition-colors ${
            released ? 'group-hover:text-amber-700 dark:group-hover:text-amber-50' : ''
          } ${compact ? 'text-base' : 'text-lg'}`}
        >
          {concept.title}
        </h3>

        {/* Short description */}
        <p className={`text-gray-500 dark:text-zinc-400 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
          {concept.shortDesc}
        </p>

        {/* Difficulty */}
        <div className="mt-4">
          <Badge variant="outline" className={difficultyBadgeStyles[concept.difficulty]}>
            {concept.difficulty}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  if (!released) {
    return (
      <div className="block rounded-xl" aria-disabled="true">
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={`/concepts/${concept.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 rounded-xl"
    >
      {cardContent}
    </Link>
  );
}
