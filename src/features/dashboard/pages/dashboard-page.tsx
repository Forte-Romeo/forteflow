import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckSquare,
  FolderKanban,
  Plus,
  TrendingUp,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import { PageHeader } from '@/components/shared/page-header.tsx';

const statistics = [
  {
    label: 'Total clients',
    value: '24',
    change: '+12%',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Active projects',
    value: '08',
    change: '+8%',
    icon: FolderKanban,
  },
  {
    label: 'Pending tasks',
    value: '12',
    change: '3 due today',
    icon: CheckSquare,
  },
  {
    label: 'Monthly revenue',
    value: 'GHS 12,400',
    change: '+18%',
    icon: TrendingUp,
  },
];

export function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Overview"
        description="Here's what's happening in your workspace."
        action={<Button leftIcon={<Plus size={16} />}>Create new</Button>}
      />

      <section
        aria-label="Workspace statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {statistics.map((statistic) => {
          const Icon = statistic.icon;

          return (
            <Card key={statistic.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {statistic.label}
                  </p>

                  <div
                    className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg bg-secondary text-secondary-foreground
                  "
                  >
                    <Icon size={18} />
                  </div>
                </div>

                <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                  {statistic.value}
                </p>

                <div className="mt-2">
                  <Badge variant="success">{statistic.change}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              A summary of recent workspace activity.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex min-h-48 flex-col items-center justify-center text-center">
              <div
                className="
                flex h-12 w-12 items-center justify-center
                rounded-full bg-surface-muted text-muted-foreground
              "
              >
                <TrendingUp size={22} />
              </div>

              <p className="mt-3 text-sm font-medium text-foreground">
                Your activity will appear here
              </p>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Once your workspace features are connected, recent updates and
                events will be displayed here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Common workspace actions.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between"
              leftIcon={<BriefcaseBusiness size={16} />}
              rightIcon={<ArrowUpRight size={15} />}
            >
              Add a client
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              leftIcon={<FolderKanban size={16} />}
              rightIcon={<ArrowUpRight size={15} />}
            >
              Create a project
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              leftIcon={<CheckSquare size={16} />}
              rightIcon={<ArrowUpRight size={15} />}
            >
              Create a task
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
