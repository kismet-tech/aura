import { deepEqual } from "../deepEqual";

export interface UseReactStateCacheProps<T> {
  previousValue: T;
  updatedValue: T;
}

export const useReactStateCache = <T extends object>({
  previousValue,
  updatedValue,
}: UseReactStateCacheProps<T>) => {
  if (deepEqual<T>(updatedValue, previousValue)) {
    return previousValue;
  } else {
    return updatedValue;
  }
};
