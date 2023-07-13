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
import { useQueryClient } from "react-query";

const CustomDrawerContent = (props: any) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const { setIsAuthenticated, userDetails } = useUserDetails();
  const queryClient = useQueryClient();
  
  const goToScreen = ({ stackName, screenName, params = {} }) => {
    navigation.toggleDrawer();
    navigation.navigate(stackName, { screen: screenName, params });
  };

  const logOut = async () => {
    await queryClient.removeQueries();
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
      
      <DrawerItem
        label="1.0.12082023"
        onPress={() => {}}
        labelStyle={{ color: "#8c8c8c", position:'absolute' }}
      />
      <DrawerItem
            label={userDetails.user_name}
            labelStyle={{ color: "#ffffff" }}
            onPress={() =>
                goToScreen({
                    stackName: AuthorizedScreensEnum.threadsListStack,
                    screenName: AuthorizedScreensEnum.threadsList,
                })
            }
        />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
