import * as React from "react";
import { useEffect } from "react";
import {UserProvider} from "@followBack/Contexts/UserContext";
import MainApp from "@followBack/mainApp";
import {HoldMenuProvider} from "react-native-hold-menu";
import { CORE_SERVICE_URL, AUTH_SERVICE_URL } from "@followBack/Apis/constants";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { getAccessToken } from "@followBack/Utils/accessToken";
import axios from "axios";

const App: React.FC = () => {
    // Axios setup
    const {isAuthenticated} = useUserDetails();

    axios.create({
        baseURL: isAuthenticated ? CORE_SERVICE_URL : AUTH_SERVICE_URL
    });

    useEffect(()=>{
        axios.interceptors.request.use(async function (config) {
            const token = await getAccessToken();
            config.headers['x-auth-token'] =  token;
            return config;
        }, error => {
            console.log(error);
            return Promise.reject(error);
        });
        
        axios.interceptors.response.use(response => {
            console.log(response);
            // Edit response config
            return response;
        }, error => {
            console.log(error);
            return Promise.reject(error);
        });
},[]);

    return (
        <UserProvider>
        <HoldMenuProvider theme="dark" safeAreaInsets={{ top: 0, bottom: 0, right: 0, left: 0 }}>
            <MainApp/>
        </HoldMenuProvider>
        </UserProvider>

    );
};
export default App;