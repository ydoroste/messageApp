import {useQuery} from "react-query";
import {IForgetPasswordApiRequest, IForgetPasswordApiResponse} from "@followBack/Apis/ForgetPassword/types";
import {forgetPasswordApi} from "@followBack/Apis/ForgetPassword";
import {AxiosError} from "axios";
import {IApiError} from "@followBack/Apis/types";

export const useForgetPassword = (request: IForgetPasswordApiRequest) => {
    return useQuery<IForgetPasswordApiResponse, AxiosError<IApiError>>
    ("forgetPassword", () => forgetPasswordApi(request),
        {
            enabled: false,
            retry: 0
        })
};

