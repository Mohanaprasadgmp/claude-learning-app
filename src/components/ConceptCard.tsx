import Link from 'next/link';
import { Concept, difficultyBadgeStyles } from '@/data/concepts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ConceptCardProps {
  concept: Concept;
  compact?: boolean;
}

export default function ConceptCard({ concept, compact = false }: ConceptCardProps) {
  return (
    <Link
      href={`/concepts/${concept.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 rounded-xl"
    >
      <Card
        className={`
          h-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900
          transition-all duration-200
          group-hover:-translate-y-1 group-hover:border-amber-400/60 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.12)]
        `}
      >
        <CardContent className={compact ? 'p-4' : 'p-6'}>
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
            className={`font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-50 transition-colors ${
              compact ? 'text-base' : 'text-lg'
            }`}
          >
            {concept.title}
          </h3>

          {/* Short description */}
          <p className={`text-gray-500 dark:text-zinc-400 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
            {concept.shortDesc}
          </p>

          {/* Difficulty */}
          <div className="mt-4">
            <Badge
              variant="outline"
              className={difficultyBadgeStyles[concept.difficulty]}
            >
              {concept.difficulty}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
