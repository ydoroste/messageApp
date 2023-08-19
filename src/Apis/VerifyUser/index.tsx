import {PostApi} from "@followBack/Utils/httpApis/apis";
import {ApiEndpoints} from "@followBack/Apis";
import {IVerifyUserApiRequest, IVerifyUserApiResponse} from "@followBack/Apis/VerifyUser/types";

export const verifyUserApi = (request: IVerifyUserApiRequest) => {
    return PostApi<IVerifyUserApiRequest, IVerifyUserApiResponse>(ApiEndpoints.VerifyUser, request).then(res => res.data);
};