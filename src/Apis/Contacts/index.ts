import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { ApiEndpoints } from "@followBack/Apis";
import { IContactListApiResponse, IGetUsernameReponse } from "./types";

export const getContactsListApi = async ({ searchValue }: {searchValue: string}) => {
  return GetApi<IContactListApiResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.contactsList}?search=${searchValue}`
  ).then((res) => {
    return res.data?.data;
  });
};

export const getUsernameAPI = async ({ forAddress }: {forAddress: string}) => {
  return GetApi<IGetUsernameReponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.contactsList}/${forAddress}`
  ).then((res) => {
    return res.data;
  });
};