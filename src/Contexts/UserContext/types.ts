import {Dispatch, ReactNode, SetStateAction} from "react";

export interface IUserProviderProp {
    children: ReactNode
}

export interface IUserContext {
    isAuthenticated: boolean,
    userDetails: IUserDetails
    isLoading: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

export interface IUserDetails {

}