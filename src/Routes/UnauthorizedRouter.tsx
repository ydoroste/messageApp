import {Text, View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import React from "react";

const Stack = createNativeStackNavigator();

 const UnauthorizedRouter = () =>{
    return (
            <Stack.Navigator     screenOptions={{
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            >
                <Stack.Screen name="Home" options={{title: "Home"}} component={Home} />
                <Stack.Screen name="SignIn" options={{title: "Sign In"}} component={SignIn} />
                <Stack.Screen name="SignUp" options={{title: "Home"}} component={SignUp} />
            </Stack.Navigator>
    );
};

 export default UnauthorizedRouter;
