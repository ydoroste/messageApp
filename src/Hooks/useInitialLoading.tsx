import useFonts from "./useFonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import CachingLayer from "@followBack/Classes/CachingLayer";

SplashScreen.preventAutoHideAsync();

export default () => {
  const [fontLoaded] = useFonts();
  const { isLoading } = useUserDetails();
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      if (!isLoading && fontLoaded) {
        await CachingLayer.loadCachedData();
        await SplashScreen.hideAsync();

        setIsAppLoaded(true);
      }
    };
    loadApp();
  }, [isLoading, fontLoaded]);

  return [isAppLoaded] as const;
};
