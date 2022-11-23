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

interface ILoginApiResponseData {
    user: ILoginApiUserDetails,
    accessToken: string
}

interface ILoginApiUserDetails {
    _id: string,
    verification_code_sent: boolean,
    is_verified: boolean,
    is_active: true,
    invalid_login_attempts: number,
    otp_sent_retries_count: number,
    is_blocked: number,
    first_name: string,
    last_name: string,
    gender: string,
    birth_date: Date,
    user_name: Date,
    phone_number: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
    wildduck_user_id: string,
    block_reason: string,
    opt_block_expiration_date: string,
    resetToken: string

}