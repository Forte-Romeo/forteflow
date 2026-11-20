import { Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

import { NavigationItem } from '@/components/layout/navigation-item.tsx';
import { navigationGroups } from '@/lib/navigation.ts';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Workflow size={20} aria-hidden="true" />
        </div>

        <Link
          to="/dashboard"
          onClick={onNavigate}
          className="text-lg font-bold tracking-tight text-foreground"
        >
          ForteFlow
        </Link>
      </div>

      <nav
        aria-label="Main navigation"
        className="flex-1 space-y-7 overflow-y-auto px-4 py-6"
      >
        {navigationGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => (
                <NavigationItem
                  key={item.href}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-xl bg-surface-muted p-3">
          <p className="text-sm font-medium text-foreground">
            ForteFlow Workspace
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Your business, organized.
          </p>
        </div>
      </div>
    </aside>
  );
}
