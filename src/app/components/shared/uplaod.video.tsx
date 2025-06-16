"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { getVideos, uploadVideo, deleteVideo } from "../../services/video.services";
import { Video } from "../../types/index";

const VideoComponent: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

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

    // Handle file inputs.
    const handleVideoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    // Handle video upload.
    const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!videoFile || !thumbnailFile) {
            alert("Please select both a video and a thumbnail file.");
            return;
        }
        const formData = new FormData();
        formData.append("videoFile", videoFile);
        formData.append("thumbnail", thumbnailFile);
        formData.append("title", title);
        formData.append("description", description);

        try {
            const uploadedVideo = await uploadVideo(formData);
            setVideos((prev) => [...prev, uploadedVideo]);
            // Reset the form.
            setVideoFile(null);
            setThumbnailFile(null);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };

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
            <h2>Upload Video</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label>Video File: </label>
                    <input type="file" accept="video/*" onChange={handleVideoFileChange} />
                </div>
                <div>
                    <label>Thumbnail: </label>
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} />
                </div>
                <div>
                    <label>Title: </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Upload</button>
            </form>

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
        </div>
    );
};

export default VideoComponent;