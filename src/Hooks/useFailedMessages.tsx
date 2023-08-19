import { useContext } from "react";
import { FailedMessagesContext } from "@followBack/Contexts/FailedMessagesContext";

export const useFailedMessages = () => {
    return useContext(FailedMessagesContext);
};