export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: string;
}

export interface Comment {
    id: number;
    postId: number;
    authorId: number;
    content: string;
    createdAt: string;
}

export interface Like {
    id: number;
    userId: number;
    postId: number;
    createdAt: string;
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
    total: number;
    page: number;
    pageSize: number;
}