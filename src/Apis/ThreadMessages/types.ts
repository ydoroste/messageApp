import { IContact } from "../ContactsList/types";
import { ICreateAttachmentApiResponse } from "../GetAttachmentUploadLink/types";

export interface IThreadMessagesAPIResponse {
    data: IThreadMessage[];
    page: number;
    totalCount: number;
}

export interface IThreadMessage {
    headerId?: string;
    messageId?: string;
    from?: IContact;
    to?: IContact[];
    cc?: IContact[];
    html?: string;
    text: string;
    outbound?: boolean,
    attachments?: ICreateAttachmentApiResponse[];
    reactions?: [],
    replyTo?: [],
    edited?: boolean;
    forwarded?: boolean;
    createdAt?: string; // TODO: Parse to date
    subject?: string
}