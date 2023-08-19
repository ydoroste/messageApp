import {PostApi} from "@followBack/Utils/httpApis/apis";
import {ApiEndpoints} from "@followBack/Apis";
import {IVerifyResetPasswordCodeApiRequest, IVerifyResetPasswordCodeApiResponse} from "@followBack/Apis/VerifyResetPasswordCode/types";

export const verifyResetPasswordCodeApi = (request: IVerifyResetPasswordCodeApiRequest) => {
    return PostApi<IVerifyResetPasswordCodeApiRequest, IVerifyResetPasswordCodeApiResponse>(ApiEndpoints.verifyResetPasswordCode, request).then(res => res.data);
};