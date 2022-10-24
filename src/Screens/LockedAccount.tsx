import {Dimensions, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as React from "react";
import Lock from "@followBack/Theme/Icons/Lock";
import useTheme from "@followBack/Hooks/useTheme";
import Typography from "@followBack/GenericElements/Typography";

const screenHeight = Dimensions.get("window").height;
const  LockedAccount = ()=> {
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <Lock color={colors.red} width={55} height={64}/>
            <View style={{marginVertical: 70}}>
            <Typography color="error" type="mediumRegularTitle">your account has been locked</Typography>
            </View>
            <View>
            <Typography textAlign="center" color="primary" type="smallRegularTitle">a password reset link has been
                sent to the registered phone number</Typography>
            </View>
        </View>
    );
};
export default LockedAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "",
        alignItems: "center",
        width: "100%",
        marginTop: screenHeight * 0.2
    }
});