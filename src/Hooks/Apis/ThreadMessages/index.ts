import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosError } from "axios";

import { getThreadMessagesApi } from "@followBack/Apis/ThreadMessages";

export const useFetchThreadMessages = ({ id, refetchData }: { id: string, refetchData: boolean }) => {
  return useInfiniteQuery(
    [`threadMessages`, id],
    ({ pageParam }) => getThreadMessagesApi({ id, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.length < 100) return undefined;
        return lastPage?.nextPage;
      },
      keepPreviousData: true,
      enabled: refetchData,
      refetchInterval: 5000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true
    }
  );
};
