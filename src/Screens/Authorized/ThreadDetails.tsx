import Typography from "@followBack/GenericElements/Typography";
import * as React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";

const Compose: React.FC = () => {
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <SafeAreaView style={styles.container}>
        <Typography color="secondary" type="smallBoldBody">
          threadsList detials
        </Typography>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default Compose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
