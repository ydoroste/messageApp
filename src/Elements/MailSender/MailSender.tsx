import IconButton from "@followBack/GenericElements/IconButton";
import React, { useCallback, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import useTheme from "@followBack/Hooks/useTheme";

const MailSender = ({ onChangeMailContent, onPressCompose, mail }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.flexCenter}>
      <View style={styles.iconContainer}>
        <IconButton
          onPress={() => { }}
          name="add"
          width={17}
          height={17}
          color={colors.grey02}
        />
      </View>
      <View style={styles.input}>
        <InputField
          value={mail}
          textColor={colors.white}
          onChangeText={(mail) => onChangeMailContent({ value: mail })}
          multiline
          mode="outlined"
          placeholder="write a message..."
        />
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          onPress={onPressCompose}
          name="send"
          width={17}
          height={17}
          color={colors.grey01}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
    zIndex: 10000,
  },
  iconContainer: {
    marginBottom: 12
  }
});

export default MailSender;
