import {PostApi} from "@followBack/Utils/httpApis/apis";
import {ApiEndpoints} from "@followBack/Apis";
import {IRegisterApiRequest, IRegisterApiResponse} from "@followBack/Apis/Register/types";

export const registerApi = (request: IRegisterApiRequest) => {
    return PostApi<IRegisterApiRequest, IRegisterApiResponse>(ApiEndpoints.register, request).then(res => res.data);
}; 