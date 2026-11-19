import type { InputHTMLAttributes, ReactNode } from 'react';

import { Input } from '@/components/ui/input.tsx';

interface AuthFormFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id'
> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  trailingElement?: ReactNode;
}

export function AuthFormField({
  id,
  label,
  error,
  helperText,
  trailingElement,
  className,
  ...inputProps
}: AuthFormFieldProps) {
  const messageId = `${id}-message`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>

        {trailingElement}
      </div>

      <Input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error || helperText ? messageId : undefined}
        className={className}
        {...inputProps}
      />

      {error && (
        <p id={messageId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={messageId} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}
