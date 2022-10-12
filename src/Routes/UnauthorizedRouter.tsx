import {SafeAreaView, Text, View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPassword from "../Pages/ForgetPassword";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import React from "react";
import UnauthorizedHeader from "../Components/UnauthorizedHeader/UnauthorizedHeader";

const Stack = createNativeStackNavigator();

 const UnauthorizedRouter = () =>{
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator     screenOptions={{
                header: (props)=> <UnauthorizedHeader {...props}/>,
                contentStyle: {
                    backgroundColor: "#151515"
                }
            }}
            >
                <Stack.Screen name="SignIn" options={{title: "Sign In"}} component={SignIn} />
                <Stack.Screen name="ForgetPassword" options={{title: "ForgetPassword"}} component={ForgetPassword} />
                <Stack.Screen name="SignUp" options={{title: "ForgetPassword"}} component={SignUp} />
            </Stack.Navigator>
        </View>

    );
};

 export default UnauthorizedRouter;
