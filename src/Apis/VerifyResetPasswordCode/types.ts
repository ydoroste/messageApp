export interface IVerifyResetPasswordCodeApiRequest {
    user_name: string,
    code: string
}
export interface IVerifyResetPasswordCodeApiResponse {
    success?: boolean,
    message?: string,
    data: IVerifyResetPasswordCodeData
}

export interface IVerifyResetPasswordCodeData {
    resetToken: string
}