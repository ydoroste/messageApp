import {SafeAreaView, Text, View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import UnauthorizedHeader from "@followBack/Elements/UnauthorizedHeader/UnauthorizedHeader";
import SignIn from "@followBack/Screens/SignIn";
import ForgetPassword from "@followBack/Screens/ForgetPassword";
import SignUp from "@followBack/Screens/SignUp";
import useTheme from "@followBack/Hooks/useTheme";

const Stack = createNativeStackNavigator();

 const Unauthorized = () =>{
     const {colors} = useTheme();
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator     screenOptions={{
                header: (props)=> <UnauthorizedHeader {...props}/>,
                contentStyle: {
                    backgroundColor: colors.black
                }
            }}
            >

                <Stack.Screen name="SignIn" options={{title: "sign in"}} component={SignIn} />
                <Stack.Screen name="ForgetPassword" options={{title: "forget password"}} component={ForgetPassword} />
                <Stack.Screen name="SignUp" options={{title: "sign up"}} component={SignUp} />

            </Stack.Navigator>
        </View>

    );
};

 export default Unauthorized;
