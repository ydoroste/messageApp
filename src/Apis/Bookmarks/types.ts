export interface IBookmarkRequest {
    threadId: string;
    bookmark: boolean;
}

export interface IBookmarkApiResponse {
    statusCode: number;
    message: string;
    data: { 
        threadId: string;
        ookmark: boolean;
    }
}