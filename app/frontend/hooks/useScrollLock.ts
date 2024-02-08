import { useEffect } from 'react';

export default function useScrollLock({ isActive }: { isActive: boolean }) {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isActive]);
}
