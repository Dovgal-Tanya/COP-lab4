import { useEffect, useState } from 'react';

export interface UseFetchResult<T> {
    data: T;
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(
    fetcher: (signal: AbortSignal) => Promise<T>,
    initialData: T,
    deps: React.DependencyList = []
): UseFetchResult<T> {
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        let active = true;

        setLoading(true);
        setError(null);

        fetcher(controller.signal)
            .then((result) => {
                if (!active) return;
                setData(result);
                setLoading(false);
            })
            .catch((err: unknown) => {
                if (!active || controller.signal.aborted) return;
                setError(err instanceof Error ? err.message : 'Помилка завантаження даних');
                setLoading(false);
            });

        return () => {
            active = false;
            controller.abort();
        };
    }, deps);

    return { data, loading, error };
}