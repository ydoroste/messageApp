import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosError } from "axios";

import { getThreadListApi } from "@followBack/Apis/threadsList";

export const useFetchthreadsList = ({id, searchValue }) => {
  return useInfiniteQuery(
    [`threadsList-${id}`, searchValue],
    ({ pageParam }) => getThreadListApi({id,  searchValue, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.length < 10) return undefined;
        return lastPage.nextCursor;
      },
    }
  );
};


