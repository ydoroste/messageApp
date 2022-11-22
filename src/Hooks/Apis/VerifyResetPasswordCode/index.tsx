import {useQuery} from "react-query";
import {verifyResetPasswordCodeApi} from "@followBack/Apis/VerifyResetPasswordCode";
import {IVerifyResetPasswordCodeApiRequest, IVerifyResetPasswordCodeApiResponse} from "@followBack/Apis/VerifyResetPasswordCode/types";
import {AxiosError} from "axios";

export const useVerifyResetPasswordCode = (request: IVerifyResetPasswordCodeApiRequest)=>{
return useQuery<IVerifyResetPasswordCodeApiResponse, AxiosError<any>>("verifyResetPasswordCode",
    ()=> verifyResetPasswordCodeApi(request), {enabled: false,
    retry: 0
})
};

