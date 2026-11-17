import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/app/providers/use-theme.ts';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="
        inline-flex h-10 w-10 items-center justify-center
        rounded-lg border border-border bg-surface
        text-muted-foreground transition-colors
        hover:bg-surface-hover hover:text-foreground
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-ring
      "
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
