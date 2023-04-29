import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { Apis } from "@followBack/Apis";

export const getThreadMessagesApi = async ({ id, pageParam }) => {

  return GetApi(
    `${CORE_SERVICE_URL}${Apis.threadMessages}?threadId=${id}&pageNum=${
      pageParam || 1
    }&pageSize=100`,
    undefined,
    {
      headers: {
        "x-auth-token": await getAccessToken(),
      },
    }
  )
    .then((res) => {
      return {
        data: res.data?.data?.mappedMessages,
        initiator: res?.data?.data?.initiator,
        nextPage: Number(pageParam || 1) + 1,
      };
    })
    .catch((e) => console.log("error from fetchThreadMsgs", e.response.data));
};
