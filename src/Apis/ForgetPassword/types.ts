export interface IForgetPasswordApiRequest {
    user_name: string,
    is_email: ResetMethod
}
export interface IForgetPasswordApiResponse {
    success?: boolean,
    message?: string,
    data: IForgetPasswordData
}
export enum ResetMethod {
    Phone,
    Email

}

export interface IForgetPasswordData {
    phone_number: string,
    secondary_email?: string,
}