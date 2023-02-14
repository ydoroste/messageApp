import { useQuery } from "react-query";
import { getUserMailBoxes } from "@followBack/Apis/UserMailBoxes";

export const useFetchUserMailBoxes = () => {
  return useQuery(["userMailBoxes"], getUserMailBoxes);
};
