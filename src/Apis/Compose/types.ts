import { IApiError } from "@followBack/Apis/types";

interface Receiver {
  address: string;
}
export interface IComposeApiRequest {
  [key: string]: string | Receiver[] | undefined 
  subject: string;
  text: string;
  toList: Receiver[];
  ccList: Receiver[];
  bccList: Receiver[];
  uid?: string;
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