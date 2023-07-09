import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { ApiEndpoints } from "@followBack/Apis";
import { IThreadMessagesAPIResponse } from "./types";

export const getThreadMessagesApi = async ({ id, pageParam } : {id: string, pageParam: any}) => {
  return GetApi<IThreadMessagesAPIResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.threadMessages}?threadId=${id}&pageNum=${
      pageParam || 1
    }&pageSize=100`
  )
    .then((res) => res.data)
    .catch((e) => console.log("error from fetchThreadMsgs", e.response.data));
};
