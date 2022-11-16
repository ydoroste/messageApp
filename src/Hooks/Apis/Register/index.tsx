import {useQuery} from "react-query";
import {IRegisterApiRequest, IRegisterApiResponse} from "@followBack/Apis/Register/types";
import {IErrorType} from "@followBack/Hooks/Apis/Register/types";
import {registerApi} from "@followBack/Apis/Register";

export const useRegister = (request: IRegisterApiRequest)=>{
return useQuery<IRegisterApiResponse, IErrorType>("register", ()=> registerApi(request), {enabled: false})
};

