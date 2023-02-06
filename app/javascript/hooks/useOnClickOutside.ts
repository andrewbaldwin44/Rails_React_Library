import { useEffect } from 'react';

interface IOnClickOutsideOptions {
  exceptions: React.RefObject<HTMLElement>[];
  shouldAddListeners?: boolean;
}

export default function useOnClickOutside<
  RefType extends React.RefObject<HTMLElement>,
  Handler extends (...args: any) => any = () => void,
>(
  ref: RefType,
  handler: Handler,
  { exceptions = [], shouldAddListeners = true }: IOnClickOutsideOptions = {
    exceptions: [],
    shouldAddListeners: true,
  },
) {
  useEffect(() => {
    if (!shouldAddListeners) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !ref?.current ||
        ref?.current.contains(event.target as HTMLElement) ||
        exceptions.some(
          exceptionRef =>
            exceptionRef.current && exceptionRef.current.contains(event.target as HTMLElement),
        )
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
