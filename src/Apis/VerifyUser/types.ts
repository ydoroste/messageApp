export interface IVerifyUserApiRequest {
    code: string,
    user_name: string
}
export interface IVerifyUserApiResponse {
    success?: boolean,
    message?: string
}