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
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import InputField from "@followBack/GenericElements/InputField";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import SignInForm from "@followBack/Elements/signInForm";


const windowHeight = Dimensions.get('window').height;


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
        width: "100%"
    }
});