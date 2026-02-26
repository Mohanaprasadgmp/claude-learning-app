'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  // resolvedTheme is undefined during SSR / before hydration
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) return <div className="h-8 w-8" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="h-8 w-8 px-0 text-zinc-500 hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 hover:bg-amber-500/10"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
