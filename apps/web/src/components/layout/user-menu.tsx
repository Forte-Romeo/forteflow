import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="
          flex items-center gap-2 rounded-lg p-1.5
          transition-colors hover:bg-surface-hover
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring
        "
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
          FR
        </div>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-foreground">Forte Romeo</p>

          <p className="text-xs text-muted-foreground">Workspace owner</p>
        </div>

        <ChevronDown
          size={16}
          className="hidden text-muted-foreground sm:block"
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div
            role="menu"
            className="
              absolute right-0 z-50 mt-2 w-56
              rounded-xl border border-border
              bg-surface p-2 shadow-lg
            "
          >
            <div className="border-b border-border px-3 py-2">
              <p className="text-sm font-medium text-foreground">Forte Romeo</p>

              <p className="text-xs text-muted-foreground">
                Development account
              </p>
            </div>

            <Link
              to="/settings"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="
                mt-1 flex items-center gap-3 rounded-lg
                px-3 py-2 text-sm text-muted-foreground
                hover:bg-surface-hover hover:text-foreground
              "
            >
              <Settings size={16} />
              Settings
            </Link>

            <button
              type="button"
              role="menuitem"
              disabled
              className="
                flex w-full items-center gap-3 rounded-lg
                px-3 py-2 text-sm text-muted-foreground
                opacity-50
              "
            >
              <LogOut size={16} />
              Sign out (coming later)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
