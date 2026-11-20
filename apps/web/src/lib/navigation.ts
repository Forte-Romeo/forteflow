import {
  Bell,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Workspace',
    items: [
      {
        label: 'Overview',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        label: 'Clients',
        href: '/clients',
        icon: Users,
      },
      {
        label: 'Projects',
        href: '/projects',
        icon: FolderKanban,
      },
      {
        label: 'Tasks',
        href: '/tasks',
        icon: CheckSquare,
      },
      {
        label: 'Invoices',
        href: '/invoices',
        icon: Receipt,
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        label: 'Notifications',
        href: '/notifications',
        icon: Bell,
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
      },
    ],
  },
];
