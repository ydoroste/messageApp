import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { ApiEndpoints } from "@followBack/Apis";
import { IContactListApiResponse } from "./types";

export const getContactsListApi = async ({ searchValue }: {searchValue: string}) => {
  return GetApi<IContactListApiResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.contactsList}?search=${searchValue}`
  ).then((res) => {
    return res.data?.data;
  });
};
