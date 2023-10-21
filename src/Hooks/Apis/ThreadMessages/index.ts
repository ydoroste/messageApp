import { useInfiniteQuery } from "react-query";

import {
  getThreadMessagesApi,
  MESSAGES_LIMIT,
} from "@followBack/Apis/ThreadMessages";
import { IThreadMessagesAPIResponse } from "@followBack/Apis/ThreadMessages/types";

export const useFetchThreadMessages = ({ id }: { id: string }) => {
  return useInfiniteQuery(
    [`threadMessages`, id],
    ({ pageParam = 0 }) => getThreadMessagesApi({ id, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (typeof lastPage === typeof undefined) return undefined;
        const lastPageData = lastPage as IThreadMessagesAPIResponse;
        const totalPages = Math.ceil(lastPageData.totalCount / MESSAGES_LIMIT);
        const nextPage =
          lastPageData.page < totalPages
            ? Number(lastPageData.page) + 1
            : undefined;
        return nextPage;
      },
      keepPreviousData: true,
      enabled: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      cacheTime: 0,
    }
  );
};
