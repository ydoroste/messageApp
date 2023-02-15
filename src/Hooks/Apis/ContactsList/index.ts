import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosError } from "axios";

import { getContactsListApi } from "@followBack/Apis/ContactsList";

export const useFecthContactsList = ({ type, searchValue }) => {
  return useQuery([`contactsList-${type}`, searchValue], () =>
    getContactsListApi({ searchValue })
  );
};
