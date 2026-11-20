import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { AuthFormField } from './auth-form-field.tsx';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  helperText?: string;
  disabled?: boolean;
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  error,
  placeholder = 'Enter your password',
  autoComplete,
  helperText,
  disabled = false,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <AuthFormField
        id={id}
        label={label}
        type={isVisible ? 'text' : 'password'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className="pr-11"
      />

      <button
        type="button"
        onClick={() => setIsVisible((current) => !current)}
        disabled={disabled}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        className="absolute right-3 top-[2.35rem] rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
