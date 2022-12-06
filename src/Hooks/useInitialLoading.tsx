import useFonts from "./useFonts";
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from "react";
import {useUserDetails} from "@followBack/Hooks/useUserDetails";

SplashScreen.preventAutoHideAsync();

export default () =>{
const [fontLoaded]= useFonts();
const {isLoading} = useUserDetails();
const isAppLoaded = fontLoaded && !isLoading;

    useEffect(()=>{
        const loadApp = async () => {
        //    console.log("font loaded", isAppLoaded);
        //    console.log("font loaded", isAppLoaded);
            await SplashScreen.hideAsync();
        };

        isAppLoaded && loadApp();

    }, [isAppLoaded]);

return [isAppLoaded] as const;
};

