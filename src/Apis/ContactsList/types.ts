import { IApiError } from "../types";


export interface IContact {
    address: string;
    name?: string
}

export interface IContactListApiResponse {
    data: ContactsData;
    page: number;
    totalCount: number;
}

export interface ContactsData {
    contacts: IContact[];
}