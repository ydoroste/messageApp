import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { ApiEndpoints } from "@followBack/Apis";
import { IthreadsListAPIRequest, IthreadsListAPIResponse } from "./type";
import { sortDataSet } from "@followBack/Utils/sortedDataUponDate";

export const THREADS_LIMIT = 20;

export const getThreadListApi = async (req: IthreadsListAPIRequest) => {
  return GetApi<IthreadsListAPIResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.threadList}?mailboxId=${
      req.id
    }&pageNumber=${Number(
      req.pageParam
    )}&pageSize=${THREADS_LIMIT}&searchText=${req.searchValue}`
  )
    .then((res) => {
      return {
        totalCount: res.data.totalCount,
        data: sortDataSet(res.data.data),
        page: res.data.page,
      };
    })
    .catch((e) => console.log(e.response.data));
};
