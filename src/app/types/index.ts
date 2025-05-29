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
    id: number;
    subscriberId: number;
    subscribedToId: number;
    createdAt: string;
}

export interface Video {
    id: number;
    title: string;
    description: string;
    url: string;
    authorId: number;
    createdAt: string;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}


export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = "ApiError";
    }
}



export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}