import {View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
<<<<<<< HEAD
import SignIn from "@followBack/Screens/Unauthorized/SignIn";
import ResetPassword from "@followBack/Screens/Unauthorized/ResetPassword";
import useTheme from "@followBack/Hooks/useTheme";
import {UnauthorizedParams} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreens, UnauthorizedScreensEnum} from "@followBack/Navigation/constants";

const Stack = createNativeStackNavigator<UnauthorizedParams>();
=======
import useTheme from "@followBack/Hooks/useTheme";
import Compose from "@followBack/Screens/Authorized/Compose";
import {AuthorizedScreensEnum} from "@followBack/Navigation/Authorized/constants";
import {AuthorizedParams} from "@followBack/Navigation/Authorized/types";
import UnauthorizedHeader from "@followBack/Elements/UnauthorizedHeader/UnauthorizedHeader";
import AuthorizedHeader from "@followBack/Elements/AuthorizedHeader/UnauthorizedHeader";

const Stack = createNativeStackNavigator<AuthorizedParams>();
>>>>>>> main

const Authorized = () =>{
    const {colors} = useTheme();
    return (
        <View style={{flex: 1}}>
<<<<<<< HEAD
            <Stack.Navigator
            >

                <Stack.Screen name={UnauthorizedScreensEnum.signIn}
                              options={{title: UnauthorizedScreens.signIn.title}}
                              component={SignIn}/>
                <Stack.Screen name={UnauthorizedScreensEnum.resetPassword}
                              options={{title: UnauthorizedScreens.resetPassword.title}}
                              component={ResetPassword}/>
=======
            <Stack.Navigator screenOptions={{
                header: (props) => <AuthorizedHeader {...props}/>,
                contentStyle: {
                    backgroundColor: colors.black
                }
            }}
            >

                <Stack.Screen name={AuthorizedScreensEnum.compose}
                              component={Compose}/>
>>>>>>> main

            </Stack.Navigator>
        </View>

    );
};

export default Authorized;
