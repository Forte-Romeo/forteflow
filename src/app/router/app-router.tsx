import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/app/layout/app-layout.tsx';
import { PageHeader } from '@/components/shared/page-header.tsx';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page.tsx';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <PageHeader
      title={title}
      description={`${title} management will be implemented in a future development phase.`}
    />
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="text-5xl font-bold text-foreground">404</p>
      <h1 className="mt-3 text-xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/clients"
            element={<PlaceholderPage title="Clients" />}
          />

          <Route
            path="/projects"
            element={<PlaceholderPage title="Projects" />}
          />

          <Route path="/tasks" element={<PlaceholderPage title="Tasks" />} />

          <Route
            path="/invoices"
            element={<PlaceholderPage title="Invoices" />}
          />

          <Route
            path="/notifications"
            element={<PlaceholderPage title="Notifications" />}
          />

          <Route
            path="/settings"
            element={<PlaceholderPage title="Settings" />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
