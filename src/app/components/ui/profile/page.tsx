"use client"

import React from "react";
import ChannelProfileWithSubscribe from "../../shared/sub";
import VideoList from "../../shared/video";
import PostList from "../../shared/posts";

interface ChannelPageProps {
    // The channel's username, used to fetch channel profile data.
    username: string;
}

const ChannelPage: React.FC<ChannelPageProps> = ({ username }) => {
    return (
        <div>
            {/* Channel info with subscribe button */}
            <ChannelProfileWithSubscribe username={username} />

            {/* Section for channel videos */}
            <section style={{ marginTop: "2rem" }}>
                <h2>Videos</h2>
                <VideoList />
            </section>

            {/* Section for community posts */}
            <section style={{ marginTop: "2rem" }}>
                <h2>Community Posts</h2>
                <PostList />
            </section>
        </div>
    );
};

export default ChannelPage;