import { useEffect } from 'react';

export default function useEventListener<Handler>(
  eventName: string,
  handler:  Handler,
  element: Window | Document | HTMLElement = window,
): void {
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    element.addEventListener(eventName, handler as EventListenerOrEventListenerObject);

    return () => {
      element.removeEventListener(eventName, handler as EventListenerOrEventListenerObject);
    };
  }, [eventName, element]);
}
