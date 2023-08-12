import { createContext, useEffect, useState } from 'react';
import * as React from 'react';
import {
  IUserContext,
  IUserDetails,
  IUserProviderProp,
} from '@followBack/Contexts/UserContext/types';
import {
  deleteAccessToken,
  getAccessToken,
} from '@followBack/Utils/accessToken';

import { ApiEndpoints } from '@followBack/Apis';
import { GetApi } from '@followBack/Utils/httpApis/apis';
import { AUTH_SERVICE_URL } from '@followBack/Apis/constants';

export interface GetDetailsAPIResponse {
  success: boolean;
  data: IUserDetails;
}

export const UserProvider: React.FC<IUserProviderProp> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userDetails, setUserDetails] = useState<IUserDetails>({
    birth_date: '',
    first_name: '',
    gender: '',
    id: '',
    last_name: '',
    phone_number: '',
    user_name: '',
    wildduck_user_id: '',
    email: '',
  });

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessToken();
        if (!token || token === '') {
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

  const getUserDetails = async () => {
    try {
      const token = await getAccessToken();
      const { data } = await GetApi<GetDetailsAPIResponse>(
        `${AUTH_SERVICE_URL}${ApiEndpoints.userDetailsPath}`,
        undefined,
        {
          headers: { 'x-auth-token': token },
        }
      );
      setUserDetails(data.data);
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    // getUserDetails();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        userDetails,
        setIsAuthenticated,
        setUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserContext = createContext<IUserContext>({} as IUserContext);
