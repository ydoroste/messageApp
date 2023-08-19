export interface IVerifyUserApiRequest {
    code: string,
    user_name: string,
    terms_and_conditions: boolean;
}
export interface IVerifyUserApiResponse {
    success?: boolean,
    message?: string
}