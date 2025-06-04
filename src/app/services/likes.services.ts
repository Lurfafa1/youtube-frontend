import apiService from "./api.services";
import { Like } from "../types/index";

// Creates (or toggles) a like for a resource.
// The API expects the resource identifier (likedId) and the like state (true for like, false for unlike)
// to be sent in the request body.
export const createLike = async (
    likedType: "Video" | "Post" | "Comment",
    data: { likedId: string; like: boolean }
): Promise<Like> => {
    // Calls endpoint: POST /likes/:likedType
    return await apiService.post<Like>(`/likes/${likedType}`, data);
};

// Retrieves the count of likes for a specific resource.
// Calls endpoint: GET /likes/:likedType/:likedId/count
export const countLikes = async (
    likedType: "Video" | "Post" | "Comment",
    likedId: string
): Promise<number> => {
    return await apiService.get<number>(`/likes/${likedType}/${likedId}/count`);
};