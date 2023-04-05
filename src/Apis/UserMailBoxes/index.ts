import { GetApi } from "@followBack/Utils/httpApis/apis";
import { Apis } from "@followBack/Apis";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { MailBoxdData } from "./types";

export const getUserMailBoxes = async () => {
  return GetApi<MailBoxdData>(`${CORE_SERVICE_URL}${Apis.getUserMailBoxes}`, undefined, {
    headers: {
      "x-auth-token": await getAccessToken(),
    },
  }).then((res) => res.data);
};
