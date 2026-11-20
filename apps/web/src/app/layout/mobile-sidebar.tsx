import { X } from 'lucide-react';

import { Sidebar } from './sidebar.tsx';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div
        className="
        absolute inset-y-0 left-0
        w-72 max-w-[85vw] bg-surface shadow-xl
      "
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="
            absolute right-3 top-3 z-10
            flex h-9 w-9 items-center justify-center
            rounded-lg text-muted-foreground
            hover:bg-surface-hover
          "
        >
          <X size={19} />
        </button>

        <Sidebar onNavigate={onClose} />
      </div>
    </div>
  );
}
