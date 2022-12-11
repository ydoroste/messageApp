
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {QueryClient, QueryClientProvider} from "react-query";
import UnauthorizedNavigation from "@followBack/Navigation/Unauthorized";
import {NavigationContainer} from '@react-navigation/native';
import * as React from "react";
import {Provider as PaperProvider} from 'react-native-paper';
import useInitialLoading from "@followBack/Hooks/useInitialLoading";
import {ThemeProvider} from "@followBack/Contexts/ThemeContext";
import axios from "axios";

import {UserProvider} from "@followBack/Contexts/UserContext";
import MainApp from "@followBack/mainApp";

const queryClient = new QueryClient();
axios.defaults.baseURL = 'http://mail.iinboxx.com:4000/api/';

const App: React.FC = () => {
    return (
        <UserProvider>
            <MainApp/>
        </UserProvider>

    );
};
export default App;