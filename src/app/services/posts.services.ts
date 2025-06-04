import apiService from "./api.services";
import { Post, ApiResponse, PaginatedResponse } from "../types/index";

// Retrieves all posts.
export const getAllPosts = async (): Promise<Post[]> => {
    return await apiService.get<Post[]>("/posts");
};

// Creates a new post. Expects FormData (e.g., includes "thumbnail" and post fields).
export const createPost = async (formData: FormData): Promise<Post> => {
    return await apiService.post<Post>("/posts", formData);
};

// Retrieves a post by its ID.
export const getPostById = async (postId: string): Promise<Post> => {
    return await apiService.get<Post>(`/posts/${postId}`);
};

// Updates a post by its ID. Expects FormData.
export const updatePost = async (postId: string, formData: FormData): Promise<Post> => {
    return await apiService.put<Post>(`/posts/${postId}`, formData);
};

// Deletes a post by its ID.
export const deletePost = async (postId: string): Promise<ApiResponse<Post>> => {
    return await apiService.delete<ApiResponse<Post>>(`/posts/${postId}`);
};

// Retrieves posts created by a specific user.
export const getPostsByUser = async (userId: string): Promise<Post[]> => {
    return await apiService.get<Post[]>(`/posts/user/${userId}/posts`);
};

export const getPaginatedPosts = async (page: number, pageSize: number): Promise<PaginatedResponse<Post>> => {
    return await apiService.get<PaginatedResponse<Post>>(`/posts?page=${page}&pageSize=${pageSize}`);
};