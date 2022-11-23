import {PostApi} from "@followBack/Utils/httpApis/apis";
import {Apis} from "@followBack/Apis";
import {IForgetPasswordApiRequest, IForgetPasswordApiResponse} from "@followBack/Apis/ForgetPassword/types";

export const forgetPasswordApi = (request: IForgetPasswordApiRequest) => {
    return PostApi<IForgetPasswordApiRequest, IForgetPasswordApiResponse>
    (Apis.forgetPassword, request).then(res => res.data);
};