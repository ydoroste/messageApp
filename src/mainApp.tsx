import * as React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "@followBack/Contexts/ThemeContext";
import {Provider as PaperProvider} from "react-native-paper";
import {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import UnauthorizedNavigation from "@followBack/Navigation/Unauthorized";
import AuthorizedNavigation from "@followBack/Navigation/Authorized";
import useInitialLoading from "@followBack/Hooks/useInitialLoading";
import {useUserDetails} from "@followBack/Hooks/useUserDetails";
import { MailBoxesProvider } from "./Contexts/MailBoxesContext";
import axios from "axios";
import { getAccessToken } from "./Utils/accessToken";
import { AUTH_SERVICE_URL, CORE_SERVICE_URL } from "./Apis/constants";

const queryClient = new QueryClient();

const setupAxios = (isAuthenticated: boolean) => {
    axios.create({
        baseURL: isAuthenticated ? CORE_SERVICE_URL : AUTH_SERVICE_URL 
    });

    axios.interceptors.request.use(async function (config) {
        console.log("Request interceptor");
        if (!isAuthenticated) return config;
        const token = await getAccessToken();
        config.headers['x-auth-token'] =  token;
        return config;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        console.log(response);
        console.log(response.data);
            // Edit response config
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });
}

const MainApp: React.FC = () => {
    const [isAppLoaded] = useInitialLoading();
    const {isAuthenticated} = useUserDetails();
    if (!isAppLoaded) {
        return null;
    }
    setupAxios(isAuthenticated);
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <PaperProvider>
                        <View style={{flex: 1}}>
                            <NavigationContainer>
                                <StatusBar style="light"/>
                                {isAuthenticated ? (
                                    <MailBoxesProvider>
                                        <AuthorizedNavigation/>
                                    </MailBoxesProvider>
                                ) : (
                                    <UnauthorizedNavigation/>
                                )}
                            </NavigationContainer>
                        </View>
                </PaperProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
export default MainApp;
