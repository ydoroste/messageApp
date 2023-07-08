import { GetApi } from "@followBack/Utils/httpApis/apis";
import { ApiEndpoints } from "@followBack/Apis";
import { MailBoxdData } from "./types";
import { BETA_SERVICE_URL, CORE_SERVICE_URL } from "../constants";
import { getAccessToken } from "@followBack/Utils/accessToken";

export const getUserMailBoxes = async () => {
  return GetApi<MailBoxdData>(`${BETA_SERVICE_URL}${ApiEndpoints.getUserMailBoxes}`, undefined, {
    'x-auth-header': await getAccessToken()
  }).then((res) => res.data);
};
