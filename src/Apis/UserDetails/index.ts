import { GetApi } from "@followBack/Utils/httpApis/apis";
import { AUTH_SERVICE_URL } from "@followBack/Apis/constants";
import { ApiEndpoints } from "@followBack/Apis";

export const getUserDetailsApi = async () => {
  return GetApi<IUserDetailsAPIResponse>(
    `${AUTH_SERVICE_URL}${ApiEndpoints.threadList}`
  )
  .then((res) => res.data)
  .catch((e) => console.log(e.response.data));
};
