import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import { projects } from '../data/dashboard-data.ts';

import type { ProjectProgress as ProjectProgressType } from '../types/dashboard.types.ts';

const statusConfig: Record<
  ProjectProgressType['status'],
  { label: string; variant: 'success' | 'warning' | 'default' }
> = {
  'on-track': {
    label: 'On track',
    variant: 'success',
  },
  'at-risk': {
    label: 'At risk',
    variant: 'warning',
  },
  completed: {
    label: 'Completed',
    variant: 'default',
  },
};

export function ProjectProgress() {
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project progress</CardTitle>

          <CardDescription className="mt-1">
            Track your ongoing projects.
          </CardDescription>
        </div>

        <button
          type="button"
          onClick={() => navigate('/projects')}
          aria-label="View all projects"
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg text-muted-foreground
            hover:bg-surface-hover hover:text-foreground
          "
        >
          <ArrowRight size={18} />
        </button>
      </CardHeader>

      <CardContent className="space-y-6">
        {projects.map((project) => {
          const status = statusConfig[project.status];

          return (
            <div key={project.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {project.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {project.client}
                  </p>
                </div>

                <Badge variant={status.variant}>{status.label}</Badge>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {project.dueDate}
                </p>

                <p className="text-xs font-semibold tabular-nums text-foreground">
                  {project.progress}%
                </p>
              </div>

              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted"
                role="progressbar"
                aria-label={`${project.name} completion`}
                aria-valuenow={project.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`
                    h-full rounded-full transition-all
                    ${
                      project.status === 'completed'
                        ? 'bg-success'
                        : project.status === 'at-risk'
                          ? 'bg-warning'
                          : 'bg-primary'
                    }
                  `}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
