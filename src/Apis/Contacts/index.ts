import { GetApi } from '@followBack/Utils/httpApis/apis';
import { CORE_SERVICE_URL } from '@followBack/Apis/constants';
import { ApiEndpoints } from '@followBack/Apis';
import { IContactListApiResponse, IGetUsernameReponse } from './types';

export const getContactsListApi = async ({
  searchValue,
}: {
  searchValue: string;
}) => {
  return GetApi<IContactListApiResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.contactsList}?search=${searchValue}`
  ).then((res) => {
    return res.data?.data;
  });
};

export const getUsernameAPI = async ({
  forAddress,
}: {
  forAddress: string;
}) => {
  let re = /\@/gi;
  let result = forAddress.replace(re, '%40');
  return GetApi<IGetUsernameReponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.contactsList}/details/${result}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return forAddress;
    });
};
