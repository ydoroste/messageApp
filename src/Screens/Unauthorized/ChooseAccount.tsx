import * as React from "react";
import SelectAccountForm from "@followBack/Elements/SelectAccountForm";
import {Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet} from "react-native";

const ChooseAccount = () => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
            style={{flex: 1}}>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <SelectAccountForm/>
            </Pressable>
        </KeyboardAvoidingView>
    )
};

export default ChooseAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 50
    }
});