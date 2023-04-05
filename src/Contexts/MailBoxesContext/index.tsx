import React, { useState, useEffect, createContext } from "react";
import {
  IMailBoxesContext,
  IMailBoxesProviderProps,
  MailBox,
} from "@followBack/Contexts/MailboxesContext/types";
import { useFetchUserMailBoxes } from "@followBack/Hooks/Apis/UserMailBoxes";

export const MailBoxesContext = createContext<IMailBoxesContext>({
  isError: false,
  isSuccess: false,
  isLoading: false,
  inboxThread: null,
});

export const MailBoxesProvider: React.FC<IMailBoxesProviderProps> = ({
  children,
}) => {
  const { data, isLoading, isError, isSuccess } = useFetchUserMailBoxes();
  const [inboxThread, setInboxThread] = useState<MailBox>();
  const [sentMailThread, setSentMailThread] = useState<MailBox>();
  
  useEffect(() => {
    if (!data) return;
    
    const inboxThread = data?.mailboxes.find(
      ({ path }) => path.toLowerCase() === "inbox"
    );

    const sentMailThread = data?.mailboxes.find(
      ({ path }) => path.toLowerCase() === "sent mail"
    );

    setInboxThread(inboxThread);
    setSentMailThread(sentMailThread);
  }, [data]);

  return (
    <MailBoxesContext.Provider
      value={{
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
