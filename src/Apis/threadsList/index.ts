import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { ApiEndpoints } from "@followBack/Apis";
import { IthreadsListAPIRequest, IthreadsListAPIResponse } from "./type";
import { sortDataSet } from "@followBack/Utils/sortedDataUponDate";
import { insertThreadsToLDB } from "@followBack/Utils/localDb/actions/threadList";
import { Thread } from "@followBack/Utils/localDb/schemas";

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
      insertThreadsToLDB(res.data.data, req.id)
      return {
        totalCount: res.data.totalCount,
        data: sortDataSet(res.data.data),
        page: res.data.page,
      };
    })
    .catch((e) => console.log(e.response.data));
};

export const getThreadBookMarkListApi = async (
  req: Omit<IthreadsListAPIRequest, "id">
) => {
  return GetApi<IthreadsListAPIResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.getBookMarks}?pageNumber=${Number(
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
