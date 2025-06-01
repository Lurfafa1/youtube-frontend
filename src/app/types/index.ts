export interface User {
    id: string;                // MongoDB ObjectId as a string
    username: string;          // Unique username
    email: string;             // User's email address
    fullname: string;          // User's full name
    avatar: string;            // URL for the user's avatar (Cloudinary)
    coverImage?: string;       // Optional URL for the cover image
    watchHistory?: string[];   // Array of Video ObjectIds (as strings)
    createdAt: string;         // Timestamp from Mongoose
    updatedAt: string;         // Timestamp from Mongoose
}



export interface Post {
    id: string;                         // MongoDB ObjectId as a string
    title: string;
    content: string;
    author: string;                     // MongoDB ObjectId of the user
    mediaUrl?: string;                  // Optional URL for media
    mediaType: "image" | "video" | "none";
    likes: string[];                    // Array of MongoDB ObjectIds for likes
    comments: string[];                 // Array of MongoDB ObjectIds for comments
    tags: string[];                     // Array of tags as strings
    visibility: "public" | "private" | "followers";
    createdAt: string;                  // Timestamp from Mongoose
    updatedAt?: string;                 // Optional updated timestamp
    stats?: {                           // Virtual field for post statistics
        likesCount: number;
        commentsCount: number;
        isNew: boolean;
    }
}



export interface Comment {
    id: string;                         // MongoDB ObjectId as a string
    content: string;                    // The comment's content
    contentType: "video" | "post";       // Indicates whether the comment belongs to a video or a post
    contentId: string;                  // ID of the referenced content (video or post)
    owner: string;                      // MongoDB ObjectId of the user who created the comment
    parentComment?: string | null;      // ID of the parent comment, if this comment is a reply
    isReply: boolean;                   // Indicates if it's a reply to another comment
    likes: string[];                    // Array of MongoDB ObjectIds for users who liked the comment
    isEdited: boolean;                  // Indicates if the comment was edited
    createdAt: string;                  // Timestamp from Mongoose
    updatedAt?: string;                 // Optional updated timestamp
}



export interface Like {
    id: string;                        // MongoDB ObjectId as a string
    userId: string;                    // MongoDB ObjectId of the user as a string
    liked: string;                     // ID of the liked item as a string
    likedType: "Video" | "Post" | "Comment";  // Type of the liked item
    like: boolean;                     // true for like, false for dislike
    createdAt: string;                 // Timestamp from Mongoose
    updatedAt?: string;                // Optional updated timestamp
}



export interface Subscription {
    id: string;               // MongoDB ObjectId as a string
    subscriber: string;       // Corresponds to the backend subscriber field
    channel: string;          // Corresponds to the backend channel field
    createdAt: string;        // Timestamp from the backend
    updatedAt?: string;       // Optional updated timestamp
}



export interface Video {
    id: string;            // Typically the MongoDB ObjectId as a string
    videoFile: string;     // Cloudinary URL for the video file
    thumbnail: string;     // Cloudinary URL for the thumbnail
    title: string;
    description: string;
    duration: number;
    views: number;
    isPublished: boolean;
    owner: string;         // ID of the owner (or you could use authorId if that fits your naming convention)
    createdAt: string;     // Timestamp from Mongoose
    updatedAt?: string;    // Optional updated timestamp if needed
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    statusCode: number;
    success: boolean;
}


export class ApiError extends Error {
    statusCode: number;
    errors: any[];
    data: any;
    success: boolean;
    constructor(message: string, statusCode: number, errors: any[] = [], data: any = null) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data = data;
        this.success = false; // indicates failure
        this.name = "ApiError";
        Error.captureStackTrace(this, this.constructor);
    }
}



export interface PaginatedResponse<T> {
    data: T[];
    total: number;           // Total number of items
    page: number;            // Current page index
    pageSize: number;        // Items per page
    totalPages: number;      // Total number of pages
    hasNextPage: boolean;    // Flag for available next page
    hasPrevPage: boolean;    // Flag for available previous page
    nextPage?: number;       // Optional next page index
    prevPage?: number;       // Optional previous page index
}