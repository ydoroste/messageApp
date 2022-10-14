import useFonts from "./useFonts";
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

export default () =>{
const [fontLoaded]= useFonts();
const isAppLoaded = fontLoaded;

    useEffect(()=>{
        const loadApp = async () => {
            console.log("font loaded", isAppLoaded);
            await SplashScreen.hideAsync();
        };

        isAppLoaded && loadApp();

    }, [isAppLoaded]);

return [isAppLoaded] as const;
};

