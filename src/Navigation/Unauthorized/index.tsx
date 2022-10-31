import {SafeAreaView, Text, View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import UnauthorizedHeader from "@followBack/Elements/UnauthorizedHeader/UnauthorizedHeader";
import SignIn from "@followBack/Screens/SignIn";
import ResetPassword from "@followBack/Screens/ResetPassword";
import SignUp from "@followBack/Screens/SignUp";
import useTheme from "@followBack/Hooks/useTheme";
import LockedAccount from "@followBack/Screens/LockedAccount";
import {UnauthorizedParams} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreens, UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import ChooseAccount from "@followBack/Screens/ChooseAccount";
import CodeVerification from "@followBack/Screens/CodeVerification";
import ResetSuccessfully from "@followBack/Screens/ResetSuccessfully";

const Stack = createNativeStackNavigator<UnauthorizedParams>();

 const Unauthorized = () =>{
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
                <Stack.Screen name={UnauthorizedScreensEnum.resetPassword}
                              options={{title: UnauthorizedScreens.resetPassword.title}}
                              component={ResetPassword}/>
                <Stack.Screen name={UnauthorizedScreensEnum.signUp}
                              options={{title: UnauthorizedScreens.signUp.title}}
                              component={SignUp}/>
                <Stack.Screen name={UnauthorizedScreensEnum.lockedAccount}
                              options={{title: UnauthorizedScreens.lockedAccount.title}}
                              component={LockedAccount}/>
                <Stack.Screen name={UnauthorizedScreensEnum.chooseAccount}
                              options={{title: UnauthorizedScreens.chooseAccount.title}}
                              component={ChooseAccount}/>
                              <Stack.Screen name={UnauthorizedScreensEnum.codeVerification}
                              options={{title: UnauthorizedScreens.codeVerification.title}}
                              component={CodeVerification}/>
                <Stack.Screen name={UnauthorizedScreensEnum.resetSuccessfully}
                              options={{title: UnauthorizedScreens.resetSuccessfully.title}}
                              component={ResetSuccessfully}/>

            </Stack.Navigator>
        </View>

    );
};

 export default Unauthorized;
