import { useState } from 'react';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import { revenueData } from '../data/dashboard-data';

import type { RevenuePeriod } from '../types/dashboard.types';

const periods: RevenuePeriod[] = ['7D', '30D', '90D'];

export function RevenueChart() {
  const [period, setPeriod] = useState<RevenuePeriod>('30D');

  const data = revenueData[period];

  return (
    <Card className="h-full">
      <CardHeader
        className="
        flex flex-col gap-4 sm:flex-row
        sm:items-center sm:justify-between
      "
      >
        <div>
          <CardTitle>Revenue overview</CardTitle>

          <CardDescription className="mt-1">
            Revenue generated over time.
          </CardDescription>
        </div>

        <div
          className="flex items-center gap-1 rounded-lg bg-surface-muted p-1"
          aria-label="Revenue chart time period"
        >
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={period === item}
              onClick={() => setPeriod(item)}
              className={`
                rounded-md px-3 py-1.5 text-xs font-medium
                transition-colors
                ${
                  period === item
                    ? 'bg-surface text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-5">
          <p className="text-3xl font-bold tracking-tight text-foreground">
            GHS 12,400
          </p>

          <p className="mt-1 text-xs text-success">
            18% increase compared to the previous month
          </p>
        </div>

        <div className="h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 8,
                left: -15,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="revenue-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: 'var(--muted-foreground)',
                  fontSize: 11,
                }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: 'var(--muted-foreground)',
                  fontSize: 11,
                }}
                tickFormatter={(value: number) => `₵${value / 1000}k`}
                width={55}
              />

              <Tooltip
                cursor={{
                  stroke: 'var(--border-strong)',
                  strokeDasharray: '4 4',
                }}
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  color: 'var(--foreground)',
                  boxShadow: 'var(--shadow-md)',
                }}
                labelStyle={{
                  color: 'var(--muted-foreground)',
                  marginBottom: '4px',
                }}
                formatter={(value) => [
                  `GHS ${Number(value).toLocaleString('en-GH')}`,
                  'Revenue',
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary)"
                strokeWidth={2.5}
                fill="url(#revenue-gradient)"
                activeDot={{
                  r: 5,
                  fill: 'var(--primary)',
                  stroke: 'var(--surface)',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
