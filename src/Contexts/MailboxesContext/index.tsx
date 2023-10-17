import React, { useState, useEffect, createContext } from "react";
import {
  IMailBoxesContext,
  IMailBoxesProviderProps,
  MailBox,
} from "@followBack/Contexts/MailboxesContext/types";
import { useFetchUserMailBoxes } from "@followBack/Hooks/Apis/UserMailBoxes";
import CachingLayer from "@followBack/Classes/CachingLayer";

export const MailBoxesContext = createContext<IMailBoxesContext>({
  isError: false,
  isSuccess: false,
  isLoading: false,
  inboxThread: {} as MailBox,
  data: undefined,
  sentMailThread: {} as MailBox,
  mailboxes: [],
} as IMailBoxesContext);

export const MailBoxesProvider: React.FC<IMailBoxesProviderProps> = ({
  children,
}) => {
  const { data, isLoading, isError, isSuccess } = useFetchUserMailBoxes();
  const [inboxThread, setInboxThread] = useState<MailBox | undefined>();
  const [sentMailThread, setSentMailThread] = useState<MailBox | undefined>();
  const [mailboxes, setMailboxes] = useState<MailBox[]>(
    CachingLayer.mailBoxesIds ?? []
  );
  useEffect(() => {
    if (!data) return;
    setMailboxes(data.data.mailboxes);
    const inboxThread = data?.data.mailboxes.find(
      ({ mailbox }) => mailbox.toLowerCase() === "inbox"
    );
    const sentMailThread = data?.data.mailboxes.find(
      ({ mailbox }) => mailbox.toLowerCase() === "sent mail"
    );

    setInboxThread(inboxThread);
    setSentMailThread(sentMailThread);

    CachingLayer.saveMailBoxesIdsToDir(data?.data.mailboxes);
  }, [data]);

  return (
    <MailBoxesContext.Provider
      value={{
        mailboxes,
        sentMailThread,
        inboxThread,
        data,
        isLoading,
        isError,
        isSuccess,
      }}
    >
      {children}
    </MailBoxesContext.Provider>
  );
};
