export interface IResendVerificationCodeRequest {
    user_name: string
}
export interface IResendVerificationCodeResponse {
    success?: boolean,
    message?: string
}