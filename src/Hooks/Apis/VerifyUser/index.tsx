import {useQuery} from "react-query";
import {verifyUserApi} from "@followBack/Apis/VerifyUser";
import {IVerifyUserApiRequest, IVerifyUserApiResponse} from "@followBack/Apis/VerifyUser/types";
import {IErrorType} from "@followBack/Hooks/Apis/VerifyUser/types";
import {AxiosError} from "axios";

export const useVerifyUser = (request: IVerifyUserApiRequest)=>{
return useQuery<IVerifyUserApiResponse, AxiosError<any>>("verifyUser", ()=> verifyUserApi(request), {enabled: false})
};

