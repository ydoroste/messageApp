import {PostApi} from "@followBack/Utils/httpApis/apis";
import {Apis} from "@followBack/Apis";
import {IVerifyUserApiRequest, IVerifyUserApiResponse} from "@followBack/Apis/VerifyUser/types";

export const verifyUserApi = (request: IVerifyUserApiRequest) => {
    return PostApi<IVerifyUserApiRequest, IVerifyUserApiResponse>(Apis.VerifyUser, request).then(res => res.data);
};