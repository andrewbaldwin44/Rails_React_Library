import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const getStoredValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue());

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {}
  };

  return { storedValue, setStoredValue: setValue };
}
