import { useCallback, useRef } from "react";

const useDebounce = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (func: (...args: any[]) => void, delay: number) => {
      return (...args: any[]) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          func(...args);
        }, delay);
      };
    },
    [],
  );

  return debounce;
};

export default useDebounce;
