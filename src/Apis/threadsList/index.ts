import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { Apis } from "@followBack/Apis";

export const getThreadListApi = async ({ id, searchValue, pageParam }) => {
  console.log(
    `${CORE_SERVICE_URL}${Apis.threadList}?mailboxId=${id}&pageNum=${
      pageParam || 0
    }&pageSize=10&searchText=${searchValue}`
  );
  return GetApi(
    `${CORE_SERVICE_URL}${Apis.threadList}?mailboxId=638ba122d632f700074069c5&pageNum=${
      pageParam || 0
    }&pageSize=10&searchText=${searchValue}`,
    undefined,
    {
      headers: {
        "x-auth-token": await getAccessToken(),
      },
    }
  ).then((res) => {
    return {
      data: res.data?.data?.threadsData,
      nextPage: pageParam + 1,
    };
  });
};
