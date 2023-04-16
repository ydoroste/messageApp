import { ActivityIndicator, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import Compose from "@followBack/Screens/Authorized/Compose";
import ThreadsList from "@followBack/Screens/Authorized/ThreadsList";
import ThreadDetails from "@followBack/Screens/Authorized/ThreadDetails";

import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { AuthorizedParams } from "@followBack/Navigation/Authorized/types";
import MailBoxHeader from "@followBack/Elements/Headers/Authorized/MailBoxHeader/MailBoxHeader";
import CustomDrawerContent from "./DrawerContent";
import useTheme from "@followBack/Hooks/useTheme";
import { SearchProvider } from "@followBack/Contexts/SearchContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import { TextInput } from "react-native-paper";
import Typography from "@followBack/GenericElements/Typography";
import LoadingScreen from "@followBack/Elements/LoadingScreen/LoadingScreen.index";


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
    <Stack.Navigator initialRouteName="threadsList">
      <Stack.Screen
        name="threadsList"
        component={ThreadsList}
        options={{ header: (props) => <MailBoxHeader hideSearch {...props} /> }}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right"
        }}
        name="threadDetails"
        component={ThreadDetails}
      />
    </Stack.Navigator>
  );
};

const Authorized = () => {
  const { colors } = useTheme();
  const { data, isSuccess } = useMailBoxes();
  return (
    <>
      {isSuccess ? <View style={{ flex: 1, paddingTop: 40, backgroundColor: colors.black }}>
        <SearchProvider>
          <Drawer.Navigator
            initialRouteName={AuthorizedScreensEnum.threadsListStack}
            drawerContent={(props) => (
              <CustomDrawerContent {...props} mailboxes={data?.mailboxes} />
            )}
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
      </View> :
        <LoadingScreen loadingText={"Loading"} loadingIndecatorSize={20}/>
        }
    </>
  );
};

export default Authorized;
