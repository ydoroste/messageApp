import { useInfiniteQuery, useQuery } from "react-query";

import { getContactsListApi } from "@followBack/Apis/ContactsList";

export const useFecthContactsList = ({ type, searchValue }: {type: string, searchValue: string}) => {
  return useQuery([`contactsList-${type}`, searchValue], () =>
    getContactsListApi({ searchValue })
  );
};
