import { useContext } from "react";
import { MailBoxesContext } from "@followBack/Contexts/MailboxesContext";

export const useMailBoxes = () => {
  return useContext(MailBoxesContext);
};
