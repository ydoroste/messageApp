import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Compose from "@followBack/Screens/Authorized/Compose";
import ThreadsList from "@followBack/Screens/Authorized/ThreadsList";
import ThreadDetails from "@followBack/Screens/Authorized/ChatScreen/ThreadDetails";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { AuthorizedParams } from "@followBack/Navigation/Authorized/types";
import MailBoxHeader from "@followBack/Elements/Headers/Authorized/MailBoxHeader/MailBoxHeader";
import CustomDrawerContent from "./DrawerContent";
import useTheme from "@followBack/Hooks/useTheme";
import { SearchProvider } from "@followBack/Contexts/SearchContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import LoadingScreen from "@followBack/Elements/LoadingScreen/LoadingScreen.index";
import { FailedMessagesContextProvider } from "@followBack/Contexts/FailedMessagesContext";
import useNotifications from "@followBack/Hooks/useNotifications";

const Drawer = createDrawerNavigator<AuthorizedParams>();

const ComposeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={AuthorizedScreensEnum.compose}>
      <Stack.Screen
        name={AuthorizedScreensEnum.compose}
        component={Compose}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ThreadsListStack = () => {
  const Stack = createNativeStackNavigator<AuthorizedParams>();

  return (
    <Stack.Navigator
      initialRouteName={AuthorizedScreensEnum.threadsList}
      screenOptions={{ animation: "none" }}
    >
      <Stack.Screen
        name={AuthorizedScreensEnum.threadsList}
        component={ThreadsList}
        options={{
          header: (props) => <MailBoxHeader hideSearch {...props} />,
        }}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={AuthorizedScreensEnum.threadDetails}
        component={ThreadDetails}
      />
    </Stack.Navigator>
  );
};

const Authorized = ({ navigationRef }: { navigationRef: any }) => {
  const { colors } = useTheme();
  useNotifications({ navigationRef });

  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: colors.black }}>
      <FailedMessagesContextProvider>
        <SearchProvider>
          <Drawer.Navigator
            initialRouteName={AuthorizedScreensEnum.threadsListStack}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ drawerStatusBarAnimation: "none" }}
          >
            <Drawer.Screen
              options={{ headerShown: false }}
              name={AuthorizedScreensEnum.threadsListStack}
            >
              {(props) => <ThreadsListStack {...props} />}
            </Drawer.Screen>
            <Drawer.Screen
              options={{ headerShown: false }}
              name={AuthorizedScreensEnum.composeStack}
              component={ComposeStack}
            />
          </Drawer.Navigator>
        </SearchProvider>
      </FailedMessagesContextProvider>
    </View>
  );
};

export default Authorized;

// const { isSuccess } = useMailBoxes();

// <>
//   {isSuccess ? (

//   ) : (
//     <LoadingScreen loadingText={"Loading"} loadingIndecatorSize={20} />
//   )}
// </>
