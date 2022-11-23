import {useQuery} from "react-query";
import {IForgetPasswordApiRequest, IForgetPasswordApiResponse} from "@followBack/Apis/ForgetPassword/types";
import {forgetPasswordApi} from "@followBack/Apis/ForgetPassword";
import {AxiosError} from "axios";

export const useForgetPassword = (request: IForgetPasswordApiRequest) => {
    return useQuery<IForgetPasswordApiResponse, AxiosError<IForgetPasswordApiResponse>>
    ("forgetPassword", () => forgetPasswordApi(request),
        {
            enabled: false,
            retry: 0
        })
};

