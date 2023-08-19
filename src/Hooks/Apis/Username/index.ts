import {useQuery} from "react-query";
import {getUsernameAPI} from "@followBack/Apis/Contacts";
import { IGetUsernameReponse } from "@followBack/Apis/Contacts/types";
import {AxiosError} from "axios";

export const useGetUsername = ({forAddress}: {forAddress: string}) => {
    return useQuery<IGetUsernameReponse, AxiosError<IGetUsernameReponse>>(`username-${forAddress}`, () => getUsernameAPI({forAddress: forAddress}),
        {
            enabled: false,
            retry: 0,
            cacheTime: 0
        })
};
