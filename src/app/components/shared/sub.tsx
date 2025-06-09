import React, { useEffect, useState, useCallback } from "react";
import { getChannelProfile, ChannelProfile } from "../../services/sub.services";
import Subscribe from "./subscribe";

interface ChannelProfileWithSubscribeProps {
    username: string;
}

const ChannelProfileWithSubscribe: React.FC<ChannelProfileWithSubscribeProps> = ({ username }) => {
    const [channel, setChannel] = useState<ChannelProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch channel data from the backend
    const fetchChannel = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getChannelProfile(username);
            setChannel(data);
        } catch (err: any) {
            setError(err.message || "Failed to load channel data.");
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchChannel();
    }, [fetchChannel]);

    // This callback is passed to the Subscribe component.
    // When called, it will re-sync the channel data with the latest state on the backend.
    const handleSubscriptionChange = async () => {
        await fetchChannel();
    };

    if (isLoading) return <p>Loading channel...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!channel) return null;

    return (
        <div>
            {/* Cover Image */}
            <div
                style={{
                    backgroundImage: `url(${channel.coverImage})`,
                    height: "200px",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />
            <div style={{ display: "flex", alignItems: "center", marginTop: "-50px" }}>
                <img
                    src={channel.avatar}
                    alt={channel.username}
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        border: "3px solid white",
                        objectFit: "cover"
                    }}
                />
                <div style={{ marginLeft: "20px" }}>
                    <h2>{channel.username}</h2>
                    <p>{channel.fullname}</p>
                    <p>
                        Subscribers: {channel.myChannelSubscribersCount} | Subscriptions: {channel.mySubscriptionsCount}
                    </p>
                    {/* The Subscribe component now receives onSubscriptionChange callback */}
                    <Subscribe
                        channelId={channel._id}
                        initialSubscribed={channel.isSubscribed}
                        onSubscriptionChange={handleSubscriptionChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChannelProfileWithSubscribe;