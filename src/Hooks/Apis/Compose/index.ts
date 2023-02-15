import {useQuery} from "react-query";
import {composeApi} from "@followBack/Apis/Compose";
import {IComposeApiRequest, IComposeApiResponse} from "@followBack/Apis/Compose/types";
import {AxiosError} from "axios";

export const useCompose = (request: IComposeApiRequest) => {
    return useQuery<IComposeApiResponse, AxiosError<IComposeApiResponse>>("compose", () => composeApi(request),
        {
            enabled: false,
            retry: 0
        })
};

