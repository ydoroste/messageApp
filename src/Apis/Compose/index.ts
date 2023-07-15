import { PostApi, PutApi } from "@followBack/Utils/httpApis/apis";
import { ApiEndpoints } from "@followBack/Apis";
import {
  IComposeApiRequest,
  IComposeApiResponse,
} from "@followBack/Apis/Compose/types";
import { CORE_SERVICE_URL } from "@followBack/Apis/constants";

export const snatizeComposeApi = (request: IComposeApiRequest) => {
  const toBeSnatizedKeys = ["ccList", "bccList"];
  return Object.keys(request).reduce((acc, key) => {
    if (toBeSnatizedKeys.includes(key) && request?.[key].length === 0) return acc;
    //@ts-ignore
    acc[key] = request[key];
    return acc;
  }, {}) as IComposeApiRequest;
};

export const composeApi = async (request: IComposeApiRequest) => {
  console.log("-------REQUEST------->", JSON.stringify(request));
  return PostApi<IComposeApiRequest, IComposeApiResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.compose}`,
    snatizeComposeApi(request)
  ).then((res) =>  res.data);
};

export const editMessageApi = async (request: IComposeApiRequest) => {
  return PutApi<IComposeApiRequest, IComposeApiResponse>(
    `${CORE_SERVICE_URL}${ApiEndpoints.editMessage}`,
    snatizeComposeApi(request)
  ).then((res) =>  res.data);
};