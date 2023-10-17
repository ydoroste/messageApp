import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import UnauthorizedHeader from "@followBack/Elements/Headers/UnAuthorized/UnauthorizedHeader/UnauthorizedHeader";
import SignIn from "@followBack/Screens/Unauthorized/SignIn";
import ResetPassword from "@followBack/Screens/Unauthorized/ResetPassword";
import SignUp from "@followBack/Screens/Unauthorized/SignUp";
import useTheme from "@followBack/Hooks/useTheme";
import LockedAccount from "@followBack/Screens/Unauthorized/LockedAccount";
import { UnauthorizedParams } from "@followBack/Navigation/Unauthorized/types";
import {
  AuthStackScreens,
  AuthStackScreensEnum,
} from "@followBack/Navigation/Unauthorized/constants";
import ChooseAccount from "@followBack/Screens/Unauthorized/ChooseAccount";
import CodeVerification from "@followBack/Screens/Unauthorized/CodeVerification";
import ResetSuccessfully from "@followBack/Screens/Unauthorized/ResetSuccessfully";
import NoSecondaryEmail from "@followBack/Screens/Unauthorized/NoSecondaryEmail";
import CreatedSuccessfully from "@followBack/Screens/Unauthorized/CreatedSuccessfully";
import SignUpVerification from "@followBack/Screens/Unauthorized/SignUpVerification";

const Stack = createNativeStackNavigator<UnauthorizedParams>();

const AuthStack = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <UnauthorizedHeader {...props} />,
          contentStyle: {
            backgroundColor: colors.black,
          },
        }}
        initialRouteName={AuthStackScreensEnum.signIn}
      >
        <Stack.Screen
          name={AuthStackScreensEnum.signIn}
          options={{ title: AuthStackScreens.signIn.title }}
          component={SignIn}
        />
        <Stack.Screen
          name={AuthStackScreensEnum.resetPassword}
          options={{ title: AuthStackScreens.resetPassword.title }}
          component={ResetPassword}
        />
        <Stack.Screen
          name={AuthStackScreensEnum.signUp}
          options={{ title: AuthStackScreens.signUp.title }}
          component={SignUp}
        />
        <Stack.Screen
          name={AuthStackScreensEnum.lockedAccount}
          options={{ title: AuthStackScreens.lockedAccount.title }}
          component={LockedAccount}
        />
        <Stack.Screen
          name={AuthStackScreensEnum.chooseAccount}
          options={{ title: AuthStackScreens.chooseAccount.title }}
          component={ChooseAccount}
        />
        <Stack.Screen
          name={AuthStackScreensEnum.codeVerification}
          options={{ title: AuthStackScreens.codeVerification.title }}
          component={CodeVerification}
        />
        <Stack.Screen
          name={AuthStackScreensEnum.resetSuccessfully}
          options={{ title: AuthStackScreens.resetSuccessfully.title }}
          component={ResetSuccessfully}
        />
        <Stack.Screen
          name={AuthStackScreensEnum.noSecondaryEmail}
          options={{ title: AuthStackScreens.noSecondaryEmail.title }}
          component={NoSecondaryEmail}
        />
        <Stack.Screen
          name={AuthStackScreensEnum.singUpVerification}
          options={{ title: AuthStackScreens.singUpVerification.title }}
          component={SignUpVerification}
        />

        <Stack.Screen
          name={AuthStackScreensEnum.createdSuccessfully}
          options={{
            title: AuthStackScreens.createdSuccessfully.title,
            header: (props) => (
              <UnauthorizedHeader
                handleBackButtonPress={() => {
                  props.navigation.navigate(AuthStackScreensEnum.signIn);
                }}
                {...props}
              />
            ),
          }}
          component={CreatedSuccessfully}
        />
      </Stack.Navigator>
    </View>
  );
};

export default AuthStack;
