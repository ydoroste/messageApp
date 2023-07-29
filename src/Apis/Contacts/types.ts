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

export interface IGetUsernameReponse {
    name: string,
    address: string
}