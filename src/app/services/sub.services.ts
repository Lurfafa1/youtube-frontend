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

// Define a type for a Subscription
export interface Subscription {
    _id: string;
    subscriber: string;
    channel: string;
    createdAt: string;
    updatedAt: string;
    // add other properties if needed (for example, channelName, avatar, etc.)
}


// Calls the backend route /c/:username to retrieve channel profile and subscriptions.
export const getChannelProfile = async (username: string): Promise<ChannelProfile> => {
    const response = await apiService.get<ApiResponse<{ channel: ChannelProfile }>>(`/c/${username}`);
    return response.data.channel;
};


// Creates a subscription (subscribe to a channel)
// Sends POST to /subscriptions with { channelId }
export const createSubscription = async (channelId: string): Promise<Subscription> => {
    const response = await apiService.post<ApiResponse<Subscription>>("/subscriptions", { channelId });
    return response.data;
};

// Retrieves all subscriptions for the logged-in user
// Calls GET /subscriptions
export const getUserSubscriptions = async (): Promise<Subscription[]> => {
    const response = await apiService.get<ApiResponse<Subscription[]>>("/subscriptions");
    return response.data;
};

// Removes a subscription (unsubscribe) for a specific channel
// Calls DELETE /subscriptions/:channelId
export const removeSubscription = async (channelId: string): Promise<Subscription> => {
    const response = await apiService.delete<ApiResponse<Subscription>>(`/subscriptions/${channelId}`);
    return response.data;
};

// Update subscription details for a specific channel
// Calls PATCH /subscriptions/:channelId with update data such as channelName or avatar
export interface SubscriptionUpdateData {
    channelName?: string;
    avatar?: string;
}
export const updateSubscription = async (
    channelId: string,
    updateData: SubscriptionUpdateData
): Promise<Subscription> => {
    const response = await apiService.patch<ApiResponse<Subscription>>(`/subscriptions/${channelId}`, updateData);
    return response.data;
};