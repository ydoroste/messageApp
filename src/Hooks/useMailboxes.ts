import { useContext } from "react";
import { MailBoxesContext } from "@followBack/Contexts/MailBoxesContext";

export const useMailBoxes = () => {
  return useContext(MailBoxesContext);
};
