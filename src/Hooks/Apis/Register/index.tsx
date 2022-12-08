import {useQuery} from "react-query";
<<<<<<< HEAD
import {IRegisterApiRequest, IRegisterApiResponse, IRegisterApiResponseError} from "@followBack/Apis/Register/types";
=======
import {IRegisterApiRequest, IRegisterApiResponse} from "@followBack/Apis/Register/types";
>>>>>>> main
import {registerApi} from "@followBack/Apis/Register";
import {IApiError} from "@followBack/Apis/types";

export const useRegister = (request: IRegisterApiRequest)=>{
<<<<<<< HEAD
return useQuery<IRegisterApiResponse, IRegisterApiResponseError>("register", ()=> registerApi(request), {enabled: false, retry: 0})
=======
return useQuery<IRegisterApiResponse, IApiError>("register", ()=> registerApi(request), {enabled: false, retry: 0})
>>>>>>> main
};

