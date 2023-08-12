import { GetApi } from '@followBack/Utils/httpApis/apis';
import { ApiEndpoints } from '@followBack/Apis';
import { MailBoxdData } from './types';
import { CORE_SERVICE_URL } from '../constants';
import { getAccessToken } from '@followBack/Utils/accessToken';

export const getUserMailBoxes = async () => {
  return GetApi<MailBoxdData>(
    `${CORE_SERVICE_URL}${ApiEndpoints.getUserMailBoxes}`,
    undefined,
    {
      'x-auth-header': await getAccessToken(),
    }
  ).then((res) => res.data);
};
