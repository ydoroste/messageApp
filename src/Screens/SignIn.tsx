import {
    Button,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Dimensions,
    Pressable,
    Platform, Keyboard
} from "react-native";
import React from "react";


const windowHeight = Dimensions.get('window').height;


export default function SignIn() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}
                              style={{flex: 1}} keyboardVerticalOffset={150}>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <TextInput placeholder="username or phone" placeholderTextColor="#696969"
                           style={styles.textInput}/>

                <TextInput secureTextEntry placeholder="password" placeholderTextColor="#696969"
                           style={styles.textInput}/>
                <Text style={styles.forgetPasswordLink}>forget password?</Text>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        sign in
                    </Text>
                </Pressable>
                <Text style={styles.createAccountLink}>create account</Text>
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
        borderBottomWidth: 1,
        color: "#FFF",
        width: "100%",
        borderBottomColor: "#696969",
        marginTop: 40,
        fontFamily : "OpenSans_400Regular",
        fontSize: 15,
        lineHeight: 20
    },
    forgetPasswordLink: {
        alignSelf: "flex-end",
        color: "#696969",
        fontFamily : "OpenSans_400Regular",
        marginTop: 10,
        fontSize: 12,
    },
    createAccountLink: {
        color: "#696969",
        marginTop: 20,
        textDecorationLine: "underline",
        fontFamily : "OpenSans_400Regular",
        fontSize: 15,
        lineHeight: 20
    },
    button: {
        marginTop: 100,
        color: "#696969",
        width: "100%",
        backgroundColor: "#242424",
        height:40,
        borderRadius: 31,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#E2E2E2",
        fontFamily : "OpenSans_400Regular",
        lineHeight: 20
    }
});