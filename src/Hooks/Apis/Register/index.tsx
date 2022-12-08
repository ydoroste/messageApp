import {useQuery} from "react-query";
import {IRegisterApiRequest, IRegisterApiResponse, IRegisterApiResponseError} from "@followBack/Apis/Register/types";
import {registerApi} from "@followBack/Apis/Register";
import {IApiError} from "@followBack/Apis/types";

export const useRegister = (request: IRegisterApiRequest)=>{
return useQuery<IRegisterApiResponse, IRegisterApiResponseError>("register", ()=> registerApi(request), {enabled: false, retry: 0})
};

