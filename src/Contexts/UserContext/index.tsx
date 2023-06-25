import { createContext, useEffect, useState } from "react";
import * as React from "react";
import {
  IUserContext,
  IUserDetails,
  IUserProviderProp,
} from "@followBack/Contexts/UserContext/types";
import {
  deleteAccessToken,
  getAccessToken,
} from "@followBack/Utils/accessToken";

import { Apis } from "@followBack/Apis";
import { GetApi } from "@followBack/Utils/httpApis/apis";
import { AUTH_SERVICE_URL } from "@followBack/Apis/constants";

export const UserProvider: React.FC<IUserProviderProp> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    birth_date: new Date(),
    first_name: "",
    gender: "",
    id: "",
    last_name: "",
    phone_number: "",
    user_name: "",
    wildduck_user_id: "",
    email: ""
  });

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessToken();

        if (!token || token === "") {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (e) {
        setIsAuthenticated(false);
        setIsLoading(false);
        //just in case any errors with the access key
        await deleteAccessToken();
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const getUserDetails = async () => {
      try {
        const token = await getAccessToken();
        const { data: {userInfo} } = await GetApi(
          `${AUTH_SERVICE_URL}${Apis.userDetailsPath}`,
          undefined,
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserDetails(userInfo);
      } catch (e) {
        setIsAuthenticated(false);
      }
    };
    getUserDetails();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{ isLoading, isAuthenticated, userDetails, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserContext = createContext<IUserContext>({} as IUserContext);