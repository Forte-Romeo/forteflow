import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export type BadgeVariant =
  'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-muted text-muted-foreground border-border',

  primary: 'bg-secondary text-secondary-foreground border-transparent',

  success: 'bg-success-surface text-success border-transparent',

  warning: 'bg-warning-surface text-warning border-transparent',

  danger: 'bg-danger-surface text-danger border-transparent',

  info: 'bg-info-surface text-info border-transparent',
};

export function Badge({
  variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1',
        'text-xs font-medium leading-none',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
