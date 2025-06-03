import api from "../lib/axios";
import { ApiResponse, ApiError, Post, Comment, Like, Subscription, PaginatedResponse } from "../types";


const apiService = {
    get: async <T>(endpoint: string): Promise<T> => {
        try {
            const response = await api.get<ApiResponse<T>>(endpoint);
            return response.data.data;
        } catch (error: any) {
            // Handle error
            console.error("API Error:", error);
            throw new ApiError(error.message || "Something went wrong", error.response?.status || 500);
        }
    },
    post: async <T>(endpoint: string, data: any): Promise<T> => {
        try {
            const response = await api.post<ApiResponse<T>>(endpoint, data);
            return response.data.data;
        } catch (error: any) {
            // Handle error
            console.error("API Error:", error);
            throw new ApiError(error.message || "Something went wrong", error.response?.status || 500);
        }
    },
    put: async <T>(endpoint: string, data: any): Promise<T> => {
        try {
            const response = await api.put<ApiResponse<T>>(endpoint, data);
            return response.data.data;
        } catch (error: any) {
            // Handle error
            console.error("API Error:", error);
            throw new ApiError(error.message || "Something went wrong", error.response?.status || 500);
        }
    },
    delete: async <T>(endpoint: string): Promise<T> => {
        try {
            const response = await api.delete<ApiResponse<T>>(endpoint);
            return response.data.data;
        } catch (error: any) {
            // Handle error
            console.error("API Error:", error);
            throw new ApiError(error.message || "Something went wrong", error.response?.status || 500);
        }
    },



    getComments: async (): Promise<Comment[]> => {
        return await apiService.get<Comment[]>("/comments");
    },
    getCommentById: async (id: number): Promise<Comment> => {
        return await apiService.get<Comment>(`/comments/${id}`);
    },
    getLikes: async (): Promise<Like[]> => {
        return await apiService.get<Like[]>("/likes");
    },
    getLikeById: async (id: number): Promise<Like> => {
        return await apiService.get<Like>(`/likes/${id}`);
    },
    getSubscriptions: async (): Promise<Subscription[]> => {
        return await apiService.get<Subscription[]>("/subscriptions");
    },
    getSubscriptionById: async (id: number): Promise<Subscription> => {
        return await apiService.get<Subscription>(`/subscriptions/${id}`);
    },
    getPaginatedPosts: async (page: number, pageSize: number): Promise<PaginatedResponse<Post>> => {
        return await apiService.get<PaginatedResponse<Post>>(`/posts?page=${page}&pageSize=${pageSize}`);
    }
};

export default apiService;