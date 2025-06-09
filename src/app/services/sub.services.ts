import apiService from "./api.services";
import { ApiResponse } from "../types";

// Define a type for the channel profile; adjust properties as needed.
export interface ChannelProfile {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    avatar: string;
    coverImage: string;
    myChannelSubscribersCount: number;
    mySubscriptionsCount: number;
    isSubscribed: boolean;
    createdAt: string;
}

// Calls the backend route /c/:username to retrieve channel profile and subscriptions.
export const getChannelProfile = async (username: string): Promise<ChannelProfile> => {
    const response = await apiService.get<ApiResponse<{ channel: ChannelProfile }>>(`/c/${username}`);
    return response.data.channel;
};
