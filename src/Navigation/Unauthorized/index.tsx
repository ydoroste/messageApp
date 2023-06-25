import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import UnauthorizedHeader from "@followBack/Elements/Headers/UnAuthorized/UnauthorizedHeader/UnauthorizedHeader";
import SignIn from "@followBack/Screens/Unauthorized/SignIn";
import ResetPassword from "@followBack/Screens/Unauthorized/ResetPassword";
import SignUp from "@followBack/Screens/Unauthorized/SignUp";
import useTheme from "@followBack/Hooks/useTheme";
import LockedAccount from "@followBack/Screens/Unauthorized/LockedAccount";
import {UnauthorizedParams} from "@followBack/Navigation/Unauthorized/types";
import {
    UnauthorizedScreens,
    UnauthorizedScreensEnum,
} from "@followBack/Navigation/Unauthorized/constants";
import ChooseAccount from "@followBack/Screens/Unauthorized/ChooseAccount";
import CodeVerification from "@followBack/Screens/Unauthorized/CodeVerification";
import ResetSuccessfully from "@followBack/Screens/Unauthorized/ResetSuccessfully";
import NoSecondaryEmail from "@followBack/Screens/Unauthorized/NoSecondaryEmail";
import CreatedSuccessfully from "@followBack/Screens/Unauthorized/CreatedSuccessfully";
import SignUpVerification from "@followBack/Screens/Unauthorized/SignUpVerification";

const Stack = createNativeStackNavigator<UnauthorizedParams>();

const Unauthorized = () => {
    const {colors} = useTheme();
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator
                screenOptions={{
                    
                    header: (props) => <UnauthorizedHeader {...props} />,
                    contentStyle: {
                        backgroundColor: colors.black,
                    },
                }}
                initialRouteName={UnauthorizedScreensEnum.signIn}
            >
                <Stack.Screen
                    name={UnauthorizedScreensEnum.signIn}
                    options={{title: UnauthorizedScreens.signIn.title}}
                    component={SignIn}
                />
                <Stack.Screen
                    name={UnauthorizedScreensEnum.resetPassword}
                    options={{title: UnauthorizedScreens.resetPassword.title}}
                    component={ResetPassword}
                />
                <Stack.Screen
                    name={UnauthorizedScreensEnum.signUp}
                    options={{title: UnauthorizedScreens.signUp.title}}
                    component={SignUp}
                />
                <Stack.Screen
                    name={UnauthorizedScreensEnum.lockedAccount}
                    options={{title: UnauthorizedScreens.lockedAccount.title}}
                    component={LockedAccount}
                />
                <Stack.Screen
                    name={UnauthorizedScreensEnum.chooseAccount}
                    options={{title: UnauthorizedScreens.chooseAccount.title}}
                    component={ChooseAccount}
                />
                <Stack.Screen
                    name={UnauthorizedScreensEnum.codeVerification}
                    options={{title: UnauthorizedScreens.codeVerification.title}}
                    component={CodeVerification}
                />
                <Stack.Screen
                    name={UnauthorizedScreensEnum.resetSuccessfully}
                    options={{title: UnauthorizedScreens.resetSuccessfully.title}}
                    component={ResetSuccessfully}
                />
                <Stack.Screen
                    name={UnauthorizedScreensEnum.noSecondaryEmail}
                    options={{title: UnauthorizedScreens.noSecondaryEmail.title}}
                    component={NoSecondaryEmail}
                />
                <Stack.Screen
                    name={UnauthorizedScreensEnum.singUpVerification}
                    options={{title: UnauthorizedScreens.singUpVerification.title}}
                    component={SignUpVerification}
                />

                <Stack.Screen
                    name={UnauthorizedScreensEnum.createdSuccessfully}
                    options={{
                        title: UnauthorizedScreens.createdSuccessfully.title,
                        header: (props) => (
                            <UnauthorizedHeader
                                handleBackButtonPress={() => {
                                    props.navigation.navigate(UnauthorizedScreensEnum.signIn);
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

export default Unauthorized;
