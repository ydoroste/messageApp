import { useInfiniteQuery } from 'react-query';

import { getThreadMessagesApi } from '@followBack/Apis/ThreadMessages';
import { IThreadMessagesAPIResponse } from '@followBack/Apis/ThreadMessages/types';

export const MESSAGES_LIMIT = 10;

export const useFetchThreadMessages = ({
  id,
  refetchData,
}: {
  id: string;
  refetchData: boolean;
}) => {
  return useInfiniteQuery(
    [`threadMessages`, id],
    ({ pageParam = 0 }) => getThreadMessagesApi({ id, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const lastPageData = lastPage as IThreadMessagesAPIResponse;
        const totalPages = Math.ceil(lastPageData.totalCount / MESSAGES_LIMIT);
        const nextPage =
          lastPageData.page < totalPages
            ? Number(lastPageData.page) - 1
            : undefined;
        return nextPage;
      },
      keepPreviousData: true,
      enabled: refetchData,
      refetchInterval: 15000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    }
  );
};
