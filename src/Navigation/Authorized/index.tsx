import {View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import SignIn from "@followBack/Screens/Unauthorized/SignIn";
import ResetPassword from "@followBack/Screens/Unauthorized/ResetPassword";
import useTheme from "@followBack/Hooks/useTheme";
import {UnauthorizedParams} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreens, UnauthorizedScreensEnum} from "@followBack/Navigation/constants";

const Stack = createNativeStackNavigator<UnauthorizedParams>();

const Authorized = () =>{
    const {colors} = useTheme();
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator
            >

                <Stack.Screen name={UnauthorizedScreensEnum.signIn}
                              options={{title: UnauthorizedScreens.signIn.title}}
                              component={SignIn}/>
                <Stack.Screen name={UnauthorizedScreensEnum.resetPassword}
                              options={{title: UnauthorizedScreens.resetPassword.title}}
                              component={ResetPassword}/>

            </Stack.Navigator>
        </View>

    );
};

export default Authorized;
