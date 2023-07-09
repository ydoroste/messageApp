import { IContact } from "../ContactsList/types";

export interface IComposeApiRequest {
  [key: string]: string | IContact[] | undefined 
  subject: string;
  text: string;
  toList: IContact[];
  ccList: IContact[];
  bccList: IContact[];
  uid?: string;
}

export interface IComposeApiResponse {
  status: number;
  data: IComposeResponseData;
}

export interface IComposeResponseData {
  topicId: string;
    fromContact: IContact;
    to: IContact[];
    cc: IContact[];
    bcc: IContact[];
    subject: string;
    text: string;
    headerId: string;
    attachments: string[];
}