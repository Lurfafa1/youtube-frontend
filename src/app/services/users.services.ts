import apiService from "./api.services";
import { User, ApiResponse } from "../types/index";


// Registers a new user. Often you'll send FormData if uploading files.
export const registerUser = async (formData: FormData): Promise<User> => {
    const registerEndPoint = process.env.NEXT_PRIVATE_API_URL_REGISTER || "/users/register";
    return await apiService.post<User>(registerEndPoint, formData);
};

// Logs in a user with given credentials.
export const loginUser = async (
    credentials: { email?: string; username?: string; password: string }
): Promise<{ accessToken: string; user: User }> => {
    const loginEndPoint = process.env.NEXT_PRIVATE_API_URL_LOGIN || "/users/login";
    return await apiService.post<{ accessToken: string; user: User }>(loginEndPoint, credentials);
};


// Logs out the current user.
export const logoutUser = async (): Promise<ApiResponse<null>> => {
    return await apiService.post<ApiResponse<null>>("/users/logout", {});
};

// Refreshes the access token using a refresh token.
export const refreshToken = async (data: { refreshToken: string }): Promise<{ accessToken: string }> => {
    return await apiService.post<{ accessToken: string }>("/users/refresh-token", data);
};

// Changes the current user's password.
export const changePassword = async (data: { currentPassword: string; newPassword: string }): Promise<ApiResponse<any>> => {
    return await apiService.post<ApiResponse<any>>("/users/change-password", data);
};

// Gets the current logged-in user's details.
export const getCurrentUser = async (): Promise<User> => {
    return await apiService.get<User>("/users/current-user");
};

// Updates account details (e.g. name, email, etc.).
export const updateAccount = async (data: Partial<User>): Promise<User> => {
    return await apiService.put<User>("/users/update-account", data);
};

// Updates the user's avatar. Using FormData if you're uploading a file.
export const updateAvatar = async (formData: FormData): Promise<User> => {
    return await apiService.put<User>("/users/update-avatar", formData);
};

// Updates the user's cover image.
export const updateCoverImage = async (formData: FormData): Promise<User> => {
    return await apiService.put<User>("/users/update-cover-image", formData);
};

// Gets a user's channel profile (and subscriptions) based on their username.
export const getUserChannel = async (username: string): Promise<User> => {
    return await apiService.get<User>(`/users/c/${username}`);
};

// Gets the watch history for the current user.
export const getWatchHistory = async (): Promise<any[]> => {
    return await apiService.get<any[]>("/users/history");
};