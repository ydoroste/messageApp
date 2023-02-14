import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Compose from "@followBack/Screens/Authorized/Compose";
import ThreadsList from "@followBack/Screens/Authorized/ThreadsList";
import ThreadDetails from "@followBack/Screens/Authorized/ThreadDetails";

import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { AuthorizedParams } from "@followBack/Navigation/Authorized/types";
import AuthorizedHeader from "@followBack/Elements/AuthorizedHeader/AuthorizedHeader";
import CustomDrawerContent from "./DrawerContent";
import useTheme from "@followBack/Hooks/useTheme";
const Drawer = createDrawerNavigator<AuthorizedParams>();
import { SearchProvider } from "@followBack/Contexts/SearchContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFetchUserMailBoxes } from "@followBack/Hooks/Apis/UserMailBoxes";

const ComposeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={AuthorizedScreensEnum.compose}>
      <Stack.Screen
        name={AuthorizedScreensEnum.compose}
        component={Compose}
        options={{
          header: (props) => <AuthorizedHeader {...props} hideSearch />,
        }}
      />

      <Stack.Screen name="threadDetails" component={ThreadDetails} />
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
        options={{ header: (props) => <AuthorizedHeader {...props} /> }}
      />

      <Stack.Screen name="threadDetails" component={ThreadDetails} />
    </Stack.Navigator>
  );
};

const Authorized = () => {
  const { data, isLoading, isError, isSuccess } = useFetchUserMailBoxes();

  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, paddingTop: 70, backgroundColor: colors.black }}>
      <SearchProvider>
        <Drawer.Navigator
          initialRouteName={AuthorizedScreensEnum.compose}
          drawerContent={(props) => (
            <CustomDrawerContent {...props} mailboxes={data?.mailboxes} />
          )}
        >
          <Drawer.Screen
            options={{ headerShown: false }}
            name={AuthorizedScreensEnum.composeStack}
            component={ComposeStack}
          />

          {isSuccess && (
            <Drawer.Screen
              options={{ headerShown: false }}
              name={AuthorizedScreensEnum.threadsListStack}
            >
              {(props) => <ThreadsListStack {...props} />}
            </Drawer.Screen>
          )}
        </Drawer.Navigator>
      </SearchProvider>
    </View>
  );
};

export default Authorized;
