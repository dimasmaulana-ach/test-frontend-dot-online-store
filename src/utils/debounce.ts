const debounceImmediate = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeout: ReturnType<typeof setTimeout> | any;

  return function (this: any, ...args: Parameters<T>): void {
    const callNow = !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
    }, delay);

    if (callNow) {
      func.apply(this, args);
    }
  };
};

export default debounceImmediate;
