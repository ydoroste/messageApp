import { IApiError } from "../types";


export interface IContact {
    address: string;
    name: string
}

export interface IContactListApiResponse {
    success: boolean,
    data: IContact[];
    message?: string
}