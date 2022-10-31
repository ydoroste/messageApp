import {Button, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Keyboard} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import ResetPasswordForm from "@followBack/Elements/ResetPasswordForm";

export default function ResetPassword() {
    const nav = useNavigation();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
            style={{flex: 1}}>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>

            <ResetPasswordForm/>
            </Pressable>
        </KeyboardAvoidingView>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50
    }
});
