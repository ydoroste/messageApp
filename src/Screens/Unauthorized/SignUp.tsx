import {
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Platform, Keyboard, 
} from "react-native";
import React from "react";

import SignUpForm from "@followBack/Elements/SignUpForm/SignUpForm";

export default function SignUp() {
  return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}  keyboardVerticalOffset={60}
                            style={{flex: 1}}>
          <Pressable  style={styles.container} onPress={Keyboard.dismiss}>
              <SignUpForm/>
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
      paddingHorizontal: 50,
  }
});