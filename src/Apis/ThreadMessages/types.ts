import { IContact } from '@followBack/Apis/Contacts/types';
import { ICreateAttachmentApiResponse } from '@followBack/Apis/GetAttachmentUploadLink/types';

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
    createdAt?: string;
    subject?: string;
    // For sake of determining if the message failed to be sent or not
    // Moved to failed message list, not received from API, it's local one
    notConfirmedNewMessage?: boolean;
    failedToSend: boolean;
}

export interface IDeleteMessageRequest {
    ids: string[];
}

export interface IDeleteMessageResponse {
    statusCode: number,
    message: string,
    data: {
        deletedMessages: string[],
        failedMessages: string[]
    }
}