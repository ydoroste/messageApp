import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosError } from "axios";

import { getThreadListApi } from "@followBack/Apis/threadsList";

export const useFetchthreadsList = ({id, searchValue, refetchData }: {id: string, searchValue: string, refetchData: boolean}) => {
  return useInfiniteQuery(
    [`threadsList-${id}`, searchValue],
    ({ pageParam }) => getThreadListApi({id,  searchValue, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.length < 10) return undefined;
        return lastPage?.nextPage;
      },
        keepPreviousData: true,
        enabled: refetchData,
        refetchInterval: 4000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true
    }
  );
};


