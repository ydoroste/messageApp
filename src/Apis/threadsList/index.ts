import { GetApi } from '@followBack/Utils/httpApis/apis';
import { BETA_SERVICE_URL, CORE_SERVICE_URL } from '@followBack/Apis/constants';
import { ApiEndpoints } from '@followBack/Apis';
import { IthreadsListAPIRequest, IthreadsListAPIResponse } from './type';
import { THREADS_LIMIT } from '@followBack/Hooks/Apis/ThreadsList';

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
