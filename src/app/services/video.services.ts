import apiService from "./api.services";
import { Video, ApiResponse } from "../types/index";


// Retrieves a list of videos.
export const getVideos = async (): Promise<Video[]> => {
    return await apiService.get<Video[]>("/videos");
};

// Uploads a video. Expects a FormData object with 'videoFile' and 'thumbnail' fields.
export const uploadVideo = async (formData: FormData): Promise<Video> => {
    return await apiService.post<Video>("/videos/upload", formData);
};

// Deletes a video by its ID.
export const deleteVideo = async (videoId: string): Promise<ApiResponse<Video>> => {
    return await apiService.delete<ApiResponse<Video>>(`/videos/delete/${videoId}`);
};
