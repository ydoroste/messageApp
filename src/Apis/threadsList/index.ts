import { GetApi } from '@followBack/Utils/httpApis/apis';
import { BETA_SERVICE_URL, CORE_SERVICE_URL } from '@followBack/Apis/constants';
import { ApiEndpoints } from '@followBack/Apis';
import { IthreadsListAPIRequest, IthreadsListAPIResponse } from './type';

export const THREADS_LIMIT = 100;

export const getThreadListApi = async (req: IthreadsListAPIRequest) => {
  return GetApi<IthreadsListAPIResponse>(
    `${BETA_SERVICE_URL}${ApiEndpoints.threadList}?mailboxId=${
      req.id
    }&pageNumber=${Number(
      req.pageParam
    )}&pageSize=${THREADS_LIMIT}&searchText=${req.searchValue}`
  )
    .then((res) => res.data)
    .catch((e) => console.log(e.response.data));
};
