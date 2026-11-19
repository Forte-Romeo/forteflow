import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import {
  AuthFormField,
  AuthHeader,
  AuthLayout,
  PasswordInput,
} from '../index.ts';

import { loginSchema } from '../schemas/auth.schemas.ts';
import type { LoginFormValues } from '../types/auth.types.ts';
import { simulateMockSubmission } from '../utils/mock-submit.ts';

export default function LoginPage() {
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setSuccessMessage('');

    await simulateMockSubmission();

    console.info('Mock login submission:', values);

    setSuccessMessage(
      'Your form was submitted successfully. Real authentication will be connected in a future phase.',
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome back"
        description="Sign in to continue to your ForteFlow workspace."
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {successMessage && (
            <div
              role="status"
              className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-foreground"
            >
              {successMessage}
            </div>
          )}

          <AuthFormField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                id="password"
                label="Password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password?.message}
                autoComplete="current-password"
              />
            )}
          />

          <div className="flex items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="size-4 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-ring"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            Create an account
          </Link>
        </p>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ForteFlow. All rights reserved.
      </p>
    </AuthLayout>
  );
}
