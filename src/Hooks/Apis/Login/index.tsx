import {useQuery} from "react-query";
import {loginApi} from "@followBack/Apis/Login";
import {ILoginApiRequest, ILoginApiResponse} from "@followBack/Apis/Login/types";
import {AxiosError} from "axios";

export const useLogin = (request: ILoginApiRequest) => {
    return useQuery<ILoginApiResponse, AxiosError<any>>("login", () => loginApi(request),
        {
            enabled: false,
            retry: 1,
        })
};

