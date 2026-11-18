import type { LucideIcon } from 'lucide-react';

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

export type RevenuePeriod = '7D' | '30D' | '90D';

export interface ProjectProgress {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'completed';
  dueDate: string;
}

export interface DashboardTask {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}

export interface ActivityItem {
  id: string;
  actor: string;
  initials: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'project' | 'task' | 'invoice' | 'client';
}
