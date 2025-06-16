import React, { useEffect, useState } from "react";
import { getAllPosts, deletePost } from "../../services/posts.services";
import { Post } from "../../types/index";

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [message, setMessage] = useState<string>("");

    const fetchPosts = async () => {
        try {
            const data = await getAllPosts();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setMessage("Error fetching posts.");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (postId: string) => {
        try {
            await deletePost(postId);
            setPosts((prev) => prev.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
            setMessage("Error deleting post.");
        }
    };

    return (
        <div>
            <h2>Posts</h2>
            {message && <p>{message}</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.mediaUrl && (
                            <img src={post.mediaUrl} alt={post.title} width="200" />
                        )}
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;