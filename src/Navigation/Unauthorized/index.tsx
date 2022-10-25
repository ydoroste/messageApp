import {SafeAreaView, Text, View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import UnauthorizedHeader from "@followBack/Elements/UnauthorizedHeader/UnauthorizedHeader";
import SignIn from "@followBack/Screens/SignIn";
import ForgetPassword from "@followBack/Screens/ForgetPassword";
import SignUp from "@followBack/Screens/SignUp";
import useTheme from "@followBack/Hooks/useTheme";
import LockedAccount from "@followBack/Screens/LockedAccount";
import {UnauthorizedParams} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreens, UnauthorizedScreensEnum} from "@followBack/Navigation/constants";

const Stack = createNativeStackNavigator<UnauthorizedParams>();

 const Index = () =>{
     const {colors} = useTheme();
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator screenOptions={{
                header: (props) => <UnauthorizedHeader {...props}/>,
                contentStyle: {
                    backgroundColor: colors.black
                }
            }}
            >

                <Stack.Screen name={UnauthorizedScreensEnum.signIn}
                              options={{title: UnauthorizedScreens.signIn.title}}
                              component={SignIn}/>
                <Stack.Screen name={UnauthorizedScreensEnum.forgetPassword}
                              options={{title: UnauthorizedScreens.forgetPassword.title}}
                              component={ForgetPassword}/>
                <Stack.Screen name={UnauthorizedScreensEnum.signUp}
                              options={{title: UnauthorizedScreens.signUp.title}}
                              component={SignUp}/>
                <Stack.Screen name={UnauthorizedScreensEnum.lockedAccount}
                              options={{title: UnauthorizedScreens.lockedAccount.title}}
                              component={LockedAccount}/>

            </Stack.Navigator>
        </View>

    );
};

 export default Index;
