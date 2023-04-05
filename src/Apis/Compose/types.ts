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
  message?: string;
}
