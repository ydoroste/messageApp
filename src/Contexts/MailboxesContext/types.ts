import { MailBoxdData } from "@followBack/Apis/UserMailBoxes/types";
import { ReactNode } from "react";
export interface IMailBoxesProviderProps {
  children: ReactNode;
}

export interface MailBox {
  id: string;
  mailbox: string; // Name of the mailbox, ie: Drafs/INBOX, etc...
}


export interface IMailBoxesContext {
  data?: MailBoxdData;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  inboxThread?: MailBox | null;
  sentMailThread?: MailBox | null;
  mailboxes?: MailBox[]; // For future usage to have full view of all mailboxes available
}
