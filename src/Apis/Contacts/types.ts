export interface IContact {
  address: string;
  name?: string;
}

export interface IContactListApiResponse {
  data: { contacts: IContact[] };
  page: number;
  totalCount: number;
}

export interface IGetUsernameReponse {
  name: string;
  address: string;
}
