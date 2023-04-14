import {QueryClient} from "react-query";
import * as React from "react";
import axios from "axios";

import {UserProvider} from "@followBack/Contexts/UserContext";
import MainApp from "@followBack/mainApp";
import {HoldMenuProvider} from "react-native-hold-menu";
import {BlurView} from "expo-blur";

const queryClient = new QueryClient();
axios.defaults.baseURL = 'http://mail.iinboxx.com:4000/api/';

const App: React.FC = () => {
    return (
        <UserProvider>
        <HoldMenuProvider theme="dark" safeAreaInsets={{ top: 0, bottom: 0, right: 0, left: 0 }}>
            <MainApp/>
        </HoldMenuProvider>
        </UserProvider>

    );
};
export default App;