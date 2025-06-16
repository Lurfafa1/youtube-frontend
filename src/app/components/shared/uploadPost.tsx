import React, { useState, ChangeEvent, FormEvent } from "react";
import { createPost } from "../../services/posts.services";

const UploadPost: React.FC = () => {
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };

    const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !content) {
            setMessage("Title and content are required.");
            return;
        }
        const formData = new FormData();
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
        formData.append("title", title);
        formData.append("content", content);

        try {
            await createPost(formData);
            setMessage("Post created successfully!");
            // Reset the form.
            setThumbnail(null);
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error creating post:", error);
            setMessage("Error creating post.");
        }
    };

    return (
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleUpload}>
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
                    <label>Content: </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadPost;