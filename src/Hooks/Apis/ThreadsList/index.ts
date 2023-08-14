import { useInfiniteQuery } from 'react-query';

import { getThreadListApi, THREADS_LIMIT } from '@followBack/Apis/threadsList';
import { IthreadsListAPIResponse } from '@followBack/Apis/threadsList/type';

export const useFetchthreadsList = ({
  id,
  searchValue,
  refetchData,
}: {
  id: string;
  searchValue: string;
  refetchData: boolean;
}) => {
  return useInfiniteQuery(
    [`threadsList-${id}`, searchValue],
    ({ pageParam = 0 }) => getThreadListApi({ id, searchValue, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined;
        const lastPageData = lastPage as IthreadsListAPIResponse;
        const totalPages = Math.ceil(lastPageData.totalCount / THREADS_LIMIT);
        const nextPage =
          lastPageData.page < totalPages
            ? Number(lastPageData.page) + 1
            : undefined;
        return nextPage;
      },
      keepPreviousData: true,
      enabled: refetchData,
      refetchInterval: 350,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    }
  );
};
