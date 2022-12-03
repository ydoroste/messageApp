export interface IRegisterApiRequest {
    first_name: string,
    last_name: string,
    gender: string,
    birth_date: string,
    user_name: string,
    phone_number: string,
    password: string,
    code: string,
    acceptsCoditionsAndTerms: boolean
}

export interface IRegisterApiResponse {
    success: boolean,
    message?: string
}
