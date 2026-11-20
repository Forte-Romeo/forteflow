import { Badge, Card, CardContent } from '@/components/ui';

import type { DashboardStat } from '../types/dashboard.types.ts';

interface StatCardProps {
  stat: DashboardStat;
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;

  const badgeVariant = {
    positive: 'success',
    negative: 'danger',
    neutral: 'default',
  } as const;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            {stat.label}
          </p>

          <div
            className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl bg-secondary text-secondary-foreground
          "
          >
            <Icon size={19} aria-hidden="true" />
          </div>
        </div>

        <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">
          {stat.value}
        </p>

        <div className="mt-3">
          <Badge variant={badgeVariant[stat.changeType]}>{stat.change}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
