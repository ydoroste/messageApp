import { IApiError } from "@followBack/Apis/types";

interface Receiver {
  address: string;
}
export interface IComposeApiRequest {
  [key: string]: string | Receiver[] 
  subject: string;
  text: string;
  to: Receiver[];
  cc: Receiver[];
  bcc: Receiver[];
}

export interface IComposeApiResponse {
  success: boolean;
  data: IComposeResponseData
  message?: string;
}

export interface IComposeResponseData {
  message: string;
  modseq: number;
  msgid: string;
  success: string;
  thread: string;
  uid: string;
  unseen: boolean;
}