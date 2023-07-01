import * as React from "react";
import {UserProvider} from "@followBack/Contexts/UserContext";
import MainApp from "@followBack/mainApp";
import {HoldMenuProvider} from "react-native-hold-menu";

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