import { useInfiniteQuery, useQuery } from "react-query";

import { getContactsListApi } from "@followBack/Apis/Contacts";

export const useFecthContactsList = ({ type, searchValue }: {type: string, searchValue: string}) => {
  return useQuery([`contactsList-${type}`, searchValue], () => getContactsListApi({ searchValue }));
};
