import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import usePrevious from "./usePrevious";

const useInternetFetchData = (refetch: any) => {
  const netInfo = useNetInfo();

  const previousNetInfo = usePrevious(netInfo.isInternetReachable);
  useEffect(() => {
    if (previousNetInfo === false && netInfo.isInternetReachable === true) {
      refetch();
    }
  }, [previousNetInfo, netInfo.isInternetReachable]);
};

export default useInternetFetchData;
