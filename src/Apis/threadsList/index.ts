import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { Apis } from "@followBack/Apis";

export const getThreadListApi = async ({ id, searchValue, pageParam }) => {
  return GetApi(
    `${CORE_SERVICE_URL}${Apis.threadList}?mailboxId=${id}&pageNum=${Number(
      pageParam || 1
    )}&pageSize=10&searchText=${searchValue}`,
    undefined,
    {
      headers: {
        "x-auth-token": await getAccessToken(),
      },
    }
  )
    .then((res) => {
      console.log(res.data?.data?.threadsData)
      console.log(
        "domain",
        `${CORE_SERVICE_URL}${Apis.threadList}?mailboxId=${id}&pageNum=${Number(
          pageParam || 1
        )}&pageSize=10&searchText=${searchValue}`
      );
      return {
        data: res.data?.data?.threadsData,
        nextPage: Number(pageParam || 1) + 1,
      };
    })
    .catch((e) => console.log(e.response.data));
};
