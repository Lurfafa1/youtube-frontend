import apiService from "./api.services";
import { User, ApiResponse } from "../types/index";


// Registers a new user. Often you'll send FormData if uploading files.
export const registerUser = async (formData: FormData): Promise<User> => {
    return await apiService.post<User>("/register", formData);
};

// Logs in a user with given credentials.
export const loginUser = async (credentials: { email: string; password: string }): Promise<{ accessToken: string; user: User }> => {
    return await apiService.post<{ accessToken: string; user: User }>("/login", credentials);
};

// Logs out the current user.
export const logoutUser = async (): Promise<ApiResponse<null>> => {
    return await apiService.post<ApiResponse<null>>("/logout", {});
};

// Refreshes the access token using a refresh token.
export const refreshToken = async (data: { refreshToken: string }): Promise<{ accessToken: string }> => {
    return await apiService.post<{ accessToken: string }>("/refresh-token", data);
};

// Changes the current user's password.
export const changePassword = async (data: { currentPassword: string; newPassword: string }): Promise<ApiResponse<any>> => {
    return await apiService.post<ApiResponse<any>>("/change-password", data);
};

// Gets the current logged-in user's details.
export const getCurrentUser = async (): Promise<User> => {
    return await apiService.get<User>("/current-user");
};

// Updates account details (e.g. name, email, etc.).
export const updateAccount = async (data: Partial<User>): Promise<User> => {
    return await apiService.put<User>("/update-account", data);
};

// Updates the user's avatar. Using FormData if you're uploading a file.
export const updateAvatar = async (formData: FormData): Promise<User> => {
    return await apiService.put<User>("/update-avatar", formData);
};

// Updates the user's cover image.
export const updateCoverImage = async (formData: FormData): Promise<User> => {
    return await apiService.put<User>("/update-cover-image", formData);
};

// Gets a user's channel profile (and subscriptions) based on their username.
export const getUserChannel = async (username: string): Promise<User> => {
    return await apiService.get<User>(`/c/${username}`);
};

// Gets the watch history for the current user.
export const getWatchHistory = async (): Promise<any[]> => {
    return await apiService.get<any[]>("/history");
};