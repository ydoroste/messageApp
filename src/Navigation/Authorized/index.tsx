import { View } from "react-native";
import React from "react";
import Compose from "@followBack/Screens/Authorized/Compose";
import ThreadsList from "@followBack/Screens/Authorized/ThreadsList";
import ThreadDetails from "@followBack/Screens/Authorized/ChatScreen/ThreadDetails";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { AuthorizedParams } from "@followBack/Navigation/Authorized/types";
import MailBoxHeader from "@followBack/Elements/Headers/Authorized/MailBoxHeader/MailBoxHeader";
import useTheme from "@followBack/Hooks/useTheme";
import { SearchProvider } from "@followBack/Contexts/SearchContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FailedMessagesContextProvider } from "@followBack/Contexts/FailedMessagesContext";
import useNotifications from "@followBack/Hooks/useNotifications";
import HomePage from "@followBack/Screens/Authorized/HomePage";
import SideOptions from "@followBack/GenericElements/SideOptions";
import SideBarWrapper from "@followBack/Elements/SideBarWrapper/SideBarWrapper";
import Inbox from "@followBack/Screens/Authorized/Inbox";
import BookMark from "@followBack/Screens/Authorized/BookMark";

const Stack = createNativeStackNavigator<AuthorizedParams>();

const Authorized = ({ navigationRef }: { navigationRef: any }) => {
  const { colors } = useTheme();
  useNotifications({ navigationRef });

  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: colors.black }}>
      <SideBarWrapper navigationRef={navigationRef}>
        <FailedMessagesContextProvider>
          <SearchProvider>
            <Stack.Navigator
              initialRouteName={AuthorizedScreensEnum.inbox}
              screenOptions={{ animation: "none" }}
            >
              <Stack.Screen
                name={AuthorizedScreensEnum.inbox}
                component={Inbox}
                options={{
                  headerShown: false,
                  header: (props) => <MailBoxHeader hideSearch {...props} />,
                }}
              />

              <Stack.Screen
                name={AuthorizedScreensEnum.bookMark}
                component={BookMark}
                options={{
                  headerShown: false,
                  header: (props) => <MailBoxHeader hideSearch {...props} />,
                }}
              />

              <Stack.Screen
                name={AuthorizedScreensEnum.compose}
                component={Compose}
                options={{
                  headerShown: false,
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
          </SearchProvider>
        </FailedMessagesContextProvider>
      </SideBarWrapper>
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
