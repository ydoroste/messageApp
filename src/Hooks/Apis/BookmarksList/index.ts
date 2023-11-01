import { useInfiniteQuery } from "react-query";

import {
  getThreadBookMarkListApi,
  THREADS_LIMIT,
} from "@followBack/Apis/threadsList";
import { IthreadsListAPIResponse } from "@followBack/Apis/threadsList/type";

export const useBookmarksList = ({ searchValue }: { searchValue: string }) => {
  return useInfiniteQuery(
    ["bookmark"],
    ({ pageParam = 0 }) => getThreadBookMarkListApi({ searchValue, pageParam }),
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
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
      cacheTime: 0,
    }
  );
};
