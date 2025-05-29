import { useState, useCallback } from "react";
import { AxiosError } from "axios";

// Define a type for the API service function
type ApiServiceFunction<T> = () => Promise<T>;


export function useApi<T>(apiCall: ApiServiceFunction<T>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiCall();
            setData(response);
            return response;
        } catch (error) {
            setError(error as AxiosError);
        } finally {
            setIsLoading(false);
        }
    }, [apiCall]);


    return {
        data,
        error,
        isLoading,
        fetchData
    }

}





