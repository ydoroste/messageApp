import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IUserProviderProp {
  children: ReactNode;
}

export interface IUserContext {
  isAuthenticated: boolean;
  userDetails: IUserDetails;
  isLoading: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export interface IUserDetails {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  gender: string;
  user_name: string;
  email: string;
  phone_number: string;
  wildduck_user_id: string;
}
