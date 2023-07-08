import { IContact } from "../ContactsList/types";

export interface IThreadMessagesAPIResponse {
    data: ThreadMessage[];
    page: number;
    totalCount: number;
}

export interface ThreadMessage {
    headerId: string;
    messageId: string;
    from: IContact;
    to: IContact[];
    cc: IContact[];
    html: string;
    text: string;
    outbound: boolean,
    attachments: string[];
    reactions: [],
    replyTo: [],
    edited: boolean;
    forwarded: boolean;
    createdAt: string; // TODO: Parse to date
}