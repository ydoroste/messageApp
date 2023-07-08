import { IContact } from "../ContactsList/types";


export interface IthreadsListAPIRequest { 
    id: string;
    searchValue: string;
    pageParam: number;
}



export interface IthreadsListAPIResponse {
    data: Thread[];
    page: number;
    totalCount: number;
} 

export interface Thread {
    topicId: string;
    threadId: string;
    createdAt: string; // TODO: Parse to date
    subject: string;
    initiator: IContact;
    text: string;
    favorite: boolean;
    headerId: string;
    promotional: false;
    lastHeader: {
        formContact: IContact;
        toList: IContact[];
        ccList: IContact[] | null;
        bccList?: IContact[];
        outbound: false;
        attachments: string[];
    }
}