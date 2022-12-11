import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "@followBack/Contexts/ThemeContext";
import {Provider as PaperProvider} from "react-native-paper";
import {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import UnauthorizedNavigation from "@followBack/Navigation/Unauthorized";
import AuthorizedNavigation from "@followBack/Navigation/Authorized";
import * as React from "react";
import useInitialLoading from "@followBack/Hooks/useInitialLoading";
import {useUserDetails} from "@followBack/Hooks/useUserDetails";

const queryClient = new QueryClient();

const MainApp: React.FC = () => {

    const [isAppLoaded] = useInitialLoading();
    const {isAuthenticated} = useUserDetails();
    if (!isAppLoaded) {
        return null;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <PaperProvider>
                    <View style={{flex: 1}}>
                        <NavigationContainer>
                            <StatusBar style="light"/>
                            {
                                isAuthenticated ?
                                    <AuthorizedNavigation/> :
                                    <UnauthorizedNavigation/>
                            }

                        </NavigationContainer>
                    </View>
                </PaperProvider>
            </ ThemeProvider>
        </QueryClientProvider>)

};
export default MainApp;