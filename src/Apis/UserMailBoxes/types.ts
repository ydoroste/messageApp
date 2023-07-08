import { MailBox } from "@followBack/Contexts/MailboxesContext/types";

export interface MailBoxdData {
    data: MailBoxesInfo;
    statusCode: number;
    message: string;
  }


  interface MailBoxesInfo {
    mailboxes: MailBox[];
  }