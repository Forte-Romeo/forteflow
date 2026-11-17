import { NavLink } from 'react-router-dom';

import type { NavigationItem as NavigationItemType } from '@/lib/navigation.ts';

interface NavigationItemProps {
  item: NavigationItemType;
  onNavigate?: () => void;
}

export function NavigationItem({ item, onNavigate }: NavigationItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      className={({ isActive }) =>
        `
          flex items-center gap-3 rounded-lg px-3 py-2.5
          text-sm font-medium transition-colors
          ${
            isActive
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:bg-surface-hover hover:text-foreground'
          }
        `
      }
    >
      <Icon size={18} aria-hidden="true" />
      <span>{item.label}</span>
    </NavLink>
  );
}
