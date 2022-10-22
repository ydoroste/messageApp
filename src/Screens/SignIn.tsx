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


const windowHeight = Dimensions.get('window').height;


export default function SignIn() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}
                              style={{flex: 1}} keyboardVerticalOffset={150}>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <View style={styles.textInput}>
                    <InputField placeholder={getTranslatedText("userNameOrPassword")}/>
                </View>
                <View style={styles.textInput}>
                    <PasswordInput placeholder={getTranslatedText("password")}/>
                </View>
                <View style={styles.forgetPasswordLink}>
                    <Button type="ternary"
                            onPress={() => console.log('Pressed')}>{getTranslatedText("forgetPasswordLink")}</Button>
                </View>
                <View style={styles.button}>
                    <Button type="primary" disabled={false}
                            onPress={() => console.log('Pressed')}>{getTranslatedText("signIn")}</Button>
                </View>
                <View style={styles.createAccountLink}>
                    <Button type="secondary" onPress={() => console.log('Pressed')}>
                        {getTranslatedText("createAccountLink")}</Button>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 50,
        alignItems: "center",
        width: "100%",
        paddingTop: windowHeight * 0.15
    },
    textInput: {
        width: "100%",
        marginTop: 30,
    },
    forgetPasswordLink: {
        alignSelf: "flex-end",
        marginTop: 10,
    },
    createAccountLink: {
        marginTop: 20,
    },
    button: {
        marginTop: 100,
        width: "100%"
    }
});