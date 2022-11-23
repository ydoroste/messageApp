export interface IResetPasswordApiRequest {
    resetToken: string,
    new_password: string
}
export interface IResetPasswordApiResponse {
    success?: boolean,
    message?: string,
}