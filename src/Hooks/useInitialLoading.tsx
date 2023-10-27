import useFonts from "./useFonts";
import { useEffect, useState } from "react";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import CachingLayer from "@followBack/Classes/CachingLayer";

export default () => {
  const [fontLoaded] = useFonts();
  const { isLoading } = useUserDetails();
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      if (!isLoading && fontLoaded) {
        await CachingLayer.loadCachedData();

        setIsAppLoaded(true);
      }
    };
    loadApp();
  }, [isLoading, fontLoaded]);

  return [isAppLoaded] as const;
};
