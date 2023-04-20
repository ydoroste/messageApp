import React, { ReactNode, createContext, useState } from "react";
import { FailedMessagesDictionary, IFailedMEssage, IFailedMessagesContext } from "./types";




export const FailedMessagesContext = createContext<IFailedMessagesContext>({
   failedMessagesData: { 0: [{ text: "" }] }
});

export const FailedMessagesContextProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
   const [failedMessagesData, setFailedMessagesData] = useState<FailedMessagesDictionary>({});
   
   return (<FailedMessagesContext.Provider value={{ failedMessagesData, setFailedMessagesData}}>
      {children}
   </FailedMessagesContext.Provider>)
}