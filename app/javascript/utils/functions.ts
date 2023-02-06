export function debounce<Callback extends (...args: any[]) => any>(
  callback: Callback,
  timeout: number = 300,
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Callback>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}
