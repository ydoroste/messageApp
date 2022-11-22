import {useQuery} from "react-query";
import {verifyUserApi} from "@followBack/Apis/VerifyUser";
import {IVerifyUserApiRequest, IVerifyUserApiResponse} from "@followBack/Apis/VerifyUser/types";
import {IApiError} from "@followBack/Apis/types";

export const useVerifyUser = (request: IVerifyUserApiRequest) => {
    return useQuery<IVerifyUserApiResponse, IApiError>("verifyUser", () => verifyUserApi(request), {
        enabled: false,
        retry: 0
    })
};

