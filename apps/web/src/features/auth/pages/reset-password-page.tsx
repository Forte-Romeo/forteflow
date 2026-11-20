import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

import { AuthHeader, AuthLayout, PasswordInput } from '../index.ts';

import { resetPasswordSchema } from '../schemas/auth.schemas.ts';
import type { ResetPasswordFormValues } from '../types/auth.types.ts';
import { simulateMockSubmission } from '../utils/mock-submit.ts';

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    await simulateMockSubmission();

    console.info('Mock password reset submission:', values);

    setSubmitted(true);
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Create a new password"
        description="Choose a strong password to secure your account."
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8">
        {submitted ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-7" />
            </div>

            <h2 className="text-lg font-semibold text-foreground">
              Password form completed
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your new password passed the frontend checks. No password has
              actually been changed because reset-token verification and backend
              integration are not implemented yet.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Return to sign in
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-5 rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-xs leading-5 text-muted-foreground">
                Frontend demonstration: this page does not verify a password
                reset token. Actual password changes will require backend
                verification.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    id="password"
                    label="New password"
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
                    label="Confirm new password"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.confirmPassword?.message}
                    autoComplete="new-password"
                    placeholder="Re-enter your new password"
                  />
                )}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Updating password...' : 'Reset password'}
              </button>
            </form>
          </>
        )}

        {!submitted && (
          <div className="mt-6 border-t border-border pt-5">
            <Link
              to="/login"
              className="flex items-center justify-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
