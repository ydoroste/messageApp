import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { Apis } from "@followBack/Apis";

export const getThreadMessagesApi = async ({ id, pageParam }) => {
  return GetApi(
    `${CORE_SERVICE_URL}${Apis.threadMessages}?threadId=${id}&pageNum=${
      pageParam || 1
    }&pageSize=10`,
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
        nextPage: pageParam + 1,
      };
    })
    .catch((e) => console.log(e.response.data));
};
