import { GetApi } from '@followBack/Utils/httpApis/apis';
import { CORE_SERVICE_URL } from '@followBack/Apis/constants';
import { ApiEndpoints } from '@followBack/Apis';
import {
  IContact,
  IContactListApiResponse,
  IGetUsernameReponse,
} from './types';

export const getContactsListApi = async ({
  searchValue,
}: {
  searchValue: string;
}) => {
  return GetApi<IContactListApiResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.contactsList}?search=${searchValue}`
  ).then(async (res) => {
    console.log(searchValue);
    if (
      res.data.data.contacts.length < 1 &&
      searchValue.toLocaleLowerCase().includes('@iinboxx')
    ) {
      const { name, address } = await getUsernameAPI({
        forAddress: searchValue,
      });
      return {
        contacts: [{ name: name, address: address }],
        page: res.data.page,
        totalCount: res.data.totalCount,
      };
    }
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
      return { name: forAddress, address: forAddress };
    });
};
