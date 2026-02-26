'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CodeBlock({ language, content }: { language: string; content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-5 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-zinc-900 px-4 py-2.5 border-b border-gray-200 dark:border-zinc-800">
        <span className="text-xs font-mono text-gray-400 dark:text-zinc-500">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-gray-400 dark:text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-400/10"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span className="ml-1.5 text-xs">{copied ? 'Copied' : 'Copy'}</span>
        </Button>
      </div>
      <pre className="bg-gray-900 dark:bg-zinc-950 px-5 py-5 overflow-x-auto">
        <code className="font-mono text-sm leading-relaxed text-zinc-200 whitespace-pre">
          {content}
        </code>
      </pre>
    </div>
  );
}
