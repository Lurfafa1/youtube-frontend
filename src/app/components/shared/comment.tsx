import React, { useEffect, useState } from "react";
import {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment
} from "../../services/comment.services";
import { Comment } from "../../types/index";

const CommentComponent: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newCommentText, setNewCommentText] = useState<string>("");
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState<string>("");

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const data = await getComments();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCreateComment = async () => {
        if (!newCommentText.trim()) return;
        try {
            const newCommentData = { content: newCommentText }; // adjust based on your API needs
            const createdComment = await createComment(newCommentData);
            setComments((prev) => [...prev, createdComment]);
            setNewCommentText("");
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleLikeComment = async (commentId: string) => {
        try {
            await likeComment(commentId);
            fetchComments();
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    const handleUnlikeComment = async (commentId: string) => {
        try {
            await unlikeComment(commentId);
            fetchComments();
        } catch (error) {
            console.error("Error unliking comment:", error);
        }
    };

    const startEditing = (comment: Comment) => {
        setEditingCommentId(comment.id);
        setEditingText(comment.content);
    };

    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditingText("");
    };

    const handleUpdateComment = async (commentId: string) => {
        try {
            if (!editingText.trim()) return;
            const updatedComment = await updateComment(commentId, { content: editingText });
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === commentId ? updatedComment : comment
                )
            );
            setEditingCommentId(null);
            setEditingText("");
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            <div>
                <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write your comment..."
                />
                <button onClick={handleCreateComment}>Post Comment</button>
            </div>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {editingCommentId === comment.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                                <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
                                <button onClick={cancelEditing}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <p>{comment.content}</p>
                                <div>
                                    <button onClick={() => handleLikeComment(comment.id)}>Like</button>
                                    <button onClick={() => handleUnlikeComment(comment.id)}>Unlike</button>
                                    <button onClick={() => startEditing(comment)}>Edit</button>
                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentComponent;