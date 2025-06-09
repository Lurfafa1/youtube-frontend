import React, { useEffect, useState } from "react";
import { getChannelProfile, ChannelProfile } from "../../services/sub.services";

interface ChannelProfileProps {
    username: string;
}

const ChannelProfileComponent: React.FC<ChannelProfileProps> = ({ username }) => {
    const [channel, setChannel] = useState<ChannelProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const data = await getChannelProfile(username);
                setChannel(data);
            } catch (err: any) {
                setError(err.message || "Failed to load channel data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchChannel();
    }, [username]);

    if (isLoading) return <p>Loading channel...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!channel) return null;

    return (
        <div>
            <div style={{ backgroundImage: `url(${channel.coverImage})`, height: "200px", backgroundSize: "cover" }}>
                {/* Cover image */}
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "-50px" }}>
                <img
                    src={channel.avatar}
                    alt={channel.username}
                    style={{ width: "100px", height: "100px", borderRadius: "50%", border: "3px solid white", objectFit: "cover" }}
                />
                <div style={{ marginLeft: "20px" }}>
                    <h2>{channel.username}</h2>
                    <p>{channel.fullname}</p>
                    <p>
                        Subscribers: {channel.myChannelSubscribersCount} | Subscriptions: {channel.mySubscriptionsCount}
                    </p>
                    <p>{channel.isSubscribed ? "Subscribed" : "Not Subscribed"}</p>
                </div>
            </div>
        </div>
    );
};

export default ChannelProfileComponent;

