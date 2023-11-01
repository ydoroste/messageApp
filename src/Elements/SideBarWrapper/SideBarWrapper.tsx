import SideOptions from "@followBack/GenericElements/SideOptions";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { StackActions, useNavigationState } from "@react-navigation/native";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { useQueryClient } from "react-query";
import logOut from "@followBack/Utils/logOut";
import Current from "@followBack/Classes/Current";
import Socket from "@followBack/Classes/Socket";

interface SideBarWrapperProps {
  children: React.ReactNode;
  navigationRef: any;
}

const indexToName = {
  0: AuthorizedScreensEnum.compose,
  1: AuthorizedScreensEnum.inbox,
  2: AuthorizedScreensEnum.bookMark,
};

const nameToIndex = {
  [AuthorizedScreensEnum.compose]: 0,
  [AuthorizedScreensEnum.inbox]: 1,
  [AuthorizedScreensEnum.bookMark]: 2,
};

const SideBarWrapper = ({ children, navigationRef }: SideBarWrapperProps) => {
  const routes = useNavigationState((state) => state?.routes || []);
  const currentRoute = routes[routes.length - 1]?.name;

  const queryClient = useQueryClient();

  Current.screen = currentRoute;

  const { setIsAuthenticated } = useUserDetails();

  const onPress = async (index: number) => {
    if (indexToName[index]) {
      navigationRef.current.navigate(indexToName[index]); //TODO:
      // navigationRef.current.dispatch(StackActions.replace(indexToName[index]));
    } else if (index === 5) {
      await logOut(queryClient);
      setIsAuthenticated(false);
    } else {
      alert("not implemented yet");
    }
  };

  return (
    <>
      {children}
      {![
        AuthorizedScreensEnum.threadDetails,
        AuthorizedScreensEnum.compose,
      ].includes(currentRoute) && (
        <SideOptions
          onPress={onPress}
          selectedIndex={nameToIndex[currentRoute]}
        />
      )}
    </>
  );
};

export default SideBarWrapper;

const styles = StyleSheet.create({
  container: {},
});
