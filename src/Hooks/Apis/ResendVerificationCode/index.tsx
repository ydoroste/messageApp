import {useQuery} from "react-query";
import {
    IResendVerificationCodeRequest,
    IResendVerificationCodeResponse
} from "@followBack/Apis/ResendVerificationCode/types";
import {resendVerificationCodeApi} from "@followBack/Apis/ResendVerificationCode";
import {AxiosError} from "axios";

export const useResendVerificationCode = (request: IResendVerificationCodeRequest) => {
    return useQuery<IResendVerificationCodeResponse, AxiosError<any>>("resendVerificationCode",
        () => resendVerificationCodeApi(request), {
            enabled: false,
            retry: 0
        })
};

