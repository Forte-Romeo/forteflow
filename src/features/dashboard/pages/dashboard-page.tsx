import { FolderKanban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';
import { PageHeader } from '@/components/shared/page-header.tsx';

import { ActivityFeed } from '../components/activity-feed.tsx';
import { ProjectProgress } from '../components/project-progress.tsx';
import { RevenueChart } from '../components/revenue-chart.tsx';
import { StatCard } from '../components/stat-card.tsx';
import { TaskOverview } from '../components/task-overview.tsx';

import { dashboardStats } from '../data/dashboard-data.ts';

function DashboardPage() {
  const navigate = useNavigate();

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? 'Good morning'
      : currentHour < 18
        ? 'Good afternoon'
        : 'Good evening';

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${greeting}, Forte`}
        description="Here's what's happening across your workspace."
        action={
          <Button
            leftIcon={<FolderKanban size={16} />}
            onClick={() => navigate('/projects')}
          >
            View projects
          </Button>
        }
      />

      <div
        className="
        flex items-center gap-2 rounded-lg
        border border-border bg-surface px-4 py-3
      "
      >
        <span className="h-2 w-2 rounded-full bg-warning" />

        <p className="text-xs text-muted-foreground">
          You're viewing sample workspace data. Dashboard figures are not
          connected to a live backend.
        </p>
      </div>

      <section aria-label="Workspace statistics">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Workspace overview
          </h2>

          <span className="text-xs text-muted-foreground">
            Compared to last month
          </span>
        </div>

        <div
          className="
          grid grid-cols-1 gap-4
          sm:grid-cols-2 xl:grid-cols-4
        "
        >
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <section
        aria-label="Revenue and project progress"
        className="grid grid-cols-1 gap-6 xl:grid-cols-3"
      >
        <div className="min-w-0 xl:col-span-2">
          <RevenueChart />
        </div>

        <div className="min-w-0">
          <ProjectProgress />
        </div>
      </section>

      <section
        aria-label="Tasks and recent activity"
        className="grid grid-cols-1 gap-6 xl:grid-cols-2"
      >
        <TaskOverview />
        <ActivityFeed />
      </section>
    </div>
  );
}

export default DashboardPage;
