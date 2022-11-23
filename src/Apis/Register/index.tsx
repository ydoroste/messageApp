import {PostApi} from "@followBack/Utils/httpApis/apis";
import {Apis} from "@followBack/Apis";
import {IRegisterApiRequest, IRegisterApiResponse} from "@followBack/Apis/Register/types";

export const registerApi = (request: IRegisterApiRequest) => {
    return PostApi<IRegisterApiRequest, IRegisterApiResponse>(Apis.register, request).then(res => res.data);
};