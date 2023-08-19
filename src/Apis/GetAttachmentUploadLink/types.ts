export interface IGetUploadLinkApiRequest {
    filename: string
}

export interface IGetUploadLinkApiResponse {
    success: boolean;
    link: string;
    message?: string;
}

export interface ICreateAttachmentRequest {
    headerId?: string;
    url: string;
    title: string;
    type: string;
    size: number;
}

export interface ICreateAttachmentApiResponse {
    id?: string;
    headerId: string;
    url: string;
    title: string;
    type: string;
    size: number;
}