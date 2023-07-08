import {PostApi} from "@followBack/Utils/httpApis/apis";
import {ApiEndpoints} from "@followBack/Apis";
import {IForgetPasswordApiRequest, IForgetPasswordApiResponse} from "@followBack/Apis/ForgetPassword/types";

export const forgetPasswordApi = (request: IForgetPasswordApiRequest) => {
    return PostApi<IForgetPasswordApiRequest, IForgetPasswordApiResponse>
    (ApiEndpoints.forgetPassword, request).then(res => res.data);
};