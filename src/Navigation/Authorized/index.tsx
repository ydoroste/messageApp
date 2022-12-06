import {View} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import useTheme from "@followBack/Hooks/useTheme";
import Compose from "@followBack/Screens/Authorized/Compose";
import {AuthorizedScreensEnum} from "@followBack/Navigation/Authorized/constants";
import {AuthorizedParams} from "@followBack/Navigation/Authorized/types";
import UnauthorizedHeader from "@followBack/Elements/UnauthorizedHeader/UnauthorizedHeader";
import AuthorizedHeader from "@followBack/Elements/AuthorizedHeader/UnauthorizedHeader";

const Stack = createNativeStackNavigator<AuthorizedParams>();

const Authorized = () =>{
    const {colors} = useTheme();
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator screenOptions={{
                header: (props) => <AuthorizedHeader {...props}/>,
                contentStyle: {
                    backgroundColor: colors.black
                }
            }}
            >

                <Stack.Screen name={AuthorizedScreensEnum.compose}
                              component={Compose}/>

            </Stack.Navigator>
        </View>

    );
};

export default Authorized;
