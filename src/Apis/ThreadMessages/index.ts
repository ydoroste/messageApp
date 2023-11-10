import {
  DeleteApi,
  GetApi,
  PostApi,
  PutApi,
} from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { ApiEndpoints } from "@followBack/Apis";
import {
  IDeleteMessageRequest,
  IDeleteMessageResponse,
  IThreadMessagesAPIResponse,
} from "./types";
import { sortDataSet } from "@followBack/Utils/sortedDataUponDate";
import { insertMessagesToLDB } from "@followBack/Utils/localDb/actions/message";

export const MESSAGES_LIMIT = 1000;

export const getThreadMessagesApi = async ({
  id,
  pageParam,
}: {
  id: string;
  pageParam: number;
}) => {
  return GetApi<IThreadMessagesAPIResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.threadMessages}?threadId=${id}&pageNumber=${pageParam}&pageSize=${MESSAGES_LIMIT}`
  )
    .then((res) => {
      insertMessagesToLDB(res.data.data, id )
      return {
        totalCount: res.data.totalCount,
        data: sortDataSet(res.data.data, false),
        page: res.data.page,
      };
    })
    .catch((e) => console.log("error from fetchThreadMsgs", e.response.data));
};

export const deleteMessagesApi = async (request: IDeleteMessageRequest) => {
  return DeleteApi<IDeleteMessageRequest, IDeleteMessageResponse>(
    ApiEndpoints.deleteForMe,
    undefined,
    {
      headers: {},
      data: {
        ids: request.ids,
      },
    }
  )
    .then((res) => res.data)
    .catch((e) => console.log("error from fetchThreadMsgs", e.response.data));
};

export const unSendMessagesApi = async (request: IDeleteMessageRequest) => {
  return DeleteApi<IDeleteMessageRequest, IDeleteMessageResponse>(
    ApiEndpoints.deleteForAll,
    undefined,
    {
      headers: {},
      data: {
        ids: request.ids,
      },
    }
  )
    .then((res) => res.data)
    .catch((e) => console.log("error from fetchThreadMsgs", e.response.data));
};
