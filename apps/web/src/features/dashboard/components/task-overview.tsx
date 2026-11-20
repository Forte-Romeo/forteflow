import { ArrowRight, CheckCircle2, Circle, Clock3 } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import { dashboardTasks, taskSummary } from '../data/dashboard-data.ts';

import type { DashboardTask } from '../types/dashboard.types.ts';

const priorityConfig: Record<
  DashboardTask['priority'],
  { label: string; variant: 'default' | 'warning' | 'danger' }
> = {
  low: {
    label: 'Low',
    variant: 'default',
  },
  medium: {
    label: 'Medium',
    variant: 'warning',
  },
  high: {
    label: 'High',
    variant: 'danger',
  },
};

export function TaskOverview() {
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Task overview</CardTitle>

          <CardDescription className="mt-1">
            Tasks that need your attention.
          </CardDescription>
        </div>

        <button
          type="button"
          onClick={() => navigate('/tasks')}
          aria-label="View all tasks"
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg text-muted-foreground
            hover:bg-surface-hover hover:text-foreground
          "
        >
          <ArrowRight size={18} />
        </button>
      </CardHeader>

      <CardContent>
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-lg bg-surface-muted p-3">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              {taskSummary.completed}
            </p>
          </div>

          <div className="rounded-lg bg-surface-muted p-3">
            <p className="text-xs text-muted-foreground">In progress</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              {taskSummary.inProgress}
            </p>
          </div>

          <div className="rounded-lg bg-surface-muted p-3">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              {taskSummary.pending}
            </p>
          </div>

          <div className="rounded-lg bg-surface-muted p-3">
            <p className="text-xs text-muted-foreground">Overdue</p>
            <p className="mt-1 text-xl font-bold text-danger">
              {taskSummary.overdue}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {dashboardTasks.map((task) => {
            const priority = priorityConfig[task.priority];

            return (
              <div key={task.id} className="flex items-start gap-3">
                <div className="mt-0.5 text-muted-foreground">
                  {task.status === 'completed' ? (
                    <CheckCircle2 size={18} className="text-success" />
                  ) : task.status === 'in-progress' ? (
                    <Clock3 size={18} className="text-primary" />
                  ) : (
                    <Circle size={18} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`
                      truncate text-sm font-medium
                      ${
                        task.status === 'completed'
                          ? 'text-muted-foreground line-through'
                          : 'text-foreground'
                      }
                    `}
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {task.project}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant={priority.variant}>
                      {priority.label} priority
                    </Badge>

                    <span className="text-xs text-muted-foreground">
                      {task.dueDate}
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
