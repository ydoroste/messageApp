import { GetApi } from "@followBack/Utils/httpApis/apis";
import { BETA_SERVICE_URL, CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { ApiEndpoints } from "@followBack/Apis";
import { IthreadsListAPIRequest, IthreadsListAPIResponse } from "./type";

export const getThreadListApi = async (req: IthreadsListAPIRequest) => {
  return GetApi<IthreadsListAPIResponse>(
    `${BETA_SERVICE_URL}${ApiEndpoints.threadList}?mailboxId=${req.id}&pageNum=${Number(
      req.pageParam || 1
    )}&pageSize=100&searchText=${req.searchValue}`
  )
  .then((res) => res.data)
  .catch((e) => console.log(e.response.data));
};
