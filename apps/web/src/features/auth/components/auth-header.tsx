import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          F
        </span>
        ForteFlow
        <ArrowUpRight className="size-3.5 text-muted-foreground" />
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
