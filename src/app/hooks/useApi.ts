import { useState, useCallback } from "react";
import { AxiosError } from "axios";

export function useApi<P, T>(apiCall: (params: P) => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(
        async (params: P) => {
            setIsLoading(true);
            try {
                const result = await apiCall(params);
                setData(result);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        },
        [apiCall]
    );

    return { data, error, isLoading, fetchData };
}