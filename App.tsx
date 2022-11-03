import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UnauthorizedNavigation from "@followBack/Navigation/Unauthorized";
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import useInitialLoading from "@followBack/Hooks/useInitialLoading";
import {ThemeProvider} from "@followBack/Contexts/ThemeContext";


export default function App() {
        const [isAppLoaded] = useInitialLoading();

    if (!isAppLoaded) {
        return null;
    }
    return (
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
  );
}
