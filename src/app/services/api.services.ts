import api from "../lib/axios";
import { ApiResponse, ApiError, } from "../types";


const apiService = {
    get: async <T>(endpoint: string): Promise<T> => {
        try {
            const response = await api.get<ApiResponse<T>>(endpoint);
            return response.data.data;
        } catch (error: any) {
            console.error("API Error:", error);
            throw new ApiError(error.message || "Something went wrong", error.response?.status || 500);
        }
    },
    post: async <T>(endpoint: string, data: any): Promise<T> => {
        try {
            const response = await api.post<ApiResponse<T>>(endpoint, data);
            return response.data.data;
        } catch (error: any) {
            console.error("API Error:", error);
            throw new ApiError(error.message || "Something went wrong", error.response?.status || 500);
        }
    },
    put: async <T>(endpoint: string, data: any): Promise<T> => {
        try {
            const response = await api.put<ApiResponse<T>>(endpoint, data);
            return response.data.data;
        } catch (error: any) {
            console.error("API Error:", error);
            throw new ApiError(error.message || "Something went wrong", error.response?.status || 500);
        }
    },
    delete: async <T>(endpoint: string): Promise<T> => {
        try {
            const response = await api.delete<ApiResponse<T>>(endpoint);
            return response.data.data;
        } catch (error: any) {
            console.error("API Error:", error);
            throw new ApiError(error.message || "Something went wrong", error.response?.status || 500);
        }
    },
};

export default apiService;