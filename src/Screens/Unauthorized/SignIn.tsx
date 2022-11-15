import {
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Dimensions,
    Pressable,
    Platform, Keyboard, TouchableWithoutFeedback, TouchableNativeFeedback
} from "react-native";
import React from "react";

import SignInForm from "@followBack/Elements/signInForm";

export default function SignIn() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}  keyboardVerticalOffset={100}
                              style={{flex: 1}}>
            <Pressable  style={styles.container} onPress={Keyboard.dismiss}>
                <SignInForm/>
            </Pressable>
        </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 50
    }
});