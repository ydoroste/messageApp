import {useQuery} from "react-query";
import {resetPasswordApi} from "@followBack/Apis/ResetPassword";
import {IResetPasswordApiRequest, IResetPasswordApiResponse} from "@followBack/Apis/ResetPassword/types";
import {AxiosError} from "axios";

export const useResetPassword = (request: IResetPasswordApiRequest) => {
    return useQuery<IResetPasswordApiResponse, AxiosError<any>>("resetPassword",
        () => resetPasswordApi(request), {
            enabled: false,
            retry: 0
        })
};

