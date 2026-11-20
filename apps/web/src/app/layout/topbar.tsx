import { Bell, Menu, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { ThemeToggle } from '@/components/shared/theme-toggle.tsx';
import { UserMenu } from '@/components/layout/user-menu.tsx';
import { navigationGroups } from '@/lib/navigation.ts';

interface TopbarProps {
  onOpenSidebar: () => void;
}

export function Topbar({ onOpenSidebar }: TopbarProps) {
  const location = useLocation();

  const currentPage =
    navigationGroups
      .flatMap((group) => group.items)
      .find((item) => item.href === location.pathname)?.label ?? 'Page';

  return (
    <header
      className="
      flex h-16 items-center justify-between
      border-b border-border bg-surface px-4 sm:px-6
    "
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          className="
            flex h-10 w-10 items-center justify-center
            rounded-lg text-muted-foreground
            hover:bg-surface-hover hover:text-foreground
            lg:hidden
          "
        >
          <Menu size={20} />
        </button>

        <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
          <span>Workspace</span>
          <span>/</span>
          <span className="font-medium text-foreground">{currentPage}</span>
        </div>

        <div className="sm:hidden">
          <span className="text-sm font-semibold text-foreground">
            ForteFlow
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="
            flex h-10 w-10 items-center justify-center
            rounded-lg text-muted-foreground
            hover:bg-surface-hover hover:text-foreground
          "
        >
          <Search size={19} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="
            relative flex h-10 w-10 items-center justify-center
            rounded-lg text-muted-foreground
            hover:bg-surface-hover hover:text-foreground
          "
        >
          <Bell size={19} />

          <span
            className="
            absolute right-2 top-2 h-2 w-2
            rounded-full bg-danger
          "
          />
        </button>

        <ThemeToggle />

        <div className="mx-1 h-7 w-px bg-border" />

        <UserMenu />
      </div>
    </header>
  );
}
