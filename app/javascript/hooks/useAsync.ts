import { useState, useEffect, useCallback } from 'react';

function useAsync(
  asyncFunction: (args?: any) => Promise<any>,
  { execute: shouldExecuteImmediately = false } = {},
) {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setValue(null);
    setError(null);

    return asyncFunction()
      .then(response => {
        setValue(response);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldExecuteImmediately) {
      execute();
    }
  }, [execute, shouldExecuteImmediately]);

  return { execute, isLoading, value, error };
}

export default useAsync;
