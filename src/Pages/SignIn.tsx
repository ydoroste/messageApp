import {Button, Text, TextInput, StyleSheet, KeyboardAvoidingView, View, Dimensions} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {useNavigation} from "@react-navigation/native";


const windowHeight = Dimensions.get('window').height;


export default function SignIn() {
    console.log("windowHeight", windowHeight);
    const nav = useNavigation();
    return (
        <KeyboardAvoidingView behavior="padding"
                              style={styles.container}>

            <TextInput placeholder="user name or phone" placeholderTextColor="#696969"
                       style={styles.textInput}/>

            <TextInput secureTextEntry placeholder="user name or phone" placeholderTextColor="#696969"
                       style={styles.textInput}/>
            <Text style={styles.forgetPasswordLink}>forget password?</Text>

            <View style={styles.button}>
                <Button color="#696969" title={"sign in"}/>
            </View>
            <Text style={styles.createAccountLink}>Create account</Text>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 50,
        alignItems: "center",
        width: "100%",
        marginTop: windowHeight * 0.15
    },
    textInput: {
        borderBottomWidth: 1,
        color: "#696969",
        width: "100%",
        borderBottomColor: "#696969",
        marginTop: 40
    },
    forgetPasswordLink: {
        alignSelf: "flex-end",
        color: "#696969",
        marginTop: 10
    },
    createAccountLink: {
        color: "#696969",
        marginTop: 20
    },
    button: {
        marginTop: 100,
    }
});