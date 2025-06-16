"use client"
import React, { useState, useEffect } from "react";
import { createLike, countLikes } from "../../services/likes.services";

interface LikeComponentProps {
    likedType: "Video" | "Post" | "Comment";
    likedId: string;
    initialLiked?: boolean;
    initialCount?: number;
}

const LikeComponent: React.FC<LikeComponentProps> = ({
    likedType,
    likedId,
    initialLiked = false,
    initialCount = 0,
}) => {
    const [liked, setLiked] = useState<boolean>(initialLiked);
    const [likesCount, setLikesCount] = useState<number>(initialCount);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // If no initial count was provided, fetch the current count.
        if (initialCount === 0) {
            fetchCount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likedId]);

    const fetchCount = async () => {
        try {
            const count = await countLikes(likedType, likedId);
            setLikesCount(count);
        } catch (error) {
            console.error("Error fetching like count:", error);
        }
    };

    const toggleLike = async () => {
        setLoading(true);
        try {
            // Toggle the like status.
            const newLikeState = !liked;
            await createLike(likedType, { likedId, like: newLikeState });
            setLiked(newLikeState);
            setLikesCount((prev) => newLikeState ? prev + 1 : Math.max(prev - 1, 0));
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={toggleLike} disabled={loading}>
                {liked ? "Unlike" : "Like"}
            </button>
            <span>{likesCount} {loading && "Loading..."}</span>
        </div>
    );
};

export default LikeComponent;