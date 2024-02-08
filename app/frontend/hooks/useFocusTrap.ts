import { useEffect, RefObject } from 'react';

import useEventListener from '~/hooks/useEventListener';

export default function useFocusTrap(elementRef: RefObject<HTMLElement>) {
  useEffect(() => {
    elementRef.current && elementRef.current.focus();
  }, []);

  const keyDownHandler = (event: KeyboardEvent) => {
    // Only execute if tab is pressed
    if (event.key !== 'Tab') return;

    // Query all focusable elements
    const focusableModalElements = elementRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]',
    );

    if (!focusableModalElements) return;

    const firstElement = focusableModalElements[0] as HTMLElement;
    const lastElement = focusableModalElements[focusableModalElements.length - 1] as HTMLElement;

    // If moving from lastElement
    // Shift focus to first focusable element
    if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
      return;
    }

    // If moving going backwards from firstElement
    // Shift focus to last focusable element
    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    }
  };

  useEventListener<'keydown'>('keydown', keyDownHandler);
}
