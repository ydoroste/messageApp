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
  birth_date: Date;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  phone_number: string;
  user_name: string;
  wildduck_user_id: string;
  email: string;
}
