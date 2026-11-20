import { lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/app/layout/app-layout';
import { PageHeader } from '@/components/shared/page-header';

const DashboardPage = lazy(
  () => import('@/features/dashboard/pages/dashboard-page'),
);

const LoginPage = lazy(() => import('@/features/auth/pages/login-page'));

const RegisterPage = lazy(() => import('@/features/auth/pages/register-page'));

const ForgotPasswordPage = lazy(
  () => import('@/features/auth/pages/forgot-password-page'),
);

const ResetPasswordPage = lazy(
  () => import('@/features/auth/pages/reset-password-page'),
);

function PlaceholderPage({ title }: { title: string }) {
  return (
    <PageHeader
      title={title}
      description={`${title} management will be implemented in a future development phase.`}
    />
  );
}

function PageLoading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-muted-foreground">Loading page...</p>
    </div>
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
        <Route
          path="/login"
          element={
            <Suspense fallback={<PageLoading />}>
              <LoginPage />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={<PageLoading />}>
              <RegisterPage />
            </Suspense>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<PageLoading />}>
              <ForgotPasswordPage />
            </Suspense>
          }
        />

        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<PageLoading />}>
              <ResetPasswordPage />
            </Suspense>
          }
        />

        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<PageLoading />}>
                <DashboardPage />
              </Suspense>
            }
          />

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
