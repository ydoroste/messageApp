import {createContext, useEffect, useState} from "react";
import {theme} from "@followBack/Theme/Theme";
import * as React from "react";
import {Theme} from "@followBack/Theme/Theme.types";
import {IUserContext, IUserDetails, IUserProviderProp} from "@followBack/Contexts/UserContext/types";
import {deleteAccessToken, getAccessToken, setAccessToken} from "@followBack/Utils/accessToken";

export const UserContext = createContext<IUserContext>({
    isAuthenticated: false,
    isLoading: true
} as IUserContext);

 export const UserProvider: React.FC<IUserProviderProp> = ({children}) =>{
     const [isLoading, setIsLoading] = useState(true);
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [userDetails, setUserDetails] = useState<IUserDetails>({});

     useEffect(() => {
         const getToken = async () => {
             try {
                 const token = await getAccessToken();
                 if (!token || token === "") {
                     setIsAuthenticated(false);
                     setIsLoading(false);
                     return ;
                 }
                 setIsLoading(false);
                 setIsAuthenticated(true);
             } catch (e) {
                 setIsAuthenticated(false);
                 setIsLoading(false);
                 //just in case any errors with the access key
                 await deleteAccessToken();
             }
         };
         getToken();
     }, []);

     return <UserContext.Provider value={{isLoading, isAuthenticated, userDetails, setIsAuthenticated}}>
         {children}
     </UserContext.Provider>
};