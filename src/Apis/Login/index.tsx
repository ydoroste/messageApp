import {PostApi} from "@followBack/Utils/httpApis/apis";
import {ApiEndpoints} from "@followBack/Apis";
import {ILoginApiRequest, ILoginApiResponse} from "@followBack/Apis/Login/types";

export const loginApi = (request: ILoginApiRequest) => {
    return PostApi<ILoginApiRequest, ILoginApiResponse>(ApiEndpoints.Login, request).then(res => res.data);
};