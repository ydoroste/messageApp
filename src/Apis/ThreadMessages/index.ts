import { DeleteApi, GetApi, PostApi } from '@followBack/Utils/httpApis/apis';
import { CORE_SERVICE_URL } from '@followBack/Apis/constants';
import { ApiEndpoints } from '@followBack/Apis';
import {
  IDeleteMessageRequest,
  IDeleteMessageResponse,
  IThreadMessagesAPIResponse,
} from './types';
import { MESSAGES_LIMIT } from '@followBack/Hooks/Apis/ThreadMessages';

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
    .then((res) => res.data)
    .catch((e) => console.log('error from fetchThreadMsgs', e.response.data));
};

export const deleteMessagesApi = async (
  request: IDeleteMessageRequest,
  isForAll: boolean
) => {
  return DeleteApi<IDeleteMessageRequest, IDeleteMessageResponse>(
    isForAll ? ApiEndpoints.deleteForAll : ApiEndpoints.deleteForMe,
    undefined,
    {
      headers: {},
      data: {
        ids: request.ids,
      },
    }
  )
    .then((res) => res.data)
    .catch((e) => console.log('error from fetchThreadMsgs', e.response.data));
};
