export interface UseReactStateCacheProps<T> {
    previousValue: T;
    updatedValue: T;
}
export declare const useReactStateCache: <T extends object>({ previousValue, updatedValue, }: UseReactStateCacheProps<T>) => T;
