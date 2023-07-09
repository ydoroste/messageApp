import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IUserProviderProp {
  children: ReactNode;
}

export interface IUserContext {
  isAuthenticated: boolean;
  userDetails: IUserDetails;
  isLoading: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserDetails: Dispatch<SetStateAction<IUserDetails>>
}

export interface IUserDetails {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  user_name: string;
  phone_number: string;
  wildduck_user_id: string;
  email?: string;
}
