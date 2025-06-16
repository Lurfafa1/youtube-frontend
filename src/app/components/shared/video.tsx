"use client"

import React, { useState, useEffect } from "react";
import { getVideos, deleteVideo } from "../../services/video.services";
import { Video } from "../../types/index";

const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    // Fetch the list of videos on component mount.
    const fetchVideos = async () => {
        try {
            const videosData = await getVideos();
            setVideos(videosData);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    // Handle video deletion.
    const handleDelete = async (id: string) => {
        try {
            await deleteVideo(id);
            setVideos((prev) => prev.filter((video) => video.id !== id));
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    return (
        <div>
            <h2>Video List</h2>
            <ul>
                {videos.map((video) => (
                    <li key={video.id}>
                        <p>Title: {video.title}</p>
                        <video width="320" controls>
                            <source src={video.videoFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <p>Description: {video.description}</p>
                        <p>Views: {video.views}</p>
                        <button onClick={() => handleDelete(video.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;