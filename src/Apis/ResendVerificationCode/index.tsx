import {PostApi} from "@followBack/Utils/httpApis/apis";
import {ApiEndpoints} from "@followBack/Apis";
import {
    IResendVerificationCodeRequest,
    IResendVerificationCodeResponse
} from "@followBack/Apis/ResendVerificationCode/types";

export const resendVerificationCodeApi = (request: IResendVerificationCodeRequest) => {
    return PostApi<IResendVerificationCodeRequest, IResendVerificationCodeResponse>(ApiEndpoints.resendVerificationCode, request).then(res => res.data);
};