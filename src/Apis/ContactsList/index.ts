import { GetApi } from "@followBack/Utils/httpApis/apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { Apis } from "@followBack/Apis";

export const getContactsListApi = async ({ searchValue }) => {
  return GetApi(
    `${CORE_SERVICE_URL}${Apis.contactsList}?search=${searchValue}`,
    undefined,
    {
      headers: {
        "x-auth-token": await getAccessToken(),
      },
    }
  ).then((res) => {
    return res.data?.data;
  });
};
