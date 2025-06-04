import apiService from "./api.services";
import { Comment, ApiResponse } from "../types/index";

// Retrieves all comments.
export const getComments = async (): Promise<Comment[]> => {
    return await apiService.get<Comment[]>("/comments");
};

// Creates a new comment.
export const createComment = async (data: any): Promise<Comment> => {
    return await apiService.post<Comment>("/comments", data);
};

// Updates a comment by its ID.
export const updateComment = async (commentId: string, data: any): Promise<Comment> => {
    return await apiService.put<Comment>(`/comments/${commentId}`, data);
};

// Deletes a comment by its ID.
export const deleteComment = async (commentId: string): Promise<ApiResponse<Comment>> => {
    return await apiService.delete<ApiResponse<Comment>>(`/comments/${commentId}`);
};

// Likes a comment (POST /comments/:commentId/like).
export const likeComment = async (commentId: string): Promise<ApiResponse<Comment>> => {
    return await apiService.post<ApiResponse<Comment>>(`/comments/${commentId}/like`, {});
};

// Unlikes a comment (DELETE /comments/:commentId/like).
export const unlikeComment = async (commentId: string): Promise<ApiResponse<Comment>> => {
    return await apiService.delete<ApiResponse<Comment>>(`/comments/${commentId}/like`);
};