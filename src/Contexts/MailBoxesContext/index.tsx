import React, {useState, useEffect, createContext} from "react";
import {
    IMailBoxesContext,
    IMailBoxesProviderProps,
    MailBox,
} from "@followBack/Contexts/MailboxesContext/types";
import {useFetchUserMailBoxes} from "@followBack/Hooks/Apis/UserMailBoxes";

const contextData: IMailBoxesContext ={
    isError: false,
    isSuccess: false,
    isLoading: false,
    inboxThread: {} as MailBox,
    data: undefined,
    sentMailThread: {} as MailBox
}
export const MailBoxesContext = createContext<IMailBoxesContext>({
    isError: false,
    isSuccess: false,
    isLoading: false,
    inboxThread: {} as MailBox,
    data: undefined,
    sentMailThread: {} as MailBox
} as IMailBoxesContext);

export const MailBoxesProvider: React.FC<IMailBoxesProviderProps> = ({
                                                                         children,
                                                                     }) => {
    const {data, isLoading, isError, isSuccess} = useFetchUserMailBoxes();
    const [inboxThread, setInboxThread] = useState<MailBox| undefined>();
    const [sentMailThread, setSentMailThread] = useState<MailBox | undefined>();
    useEffect(() => {
        if (!data) return;
        const inboxThread = data?.mailboxes.find(
            ({path}) => path.toLowerCase() === "inbox"
        );

        const sentMailThread = data?.mailboxes.find(
            ({path}) => path.toLowerCase() === "sent mail"
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
