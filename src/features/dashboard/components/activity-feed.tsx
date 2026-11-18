import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  UserRound,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import { recentActivities } from '../data/dashboard-data.ts';

import type { ActivityItem } from '../types/dashboard.types.ts';

const activityIcons: Record<ActivityItem['type'], LucideIcon> = {
  project: BriefcaseBusiness,
  task: CheckCircle2,
  invoice: FileText,
  client: UserRound,
};

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent activity</CardTitle>

        <CardDescription className="mt-1">
          The latest updates from your workspace.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {recentActivities.map((activity) => {
            const Icon = activityIcons[activity.type];

            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className="
                  flex h-10 w-10 shrink-0 items-center
                  justify-center rounded-full
                  bg-secondary text-xs font-semibold
                  text-secondary-foreground
                "
                >
                  {activity.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-relaxed text-foreground">
                    <span className="font-semibold">{activity.actor}</span>{' '}
                    <span className="text-muted-foreground">
                      {activity.action}
                    </span>{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Icon size={13} className="text-muted-foreground" />

                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
