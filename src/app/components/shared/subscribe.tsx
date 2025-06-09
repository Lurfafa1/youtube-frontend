import React, { useState } from "react";
import { createSubscription, removeSubscription } from "../../services/sub.services";

interface SubscribeProps {
    channelId: string;
    initialSubscribed: boolean;
    // Optional callback when the subscription state changes.
    onSubscriptionChange?: (subscribed: boolean) => void;
}

const Subscribe: React.FC<SubscribeProps> = ({ channelId, initialSubscribed, onSubscriptionChange }) => {
    const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const handleSubscribe = async () => {
        setIsLoading(true);
        setError("");
        try {
            await createSubscription(channelId);
            setIsSubscribed(true);
            if (onSubscriptionChange) onSubscriptionChange(true);
        } catch (err: any) {
            setError(err.message || "Failed to subscribe");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnsubscribe = async () => {
        setIsLoading(true);
        setError("");
        try {
            await removeSubscription(channelId);
            setIsSubscribed(false);
            if (onSubscriptionChange) onSubscriptionChange(false);
        } catch (err: any) {
            setError(err.message || "Failed to unsubscribe");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {isSubscribed ? (
                <button onClick={handleUnsubscribe} disabled={isLoading}>
                    {isLoading ? "Unsubscribing..." : "Subscribed (Click to Unsubscribe)"}
                </button>
            ) : (
                <button onClick={handleSubscribe} disabled={isLoading}>
                    {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
            )}
        </div>
    );
};

export default Subscribe;