import {PostApi} from "@followBack/Utils/httpApis/apis";
import {ApiEndpoints} from "@followBack/Apis";
import {IResetPasswordApiRequest, IResetPasswordApiResponse} from "@followBack/Apis/ResetPassword/types";

export const resetPasswordApi = (request: IResetPasswordApiRequest) => {
    return PostApi<IResetPasswordApiRequest, IResetPasswordApiResponse>(ApiEndpoints.resetPassword, request).then(res => res.data);
};