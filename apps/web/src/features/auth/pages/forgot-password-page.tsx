import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, MailCheck } from 'lucide-react';

import { AuthFormField, AuthHeader, AuthLayout } from '../index.ts';

import { forgotPasswordSchema } from '../schemas/auth.schemas.ts';
import type { ForgotPasswordFormValues } from '../types/auth.types.ts';
import { simulateMockSubmission } from '../utils/mock-submit.ts';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    await simulateMockSubmission();

    console.info('Mock password recovery submission:', values);

    setSubmitted(true);
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Forgot your password?"
        description="Enter the email address associated with your account."
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8">
        {submitted ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MailCheck className="size-7" />
            </div>

            <h2 className="text-lg font-semibold text-foreground">
              Check your inbox
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              If an account exists for this email, password reset instructions
              will be sent.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm font-medium text-primary hover:text-primary/80"
            >
              Try another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AuthFormField
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Send reset instructions'}
            </button>
          </form>
        )}

        <div className="mt-6 border-t border-border pt-5">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
