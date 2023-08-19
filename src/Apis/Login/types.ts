import {IApiError} from "@followBack/Apis/types";

export interface ILoginApiRequest {
    user_name: string,
    password: string
}

export interface ILoginApiResponse {
    success: boolean,
    data: ILoginApiResponseData | IApiError
    message?: string
}

export interface ILoginApiResponseData {
    user: ILoginApiUserDetails,
    accessToken: string
}

interface ILoginApiUserDetails {
    id: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    gender: string;
    user_name: string;
    phone_number: string;
    wildduck_user_id: string;
    email?: string;
}