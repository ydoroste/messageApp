import {PostApi} from "@followBack/Utils/httpApis/apis";
import {Apis} from "@followBack/Apis";
import {
    IResendVerificationCodeRequest,
    IResendVerificationCodeResponse
} from "@followBack/Apis/ResendVerificationCode/types";

export const resendVerificationCodeApi = (request: IResendVerificationCodeRequest) => {
    return PostApi<IResendVerificationCodeRequest, IResendVerificationCodeResponse>(Apis.resendVerificationCode, request).then(res => res.data);
};