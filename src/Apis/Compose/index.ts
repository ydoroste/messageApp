import { PostApi } from "@followBack/Utils/httpApis/apis";
import { Apis } from "@followBack/Apis";
import {
  IComposeApiRequest,
  IComposeApiResponse,
} from "@followBack/Apis/Compose/types";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";

export const composeApi = async (request: IComposeApiRequest) => {
  return PostApi<IComposeApiRequest, IComposeApiResponse>(
    `${CORE_SERVICE_URL}${Apis.compose}`,
    request,
    undefined,
    {
      headers: {
        "x-auth-token": await getAccessToken(),
      },
    }
  )
    .then((res) => {
      console.log("res", res.data);
      return res.data;
    })
    .catch((e) => {
      console.log("error", e.response.data);
    });
};
