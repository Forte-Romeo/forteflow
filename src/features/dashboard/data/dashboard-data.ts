import {
  BriefcaseBusiness,
  CheckSquare,
  FolderKanban,
  TrendingUp,
} from 'lucide-react';

import type {
  ActivityItem,
  DashboardStat,
  DashboardTask,
  ProjectProgress,
  RevenueDataPoint,
  RevenuePeriod,
} from '../types/dashboard.types';

export const dashboardStats: DashboardStat[] = [
  {
    label: 'Total clients',
    value: '24',
    change: '+12% vs last month',
    changeType: 'positive',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Active projects',
    value: '08',
    change: '+8% vs last month',
    changeType: 'positive',
    icon: FolderKanban,
  },
  {
    label: 'Pending tasks',
    value: '12',
    change: '3 due today',
    changeType: 'neutral',
    icon: CheckSquare,
  },
  {
    label: 'Monthly revenue',
    value: 'GHS 12,400',
    change: '+18% vs last month',
    changeType: 'positive',
    icon: TrendingUp,
  },
];

export const revenueData: Record<RevenuePeriod, RevenueDataPoint[]> = {
  '7D': [
    { date: 'Mon', revenue: 800 },
    { date: 'Tue', revenue: 1200 },
    { date: 'Wed', revenue: 950 },
    { date: 'Thu', revenue: 1800 },
    { date: 'Fri', revenue: 1500 },
    { date: 'Sat', revenue: 2200 },
    { date: 'Sun', revenue: 1900 },
  ],

  '30D': [
    { date: 'Oct 20', revenue: 1800 },
    { date: 'Oct 24', revenue: 2400 },
    { date: 'Oct 28', revenue: 1900 },
    { date: 'Nov 01', revenue: 3100 },
    { date: 'Nov 05', revenue: 2600 },
    { date: 'Nov 09', revenue: 3800 },
    { date: 'Nov 13', revenue: 3200 },
    { date: 'Nov 17', revenue: 4500 },
  ],

  '90D': [
    { date: 'Sep 01', revenue: 4200 },
    { date: 'Sep 08', revenue: 5100 },
    { date: 'Sep 15', revenue: 4700 },
    { date: 'Sep 22', revenue: 6200 },
    { date: 'Sep 29', revenue: 5800 },
    { date: 'Oct 06', revenue: 7100 },
    { date: 'Oct 13', revenue: 6800 },
    { date: 'Oct 20', revenue: 8200 },
    { date: 'Oct 27', revenue: 7600 },
    { date: 'Nov 03', revenue: 9300 },
    { date: 'Nov 10', revenue: 10800 },
    { date: 'Nov 17', revenue: 12400 },
  ],
};

export const projects: ProjectProgress[] = [
  {
    id: 'project-001',
    name: 'Website redesign',
    client: 'Acme Digital',
    progress: 75,
    status: 'on-track',
    dueDate: 'Due Nov 25',
  },
  {
    id: 'project-002',
    name: 'Mobile application',
    client: 'Vertex Solutions',
    progress: 45,
    status: 'at-risk',
    dueDate: 'Due Nov 22',
  },
  {
    id: 'project-003',
    name: 'Brand identity',
    client: 'Northstar Studio',
    progress: 100,
    status: 'completed',
    dueDate: 'Completed Nov 15',
  },
  {
    id: 'project-004',
    name: 'CRM implementation',
    client: 'Apex Consulting',
    progress: 30,
    status: 'on-track',
    dueDate: 'Due Dec 02',
  },
];

export const taskSummary = {
  completed: 18,
  inProgress: 7,
  pending: 12,
  overdue: 2,
};

export const dashboardTasks: DashboardTask[] = [
  {
    id: 'task-001',
    title: 'Finalize homepage design',
    project: 'Website redesign',
    dueDate: 'Today',
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: 'task-002',
    title: 'Review API documentation',
    project: 'Mobile application',
    dueDate: 'Today',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'task-003',
    title: 'Prepare client presentation',
    project: 'CRM implementation',
    dueDate: 'Tomorrow',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 'task-004',
    title: 'Approve brand assets',
    project: 'Brand identity',
    dueDate: 'Nov 21',
    priority: 'low',
    status: 'completed',
  },
];

export const recentActivities: ActivityItem[] = [
  {
    id: 'activity-001',
    actor: 'Forte Romeo',
    initials: 'FR',
    action: 'created a new project',
    target: 'CRM implementation',
    timestamp: '10 minutes ago',
    type: 'project',
  },
  {
    id: 'activity-002',
    actor: 'Ama Mensah',
    initials: 'AM',
    action: 'completed a task',
    target: 'Homepage wireframe',
    timestamp: '35 minutes ago',
    type: 'task',
  },
  {
    id: 'activity-003',
    actor: 'Forte Romeo',
    initials: 'FR',
    action: 'sent an invoice to',
    target: 'Acme Digital',
    timestamp: '2 hours ago',
    type: 'invoice',
  },
  {
    id: 'activity-004',
    actor: 'Kofi Asare',
    initials: 'KA',
    action: 'added a new client',
    target: 'Vertex Solutions',
    timestamp: 'Yesterday',
    type: 'client',
  },
];
