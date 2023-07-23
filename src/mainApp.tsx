import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@followBack/Contexts/ThemeContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import UnauthorizedNavigation from '@followBack/Navigation/Unauthorized';
import AuthorizedNavigation from '@followBack/Navigation/Authorized';
import useInitialLoading from '@followBack/Hooks/useInitialLoading';
import { useUserDetails } from '@followBack/Hooks/useUserDetails';
import { MailBoxesProvider } from './Contexts/MailboxesContext';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from './Utils/accessToken';
import {
  AUTH_SERVICE_URL,
  BETA_SERVICE_URL,
  CORE_SERVICE_URL,
} from './Apis/constants';
import { ApiEndpoints } from './Apis';
import { UserProvider } from './Contexts/UserContext';
import * as Sentry from '@sentry/react-native';
import { useEffect } from 'react';

Sentry.init({
  dsn: 'https://f41e5438e6ca4afbb49f893e2e7a6a49@o4505546560569344.ingest.sentry.io/4505546564501504',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableNative: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 2 * 60 * 1000,
    },
  },
});

const getBaseURL = (request: InternalAxiosRequestConfig) => {
  if (
    request.url == ApiEndpoints.Login ||
    request.url == ApiEndpoints.VerifyUser ||
    request.url == ApiEndpoints.forgetPassword ||
    request.url == ApiEndpoints.register ||
    request.url == ApiEndpoints.resetPassword ||
    request.url == ApiEndpoints.resendVerificationCode ||
    request.url == ApiEndpoints.verifyResetPasswordCode ||
    request.url == ApiEndpoints.userDetailsPath
  ) {
    return AUTH_SERVICE_URL;
  }
  return CORE_SERVICE_URL;
};

const MainApp: React.FC = () => {
  const [isAppLoaded] = useInitialLoading();
  const { isAuthenticated } = useUserDetails();
  if (!isAppLoaded) {
    return null;
  }
  axios.interceptors.request.use(
    (request) => {
      request.baseURL = getBaseURL(request);
      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.request.use(
    async function (config) {
      if (!isAuthenticated) return config;
      const token = await getAccessToken();
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PaperProvider>
          <View style={{ flex: 1 }}>
            <NavigationContainer>
              <StatusBar style='light' />
              {isAuthenticated ? (
                <UserProvider>
                  <MailBoxesProvider>
                    <AuthorizedNavigation />
                  </MailBoxesProvider>
                </UserProvider>
              ) : (
                <UnauthorizedNavigation />
              )}
            </NavigationContainer>
          </View>
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
export default MainApp;
