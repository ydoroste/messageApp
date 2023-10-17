import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@followBack/Contexts/ThemeContext";
import { Provider as PaperProvider } from "react-native-paper";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import UnauthorizedNavigation from "@followBack/Navigation/Unauthorized";
import AuthorizedNavigation from "@followBack/Navigation/Authorized";
import useInitialLoading from "@followBack/Hooks/useInitialLoading";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { MailBoxesProvider } from "./Contexts/MailboxesContext";
import axios, { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./Utils/accessToken";
import { AUTH_SERVICE_URL, CORE_SERVICE_URL } from "./Apis/constants";
import { ApiEndpoints } from "./Apis";
import { UserProvider, UserContext } from "./Contexts/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

let isAuthenticatedRef = false;

const MainApp: React.FC = () => {
  const [isAppLoaded] = useInitialLoading();

  const safeAreaInsets = useSafeAreaInsets();
  if (!isAppLoaded) {
    return null;
  }

  axios.interceptors.request.use(
    async function (request) {
      request.baseURL = getBaseURL(request);
      if (!isAuthenticatedRef) return request;
      const token = await getAccessToken();
      request.headers["Authorization"] = `Bearer ${token}`;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PaperProvider>
          <UserProvider>
            <View style={{ flex: 1 }}>
              <UserContext.Consumer>
                {({ isAuthenticated }) => {
                  isAuthenticatedRef = isAuthenticated;
                  return (
                    <NavigationContainer>
                      <StatusBar style="light" />
                      {(() => {
                        if (isAuthenticated) {
                          return (
                            <MailBoxesProvider>
                              <AuthorizedNavigation />
                            </MailBoxesProvider>
                          );
                        } else if (isAuthenticated === false)
                          return <UnauthorizedNavigation />;

                        return <></>;
                      })()}
                    </NavigationContainer>
                  );
                }}
              </UserContext.Consumer>
            </View>
          </UserProvider>
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
export default MainApp;
