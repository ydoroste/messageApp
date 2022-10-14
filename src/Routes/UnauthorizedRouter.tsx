import {SafeAreaView, Text, View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import UnauthorizedHeader from "../Components/UnauthorizedHeader/UnauthorizedHeader";
import SignIn from "../Screens/SignIn";
import ForgetPassword from "../Screens/ForgetPassword";
import SignUp from "../Screens/SignUp";

const Stack = createNativeStackNavigator();

 const UnauthorizedRouter = () =>{
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator     screenOptions={{
                header: (props)=> <UnauthorizedHeader {...props}/>,
                contentStyle: {
                    backgroundColor: "#000000"
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

 export default UnauthorizedRouter;
