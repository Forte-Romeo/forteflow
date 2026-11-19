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

import { registerSchema } from '../schemas/auth.schemas.ts';
import type { RegisterFormValues } from '../types/auth.types.ts';
import { simulateMockSubmission } from '../utils/mock-submit.ts';

export default function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setSuccessMessage('');

    await simulateMockSubmission();

    console.info('Mock registration submission:', values);

    setSuccessMessage(
      'Your registration form was submitted successfully. Account creation will be available when authentication is connected.',
    );
  }

  return (
    <AuthLayout maxWidth="md">
      <AuthHeader
        title="Create your account"
        description="Start managing your business with ForteFlow."
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
            id="fullName"
            label="Full name"
            placeholder="John Doe"
            autoComplete="name"
            {...register('fullName')}
            error={errors.fullName?.message}
          />

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
                autoComplete="new-password"
                helperText="At least 8 characters, including uppercase, lowercase and a number."
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PasswordInput
                id="confirmPassword"
                label="Confirm password"
                value={field.value}
                onChange={field.onChange}
                error={errors.confirmPassword?.message}
                autoComplete="new-password"
                placeholder="Re-enter your password"
              />
            )}
          />

          <div className="space-y-2">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                {...register('acceptTerms')}
                className="mt-0.5 size-4 shrink-0 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-ring"
              />

              <span>
                I agree to the{' '}
                <a
                  href="#terms"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#privacy"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            {errors.acceptTerms?.message && (
              <p role="alert" className="text-xs text-destructive">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ForteFlow. All rights reserved.
      </p>
    </AuthLayout>
  );
}
