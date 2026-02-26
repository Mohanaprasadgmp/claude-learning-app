'use client';

import { useRouter } from 'next/navigation';
import { ConceptCategory } from '@/data/concepts';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: ConceptCategory[];
  activeCategory: string;
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter();

  const handleFilter = (cat: string) => {
    if (cat === activeCategory) {
      router.push('/');
    } else {
      router.push(`/?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      <Button
        role="tab"
        aria-selected={activeCategory === ''}
        variant="ghost"
        size="sm"
        onClick={() => handleFilter('')}
        className={`rounded-full ${
          activeCategory === ''
            ? 'bg-amber-500 dark:bg-amber-400 text-white dark:text-zinc-900 hover:bg-amber-600 dark:hover:bg-amber-300'
            : 'text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700'
        }`}
      >
        All
      </Button>

      {categories.map((cat) => (
        <Button
          key={cat}
          role="tab"
          aria-selected={activeCategory === cat}
          variant="ghost"
          size="sm"
          onClick={() => handleFilter(cat)}
          className={`rounded-full ${
            activeCategory === cat
              ? 'bg-amber-500 dark:bg-amber-400 text-white dark:text-zinc-900 hover:bg-amber-600 dark:hover:bg-amber-300'
              : 'text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700'
          }`}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
