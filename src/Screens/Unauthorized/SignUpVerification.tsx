import * as React from "react";
import {Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View} from "react-native";
import SignUpVerificationForm from "@followBack/Elements/SignUpVerficationForm";

const SignUpVerification: React.FC =()=>{
    return (
        (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}  keyboardVerticalOffset={50}
                                  style={{flex: 1}}>
                <Pressable  style={styles.container} onPress={Keyboard.dismiss}>
                    <SignUpVerificationForm/>
                </Pressable>
            </KeyboardAvoidingView>

        )
    )
};
export default SignUpVerification;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 50,
    }
});