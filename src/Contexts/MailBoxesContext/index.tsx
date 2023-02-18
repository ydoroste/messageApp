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
  inboxThread: null
} as IMailBoxesContext);

export const MailBoxesProvider: React.FC<IMailBoxesProviderProps> = ({
  children,
}) => {
  const { data, isLoading, isError, isSuccess } = useFetchUserMailBoxes();
  const [inboxThread, setInboxThread] = useState<MailBox>();
  useEffect(() => {
    if (!data) return;
    const inboxThread = data?.mailboxes.find(
      ({ path }) => path.toLowerCase() === "inbox"
    );

    setInboxThread(inboxThread);
  }, [data]);
  return (
    <MailBoxesContext.Provider
      value={{ inboxThread, data, isLoading, isError, isSuccess }}
    >
      {children}
    </MailBoxesContext.Provider>
  );
};
