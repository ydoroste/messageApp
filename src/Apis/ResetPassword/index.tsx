import {PostApi} from "@followBack/Utils/httpApis/apis";
import {Apis} from "@followBack/Apis";
import {IResetPasswordApiRequest, IResetPasswordApiResponse} from "@followBack/Apis/ResetPassword/types";

export const resetPasswordApi = (request: IResetPasswordApiRequest) => {
    return PostApi<IResetPasswordApiRequest, IResetPasswordApiResponse>(Apis.resetPassword, request).then(res => res.data);
};