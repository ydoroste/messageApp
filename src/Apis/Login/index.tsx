import {PostApi} from "@followBack/Utils/httpApis/apis";
import {Apis} from "@followBack/Apis";
import {ILoginApiRequest, ILoginApiResponse} from "@followBack/Apis/Login/types";

export const loginApi = (request: ILoginApiRequest) => {
    return PostApi<ILoginApiRequest, ILoginApiResponse>(Apis.Login, request).then(res => res.data);
};