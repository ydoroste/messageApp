import { ReactNode } from "react";
export interface IMailBoxesProviderProps {
  children: ReactNode;
}

export interface MailBox {
  id: string;
  path: string;
  subscribed: boolean;
}

export interface MailBoxdData {
  mailboxes: MailBox[];
}
export interface IMailBoxesContext {
  data?: MailBoxdData;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  inboxThread: MailBox
}
