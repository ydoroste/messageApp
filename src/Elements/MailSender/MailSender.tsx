import IconButton from "@followBack/GenericElements/IconButton";
import React, { useCallback, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import useTheme from "@followBack/Hooks/useTheme";

const MailSender = ({ onChangeMailContent, onPressCompose, mail }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.flexCenter}>
      <IconButton
        onPress={() => {}}
        name="add"
        width={17}
        height={17}
        color={colors.grey02}
      />
      <View style={styles.input}>
        <InputField
          value={mail}
          onChangeText={(mail) => onChangeMailContent({ value: mail })}
          multiline
          mode="outlined"
          placeholder="write a message..."
        />
      </View>
      <IconButton
        onPress={onPressCompose}
        name="send"
        width={17}
        height={17}
        color={colors.grey01}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MailSender;
