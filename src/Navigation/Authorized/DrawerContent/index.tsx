import React from "react";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import useTheme from "@followBack/Hooks/useTheme";
import { deleteAccessToken } from "@followBack/Utils/accessToken";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { AuthorizedScreensEnum } from "../constants";

const CustomDrawerContent = (props) => {
  const { navigation, mailboxes } = props;
  const { colors } = useTheme();
  const { setIsAuthenticated } = useUserDetails();

  const goToScreen = ({ stackName, screenName, params = {} }) => {
    navigation.toggleDrawer();
    navigation.navigate(stackName, { screen: screenName, params });
  };

  const logOut = () => {
    deleteAccessToken();
    setIsAuthenticated(false);
  };
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: colors.black,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      }}
      labelStyle={{ color: "#ffffff" }}
    >
        <DrawerItem
            label={"Inbox"}
            labelStyle={{ color: "#ffffff" }}
            onPress={() =>
                goToScreen({
                    stackName: AuthorizedScreensEnum.threadsListStack,
                    screenName: AuthorizedScreensEnum.threadsList,
                    //  params: { id, path, subscribed },
                })
            }
        />

        <DrawerItem
        label="Compose"
        labelStyle={{ color: "#ffffff" }}
        onPress={() =>
          goToScreen({
            stackName: AuthorizedScreensEnum.composeStack,
            screenName: AuthorizedScreensEnum.compose,
          })
        }
      />

      <DrawerItem
        label="Logout"
        labelStyle={{ color: "#ffffff" }}
        onPress={logOut}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
