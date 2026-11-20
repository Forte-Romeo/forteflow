import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md';
}

export function AuthLayout({ children, maxWidth = 'sm' }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)/8%,transparent_60%)]" />

      <div
        className={`relative z-10 w-full ${
          maxWidth === 'sm' ? 'max-w-md' : 'max-w-lg'
        }`}
      >
        {children}
      </div>
    </main>
  );
}
