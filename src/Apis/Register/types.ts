export interface IRegisterApiRequest {
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  user_name: string;
  phone_number: string;
  password: string;
  terms_and_conditions?: boolean;
}

export interface IRegisterApiResponseError {
  success: boolean;
  response: {
    data: {
      errors: {
        first_name?: string;
        last_name?: string;
        gender?: string;
        birth_date?: string;
        user_name?: string;
        phone_number?: string;
        password?: string;
        terms_and_conditions?: boolean;
      };
    };
  };
}
export interface IRegisterApiResponse {
  success: boolean;
  message?: string;
} 
