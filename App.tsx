import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from "react-query";
import UnauthorizedNavigation from "@followBack/Navigation/Unauthorized";
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import useInitialLoading from "@followBack/Hooks/useInitialLoading";
import {ThemeProvider} from "@followBack/Contexts/ThemeContext";
import axios from "axios";

const queryClient = new QueryClient();
axios.defaults.baseURL = 'http://mail.iinboxx.com:4000/api/';

 const App: React.FC = ()=> {
        const [isAppLoaded] = useInitialLoading();

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
                        <UnauthorizedNavigation/>
                    </NavigationContainer>
                </View>
            </PaperProvider>
        </ ThemeProvider>
        </QueryClientProvider>

    );
}
export default App;