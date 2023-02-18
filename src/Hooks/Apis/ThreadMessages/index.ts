import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosError } from "axios";

import { getThreadMessagesApi } from "@followBack/Apis/ThreadMessages";

export const useFetchThreadMessages = ({ id }) => {
  return useInfiniteQuery(
    [`threadMessages-${id}`, id],
    ({ pageParam }) => getThreadMessagesApi({ id, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.length < 10) return undefined;
        return lastPage.nextCursor;
      },
    }
  );
};
